const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=c43f81d377ed926adb9464657181d2ff&query=' + latitude + ',' + longitude
    
    request({url, json: true}, (err, {body}) => {
        if (err) {
            callback('Unable to connect to the weatherstack service', undefined)
        } else if (body.error) {
            callback(body.error.info, undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ' with a temperature of ' + body.current.temperature + ' degrees feeling like ' +
                body.current.feelslike + ' degrees, and a wind speed of ' + body.current.wind_speed + ' kilometers per hour (' + body.current.wind_dir + ').'
            )
        }
    })
}

module.exports = forecast