import { queryAlbumAtRow, queryElectronicTableLength } from '../AzureQueries';

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
    queryElectronicTableLength(pool).then((maxLen) => {
      const row = Math.floor(Math.random() * maxLen);
      queryAlbumAtRow(pool, row).then((release) => {
        res.json(release);
        sql.close();
      });
    });
  });
});


module.exports = router;
