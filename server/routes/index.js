import { getRandomDiscogsRelease } from '../AppLogic'

const express = require('express')
const router = express.Router()

// Home Page
router.get('/', function (req, res, next) {
  res.json({all: 'good'})
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
