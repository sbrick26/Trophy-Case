const express = require('express')
const Trophy = require('./../models/trophy')
const router = express.Router()

router.get('/new', (req, res) => {
    res.render('trophies/new', { trophy: new Trophy() })
})




router.post('/', async (req, res) => {
    let trophy = new Trophy({
        title: req.body.title,
        length: req.body.length,
        description: req.body.description,
        link: req.body.link,
        tags: req.body.tags
    })

    try{
        
        trophy = await trophy.save()
        res.redirect(`/trophies/${trophy.id}`)
        console.log("it worked")
    } catch (e) {
        console.log("i happened")
        console.log(e)
        res.render('trophies/new', {trophy: trophy})
    }
})

router.get('/:id', async (req, res) => {
    const trophy = await Trophy.findById(req.params.id)
    
    if (trophy == null) res.redirect('/')
    
    res.render('trophies/show', {trophy: trophy})
})

module.exports = router

