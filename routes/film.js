const express = require('express')
const Film = require('../models/film')
const fs = require('fs')

const router = express.Router()

//showing films => back to home
router.get("/", (req, res) => {
    res.redirect("/")
})

//showing specific film
router.get("/show/:id", async(req, res) => {
    let film = await Film.findById(req.params.id)
    res.render("film/show", {
        film: film
    })
})

//upload form
router.get("/upload", (req, res) => {
    res.render('film/upload')
})

//upload film request
router.post("/", async(req, res) => {
    let tags = req.body.tags
    let arr = tags.split("\n")
    let farr = []
    arr.forEach(tag => {
        farr.push(tag.replace("\r", ""))
    });
    let newFilm = new Film({
        name: req.body.name,
        tags: farr
    })
    try {
        newFilm = await newFilm.save()
        let p = "public/uploads";
        let f = p + "/films";
        let path = f + "/" + newFilm.id;
        fs.mkdirSync(p)
        fs.mkdirSync(f)
        fs.mkdirSync(path)
        fs.writeFileSync(path + "/empty.txt", "nothing")
        res.render("film/show", {
            film: newFilm
        })
    } catch (e) {
        res.redirect("/")
    }
})

router.post("/remove/:id", async(req, res) => {
    await Film.findByIdAndDelete(req.params.id)
    res.redirect("/")
})

module.exports = router