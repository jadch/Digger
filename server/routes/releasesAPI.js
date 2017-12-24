import { queryAlbumAtRow, queryElectronicTableLength } from '../AzureQueries';

const express = require('express');
const sql = require('mssql');
const dotenv = require('dotenv');
const AWS = require('aws-sdk');

// Configuring AWS
AWS.config.update({
  region: 'us-east-1',
});
const lambda = new AWS.Lambda();

dotenv.load();

// Creating connection to the database
const config = {
  user: process.env.DIGGERDB_USER,
  password: process.env.DIGGERDB_PASS,
  server: process.env.DIGGERDB_SERVER,
  database: process.env.DIGGERDB_NAME,
  options: {
    encrypt: true,
  },
};

const router = express.Router();

// Gettings a random release from DynamoDb
router.get('/getrandom', (req, res) => {
  sql.connect(config).then((pool) => {
    queryElectronicTableLength(pool).then((maxLen) => {
      const row = Math.floor(Math.random() * maxLen);
      queryAlbumAtRow(pool, row).then((release) => {
        res.json(release);
        sql.close();
      });
    });
  });
});

// Getting a random release, with no filtering by styles
router.get('/random', (req, res) => {
  const params = {
    FunctionName: 'digger-serverless-dev-fetchElectronicTableLength',
    Payload: '',
  };

  lambda.invoke(params, (err, data) => {
    if (err) {
      res.json({
        error: err,
        errorMessage: 'Something went wrong while fetching the randome release',
      });
    }
    const response = JSON.parse(data.Payload);
    res.json(response);
  });
});


module.exports = router;
