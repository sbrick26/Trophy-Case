const express = require('express')
const trophiesRouter = require('./routes/trophies')
const mongoose = require('mongoose')
const Trophy = require('./models/trophy')
const methodOverride = require('method-override')
const app = express()




mongoose.connect('mongodb+srv://admin1:admin@cluster0.kis7a.mongodb.net/trophies_db', {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex:true})

app.set('view engine', 'ejs')
app.use(express.static("styles"))

app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
    const trophies = await Trophy.find()
    console.log(trophies)
    res.render('trophies/index', { trophies: trophies })
})

app.use('/trophies', trophiesRouter)


app.listen(5000)