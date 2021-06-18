const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup Handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, resp) => {
    resp.render('index', {
        title: 'Weather',
        name: 'Stephen Blance'
    })
})

app.get('/about', (req, resp) => {
    resp.render('about', {
        title: 'About Me',
        name: 'Stephen Blance'
    })
})

app.get('/help', (req, resp) => {
    resp.render('help', {
        title: 'Help',
        message: 'To access help go to blah',
        name: 'Stephen Blance'
    })
})

app.get('/weather', (req, resp) => {
    const address = req.query.address
    if (!address) {
        return resp.send({
            error: 'You must provide an address'
        })
    }

    geocode(address, (error, {latitude, longitude, location} = {} ) => {
        if (error) {
            return resp.send({error})
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return resp.send({error})
            }
            resp.send({
                forecast: forecastData,
                location,
                address
            })
        })
    
    })
})

app.get('/products', (req, resp) => {
    if (!req.query.search) {
        return resp.send({
            error: 'You must include a search term!'
        })
    }
    resp.send({
        products: []
    })
})

app.get('/help/*', (req, resp) => {
    resp.render('404', {
        title: 'Error 404',
        message: 'Help article not found',
        name: 'Stephen Blance'
    })
})

app.get('*', (req, resp) => {
    resp.render('404', {
        title: 'Error 404',
        message: 'Page not found',
        name: 'Stephen Blance'
    })
})

app.listen(3000, () => {
    console.log('App is up on port 3000')
})