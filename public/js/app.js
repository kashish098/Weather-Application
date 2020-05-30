const form = document.querySelector('form')
const search = document.querySelector('input')

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')
const messageFour = document.querySelector('#message-4')
const messageFive = document.querySelector('#message-5')
const messageSix = document.querySelector('#message-6')

form.addEventListener('submit',(event)=>{
    event.preventDefault()
    fetch('http://localhost:3000/weather?address='+encodeURIComponent(search.value)).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent = 'Error'
            messageTwo.textContent = data.error
            messageThree.textContent = ''
            messageFour.textContent = ''
            messageFive.textContent = ''
            messageSix.textContent = ''
            return
        }
        messageOne.textContent = data.location
        messageTwo.textContent = data.forecast.summary
        messageThree.textContent = 'Current temperature is ' + data.forecast.currentTemperature + ' \u00B0C'
        messageFour.textContent = 'Precipitation chances ' + data.forecast.precipitation + ' %'
        messageFive.textContent = 'Maximum temperature : ' + data.forecast.maxTemperature + ' \u00B0C'
        messageSix.textContent = 'Minimum Temperature : ' + data.forecast.minTemperature + ' \u00B0C'        
        
    })
})


})
