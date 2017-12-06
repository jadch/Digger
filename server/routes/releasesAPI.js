import { getRandomDiscogsRelease, getDiscogsRelease, getReleaseFromDynamoDB } from '../AppLogic';

const express = require('express');
const AWS = require('aws-sdk');
const Master = require('../models/Master');

// Configuring the database
AWS.config.update({
  region: 'eu-west-2',
});

const docClient = new AWS.DynamoDB.DocumentClient();

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

// Gettings a random release from DynamoDb
router.get('/getrandom', (req, res) => {
  // const { styles } = req.body;
  // if (styles.length > 0) {
  // }

  // Testing
  getReleaseFromDynamoDB('284925')
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
    Master.findOneRandom((error, result) => {
      if (error) {
        console.log('error', error);
        res.json({
          error,
          errorMessage: 'Something went wrong while fetching the release, try again',
        });
      }
      console.log('REL', result);
      res.json(result);
    });
  }
});

module.exports = router;
