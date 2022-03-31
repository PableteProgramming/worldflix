const express = require('express')
const filmRouter = require('./routes/film')
const bodyparser = require('body-parser')

const app = express()
const PORT = 3000

app.set('view engine', 'ejs')
app.use(express.static("public/res"))
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())
app.use("/film", filmRouter)

app.get("/", (req, res) => {
    res.render('index')
})

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})