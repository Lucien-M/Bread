const express = require('express')
const breads = express.Router()
const Bread = require('../models/bread')
const Baker = require('../models/baker.js')
const baker = require('./bakers_controller')

// Index:
 //BRFORE AWAIT
//breads.get('/', (req, res) => {
  // Baker.find()
  //   .then(foundBakers => {
  //     Bread.find()
  //     .then(foundBreads => {
    breads.get('/', async (req: any, res: { render: (arg0: string, arg1: { breads: any; bakers: any; title: string }) => void })=>{
    const foundBakers = await Baker.find().lean()
    const foundBreads = await Bread.find().limit(2).lean()
    console.log(foundBreads)
          res.render('index', {
              breads: foundBreads,
              bakers: foundBakers,
              title: 'Index Page'
          })
      })
  

// before virtual
// breads.get('/', (req, res) => {
//   Bread.find()
//     .then(foundBreads => {
//       res.render('index',
//         {
//           breads: foundBreads,
//           title: 'Index Page'
//         }
//       )
//     })
// })



//before Monngiise connect
/*res.render('Index',
  {
    breads: Bread,
    title: 'Index Page'
  }
)*/
//res.send(Bread)

// NEW
breads.get('/new', (req: any, res: { render: (arg0: string, arg1: { bakers: any }) => void }) => {
  Baker.find()
    .then((foundBakers: any) => {
      res.render('new', {
        bakers: foundBakers
      })
    })
})
// EDIT b4 mongoose
//breads.get('/:indexArray/edit', (req, res) => {
// res.render('edit', {
//    bread: Bread[req.params.indexArray],
//   index: req.params.indexArray
//  })
//})


// EDIT
breads.get('/:id/edit', (req: { params: { id: any } }, res: { render: (arg0: string, arg1: { bread: any; bakers: any }) => void }) => {
  Baker.find()
    .then((foundBakers: any) => {
      Bread.findById(req.params.id)
        .then((foundBread: any) => {
          res.render('edit', {
            bread: foundBread,
            bakers: foundBakers
          })
        })
    })
})

//show before mothods
//breads.get('/:id', (req, res) => {
// Bread.findById(req.params.id)
//  .then(foundBread => {
//  res.render('show', {
//     bread: foundBread
//})
//   }).catch(err => {
//     res.send('404')
//   })
//})
// SHOW
breads.get('/:id', (req: { params: { id: any } }, res: { render: (arg0: string, arg1: { bread: any }) => void }) => {
  Bread.findById(req.params.id)
    .populate('baker')
    .then((foundBread: { getBakedBy: () => any }) => {
      const bakedBy = foundBread.getBakedBy()
      // console.log(bakedBy)
      res.render('show', {
        bread: foundBread
      })
    })
})

// show 
baker.get('/:id', (req: { params: { id: any } }, res: { render: (arg0: string, arg1: { baker: any }) => void }) => {
  Baker.findById(req.params.id)
      .populate({
          path: 'breads',
          options: { limit: 2 }
      })
      .then((foundBaker: any) => {
          res.render('bakerShow', {
              baker: foundBaker
          })
      })
})


/* BEFORE Mongoose
// SHOW
breads.get('/:arrayIndex', (req, res) => {
  if (Bread[req.params.arrayIndex]) {
    res.render('Show', {
      bread: Bread[req.params.arrayIndex],
      index: req.params.arrayIndex,
    })
  } else {
    res.send('Error')
  }
})
*/

//delete before hooks
// breads.delete('/:id', (req, res) => {
//   Bread.findByIdAndDelete(req.params.id)
//     .then(deletedBread => {
//       res.status(303).redirect('/breads')
//     })
// })

// DELETE b4 mongoose
//breads.delete('/:indexArray', (req, res) => {
// Bread.splice(req.params.indexArray, 1)
// res.status(303).redirect('/breads')
//})

// UPDATE
breads.put('/:id', (req: { body: { hasGluten: string | boolean }; params: { id: any } }, res: { redirect: (arg0: string) => void }) => {
  if (req.body.hasGluten === 'on') {
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }
  //before mongoose
  //Bread[req.params.arrayIndex] = req.body
  //res.redirect(`/breads/${req.params.arrayIndex}`)
  Bread.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updatedBread: any) => {
      console.log(updatedBread)
      res.redirect(`/breads/${req.params.id}`)
    })
})


// CREATE
breads.post('/', (req: { body: { image: undefined; hasGluten: string | boolean } }, res: { redirect: (arg0: string) => void }) => {
  if (!req.body.image) {
    req.body.image = undefined//'https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
  }
  if (req.body.hasGluten === 'on') {
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }
  Bread.create(req.body)
  res.redirect('/breads')
})

// delete
baker.delete('/:id', (req: { params: { id: any } }, res: { status: (arg0: number) => { (): any; new(): any; redirect: { (arg0: string): void; new(): any } } }) => {
  Baker.findByIdAndDelete(req.params.id) 
    .then((deletedBaker: any) => { 
      res.status(303).redirect('/breads')
    })
})


module.exports = breads