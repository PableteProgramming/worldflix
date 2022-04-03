const express = require('express')
const bodyparser = require('body-parser')
const mongoose = require('mongoose')

const filmRouter = require('./routes/film')
const Film = require('./models/film')

const app = express()
const PORT = 3000

mongoose.connect("mongodb://localhost/worldflix")

app.set('view engine', 'ejs')
app.use(express.static("public/res"))
app.use(express.static("public/uploads"))
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())
app.use("/film", filmRouter)

app.get("/", async(req, res) => {
    let films = await Film.find()
    res.render('index', {
        films: films
    })
})

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})