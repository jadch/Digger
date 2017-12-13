import { queryAlbumAtRow } from '../AzureQueries';

const express = require('express');
const sql = require('mssql');
const dotenv = require('dotenv');

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
    const row = 1120;
    queryAlbumAtRow(pool, row).then((release) => {
      res.json(release);
      sql.close();
    });
  });
  sql.on('error', (err) => {
    res.json({ error: err, errorMessage: 'Something went wrong while fetching the release, please try again!' });
  });
});


module.exports = router;
