import { getRandomDiscogsRelease, getDiscogsRelease } from '../AppLogic';

const express = require('express');
const Master = require('../models/Master');

const router = express.Router();

// Get a Discogs master release, given ID
router.get('/release/:id', (req, res) => {
  const id = req.params.id.toString();
  getDiscogsRelease(id)
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      res.json({
        error,
        errorMessage: 'Something went wrong while fetching the release, try again',
      });
    });
});

// Random Discogs release page
router.get('/random', (req, res) => {
  getRandomDiscogsRelease()
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      res.json({
        error,
        errorMessage: 'Something went wrong while fetching the release, try again',
      });
    });
});

router.post('/filter-random', (req, res) => {
  const { styles } = req.body;
  if (styles.length > 0) {
    // const style = styles[0];
    Master.find({ styles: styles[0] })
      .then((releases) => {
        const rnd = Math.floor(Math.random() * releases.length);
        res.json(releases[rnd]);
      })
      .catch((error) => {
        res.json({
          error,
          errorMessage: 'Something went wrong while fetching the release, try again',
        });
      });
  } else {
    Master.find()
      .then((releases) => {
        const rnd = Math.floor(Math.random() * releases.length);
        res.json(releases[rnd]);
      })
      .catch((error) => {
        res.json({
          error,
          errorMessage: 'Something went wrong while fetching the release, try again',
        });
      });
  }
});

module.exports = router;
