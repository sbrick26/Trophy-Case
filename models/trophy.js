const mongoose = require('mongoose')

const trophySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    length: {
        type:String
    },
    description: {
        type:String
    },
    link: {
        type: String
    },
    tags: {
        type:String
    }
})

module.exports = mongoose.model('Trophy', trophySchema)