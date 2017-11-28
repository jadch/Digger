import { getRandomDiscogsRelease, getDiscogsRelease } from '../AppLogic';

const express = require('express');
const Master = require('../models/Master');

const router = express.Router();

// Home Page
router.get('/', (req, res) => {
  res.json({ all: 'good' });
});

// Get a Discogs master release, given ID
router.get('/release/:id', (req, res) => {
  const id = req.params.id.toString();
  getDiscogsRelease(id)
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      console.error('Error fetching release, ', error);
    });
});

// Random Discogs release page
router.get('/random', (req, res) => {
  getRandomDiscogsRelease()
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      console.error('Error fetching a random release, ', error);
    });
});

router.post('/filter-random', (req, res) => {
  const { style } = req.body;
  Master.find({ styles: style })
    .then((releases) => {
      const rnd = Math.floor(Math.random() * releases.length);
      res.json(releases[rnd]);
    })
    .catch((error) => {
      console.error('Error fetching release, ', error);
    });
});

module.exports = router;
