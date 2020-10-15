const express = require('express')
const Trophy = require('./../models/trophy')
const router = express.Router()

router.get('/new', (req, res) => {
    res.render('trophies/new', { trophy: new Trophy() })
})






router.post('/', async (req, res, next) => {
    req.trophy = new Trophy()
    next()
}, saveTrophyAndRedirect('new'))

router.get('/:slug', async (req, res) => {
    const trophy = await Trophy.findOne({ slug: req.params.slug })
    
    if (trophy == null) res.redirect('/')
    
    res.render('trophies/show', {trophy: trophy})
})



router.delete('/:id', async(req, res) => {
    await Trophy.findByIdAndDelete(req.params.id)
    res.redirect('/')
})

router.get('/edit/:id', async(req, res) => {
    const trophy = await Trophy.findById(req.params.id)
    console.log(trophy)
    res.render('trophies/edit', { trophy: trophy })
})

router.put('/:id', async (req, res, next) => {
    req.trophy = await Trophy.findById(req.params.id)
    next()
}, saveTrophyAndRedirect('edit'))

function saveTrophyAndRedirect(path) {
    return async (req, res) => {
        let trophy = req.trophy
        
        trophy.title = req.body.title
        trophy.length = req.body.length
        trophy.description = req.body.description
        trophy.link = req.body.link
        trophy.tags = req.body.tags
    
        try{
            
            trophy = await trophy.save()
            res.redirect(`/trophies/${trophy.slug}`)
            console.log("it worked")
        } catch (e) {
            console.log("i happened")
            console.log(e)
            res.render(`trophies/${path}`, {trophy: trophy})
        }    
    }
}

module.exports = router

