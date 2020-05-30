const request = require('request')

const forecast = (latitude,longitude,callback)=>{
    const url = 'https://api.darksky.net/forecast/b4d2b33b0d08801e519e4c3155c1a34c/'+ encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '?units=si'
    request({url,json:true},(error,{body} = {})=>{
        if(error){
            callback("Unable to connect to weather application",undefined)
        }
        else if(body.error){
            callback("Invalid information provided to fetch the weather data",undefined)
        }
        else{
            callback(undefined,{
                summary : body.daily.data[0].summary,
                precipitation: body.daily.data[0].precipProbability *100,
                maxTemperature : body.daily.data[0].temperatureHigh,
                minTemperature : body.daily.data[0].temperatureLow,
                currentTemperature : body.currently.temperature
            })
        }
   
    })
}

module.exports = forecast
