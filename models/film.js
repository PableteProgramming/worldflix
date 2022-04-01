const mongoose = require('mongoose')

const filmSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    tags: [{
        type: String
    }]
})

module.exports = mongoose.model('Film', filmSchema)