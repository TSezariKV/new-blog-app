require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const Blog = require('./models/blog.js')

const app = express()

// middleware
app.set('view engine', 'ejs')
app.use(express.static('public'))

// routes
app.get('/', (req, res) => {
    res.render('index', { title: 'Home' })
})

app.get('/blogs', (req, res) => {
    res.render('blogs', { title: 'Blogs' })
})

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'New Blog' })
})

app.listen(process.env.PORT, (req, res) => {
    console.log(`listening for requests on port ${process.env.PORT}`)
})