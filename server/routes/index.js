import { getRandomDiscogsRelease, getDiscogsRelease } from '../AppLogic'

const express = require('express')
const router = express.Router()

// Home Page
router.get('/', function (req, res, next) {
  res.json({all: 'good'})
})

router.get('/release/:id', (req, res, next) => {
  let id = req.params.id.toString()
  getDiscogsRelease(id)
    .then(response => {
      res.json(response)
    })
    .catch(error => {
      console.error('Error fetching release, ', error)
    })
})

// Random Discogs release page
router.get('/random', (req, res, next) => {
  getRandomDiscogsRelease()
    .then(response => {
      res.json(response)
    })
    .catch(error => {
      console.error('Error fetching a random release, ', error)
    })
})

module.exports = router
