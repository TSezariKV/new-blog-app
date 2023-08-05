require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const Blog = require('./models/blog.js')

const app = express()

// connect to database
mongoose.connect(process.env.dbURL)
    .then(() => {
        app.listen(process.env.PORT, (req, res) => {
            console.log(`listening for requests on port ${process.env.PORT}`)
        })
    })
    .catch(err => console.log(err))


// middleware
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

// routes
app.get('/', (req, res) => {
    res.render('index', { title: 'Home' })
})

app.get('/blogs', (req, res) => {
    Blog.find()
        .then(result => {
            res.render('blogs', { title: 'Blogs', blogs: result })
        })
        .catch(err => console.log(err))
})

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'New Blog' })
})

app.get('/blogs/:id', (req, res) => {
    const id = req.params.id

    Blog.findById(id)
        .then(result => {
            res.render('blog', { title: result.title, blog: result})
        })
})

app.post('/blogs', (req, res) => {
    const blog = new Blog(req.body)

    blog.save()
        .then(result => {
            console.log('blog saved!')
            res.redirect('/blogs')
        })
        .catch(err => console.log(err))
})
