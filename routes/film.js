const express = require('express')

const router = express.Router()

//showing films => back to home
router.get("/", (req, res) => {
    res.redirect("/")
})

//showing specific film
router.get("/show/:id", (req, res) => {
    let film = {
        id: req.params.id
    }
    res.render("film/show", {
        film: film
    })
})

//upload form
router.get("/upload", (req, res) => {
    res.render('film/upload')
})

//upload film request
router.post("/", (req, res) => {
    res.send("Uploading not implemented yet")
})

module.exports = router