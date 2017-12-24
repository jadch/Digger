'use strict';

const dotenv = require('dotenv');
const sql = require('mssql');
const AWS = require('aws-sdk');

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

// Function that returns the Electronic table length (the number of rows in the table)
function queryElectronicTableLength(pool) {
  return pool.request()
    .query(`SELECT COUNT(MasterId)
    FROM Electronic`)
    .then(result => parseInt(result.recordsets[0][0][''], 10));
}

// Function that gets an album from the Electronic table,
// at a specified row position
function queryAlbumAtRow(pool, row) {
  return pool.request()
    .input('row', sql.Int, row)
    .query(` SELECT * FROM Electronic
     ORDER BY MasterId
     OFFSET @row ROWS FETCH NEXT 1 ROWS ONLY`)
    .then(result => result.recordsets[0][0]);
}

module.exports.fetchElectronicTableLength = (event, context, callback) => {
    new sql.ConnectionPool(config).connect().then(pool => {
      queryElectronicTableLength(pool).then(maxLen => {
        const response = { length: maxLen }
        pool.close();
        callback(null, response);
        context.succeed();
      })
      }).catch(err => {
        const response = {
          error: err,
        };
        callback(null, response);
        pool.close();
      })
};

module.exports.fetchRandomMasterID = (event, context, callback) => {
  // const table = 'Electronic';
  //
  // new sql.ConnectionPool(config).connect().then(pool => {
  //   queryElectronicTableLength(pool).then(maxLen => {
  //     const response = { length: maxLen }
  //     pool.close();
  //     callback(null, response);
  //     context.succeed();
  //   })
  //   }).catch(err => {
  //     const response = {
  //       error: err,
  //     };
  //     callback(null, response);
  //     pool.close();
  //   })

  // const row = Math.floor(Math.random() * maxLen);
  // queryAlbumAtRow(pool, row).then((release) => {
  //   res.json(release);
  //   pool.close();
  // });
};
