const path = require('path')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const expressLayouts = require('express-ejs-layouts')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(path.join(__dirname, '../public'))

// serving static files
const pathDirectory = path.join(__dirname, '../public')
app.use(express.static(pathDirectory))


// Setting up template engine
app.use(expressLayouts)
app.set('views', path.join(__dirname, '../templates/views'))
app.set('view engine', 'ejs')


app.get('/', (req, res) => {
    res.render('index', {
        title: 'Home',
        name: 'Abhijeet Sawant'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Abhijeet Sawant'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Abhijeet Sawant'
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide some value'
        })
    }

    geocode(req.query.address, (error, { location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(location, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})


app.get('/product', (req, res) => {
    if (!req.query.search) {
        return res.send({ //stopping the function
            error: 'You must provide a search term.'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})





app.get('/help/*', (req, res) => {
    res.render('errorPage', {
        title: '404',
        name: 'Abhijeet Sawant',
        errorMessage: 'help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('errorPage', {
        title: '404',
        name: 'Abhijeet Sawant',
        errorMessage: 'Page not found.'
    })
})


app.listen(port, () => {
    console.log(`Server started successfully on ${port}`)
})