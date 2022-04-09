const express = require('express')
const Film = require('../models/film')
const fs = require('fs')
const fileUpload = require('express-fileupload')


const path = require('path')

const router = express.Router()
router.use(fileUpload())

//showing films => back to home
router.get("/", (req, res) => {
    res.redirect("/")
})

function CheckTags(film) {
    tags = true
    if (film.tags.length <= 1) {
        if (film.tags[0] === '') {
            tags = false
        }
    }
    return tags
}

//showing specific film
router.get("/show/:id", async(req, res) => {
    let film = await Film.findById(req.params.id)
    tags = CheckTags(film)
    res.render("film/show", {
        film: film,
        tags: tags
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

    let filmFile = req.files.film;
    if (path.extname(filmFile.name) == ".mp4") {
        let image = req.files.image;
        try {
            newFilm = await newFilm.save()
            let p = "public/uploads"
            let f = p + "/films"
            let path = f + "/" + newFilm.id
            if (!fs.existsSync(p)) {
                fs.mkdirSync(p)
            }
            if (!fs.existsSync(f)) {
                fs.mkdirSync(f)
            }

            fs.mkdirSync(path)
            filmFile.mv(path + "/film.mp4", (err) => {
                if (err) {
                    res.send("an error occured while uploading...")
                }
            })
            image.mv(path + "/img.png", (err) => {
                if (err) {
                    res.send("an error occured while uploading...")
                }
            })
            tags = CheckTags(newFilm)
            res.render("film/show", {
                film: newFilm,
                tags: tags
            })
        } catch (e) {
            console.log(e)
            res.redirect("/")
        }
    } else {
        res.send("We can only upload mp4 files")
    }
})

router.post("/remove/:id", async(req, res) => {
    await Film.findByIdAndDelete(req.params.id)
    fs.rmdirSync("public/uploads/films/" + req.params.id, { recursive: true })
    res.redirect("/")
})

module.exports = router