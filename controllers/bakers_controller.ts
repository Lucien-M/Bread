// dependencies
let express = require('express')
let baker = express.Router()
let Baker = require('../models/baker.js')
const bakerSeedData = require('../models/baker_seed.js')

// Index: 
baker.get('/', (req: any, res: { send: (arg0: any) => void }) => {
    Baker.find()
        .populate('breads')
        .then((foundBakers: any) => {
            res.send(foundBakers)
        })
})
// Show: 
baker.get('/:id', (req: { params: { id: any } }, res: { render: (arg0: string, arg1: { baker: any }) => void }) => {
    Baker.findById(req.params.id)
        .populate('breads')
        .then((foundBaker: any) => {
            res.render('bakerShow', {
                baker: foundBaker
            })
        })
})



baker.get('/data/seed', (req: any, res: { redirect: (arg0: string) => any }) => {
    Baker.insertMany(bakerSeedData)
        .then(res.redirect('/breads'))
})
// export
module.exports = baker                    
