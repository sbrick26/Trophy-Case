const mongoose = require('mongoose')
const slugify = require('slugify')

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
    },
    slug: {
        type: String,
        required: true,
        unqiue: true
    }
})

trophySchema.pre('validate', function(next) {
    if (this.title) {
        this.slug = slugify(this.title, {lower:true, strict:true})
    }

    next()
})

module.exports = mongoose.model('Trophy', trophySchema)