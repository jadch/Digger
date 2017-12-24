'use strict';

const dotenv = require('dotenv');
const sql = require('mssql');
const AWS = require('aws-sdk');

const { queryElectronicTableLength, queryAlbumAtRow } = require('./functions');

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


module.exports.fetchElectronicTableLength = (event, context, callback) => {
    new sql.ConnectionPool(config).connect().then(pool => {
      queryElectronicTableLength(pool).then(maxLen => {
        callback(null, { length: maxLen });
        pool.close();
      })
      }).catch(err => {
        callback(null, { error: err });
        pool.close();
      })
};

module.exports.fetchRandomMasterID = (event, context, callback) => {
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
