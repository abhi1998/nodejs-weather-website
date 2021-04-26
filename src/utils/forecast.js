// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const request = require('request')

const forecast = (address, callback) => {
    const url = 'http://api.openweathermap.org/data/2.5/weather?q=' + encodeURIComponent(address) + '&appid=f78d2e14924155cb161d0890d4b93cd1'

    // request({ url, json: true }, (error, response) => {
    //     if (error) {
    //         callback('Unable to connect to the forecast service!', undefined)
    //     } else if (response.body.weather === undefined) {
    //         callback('Unable to find location', undefined)
    //     } else {
    //         callback(undefined, `${(response.body.weather[0].description)}, It's currently ${Math.round((response.body.main.temp)-273.15)}°C in ${response.body.name}`)
    //     }
    // })

    //  Destructured 
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to the forecast service!', undefined)
        } else if (body.weather === undefined) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, `${(body.weather[0].description)}, It's currently ${Math.round((body.main.temp)-273.15)}°C in ${body.name}`)
        }
    })
}

module.exports = forecast