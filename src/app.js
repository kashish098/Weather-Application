const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()


const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))


app.get('/', (req, res) => {
    res.render('root',{
        title:'Weather App',
        author:"Kashish Mehndiratta"
    })
})

app.get('/sources', (req, res) => {
    res.render('sources',{
        title:'Sources',
        author:"Kashish Mehndiratta"
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title:'About Me',
        author:"Kashish Mehndiratta"
    })
})


app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'address is not provided'
        })    
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {})=>{
        if(error){
            return res.send({error})
        }

        forecast(latitude,longitude,(error,forecastData)=>{
            if (error){
                return res.send({error})
            }
            res.send({
                location,
                address: req.query.address,
                forecast: forecastData
            })
        })
    })
    


})


app.get('*',(req,res)=>{
    res.render('404',{
        title : '404',
        errorMessage:'Page not found',
        author: 'Kashish'
    })
})

app.listen(3000,()=>{
    console.log("Server is up ..Running")
})