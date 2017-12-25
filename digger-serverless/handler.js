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
      queryElectronicTableLength(pool).then(length => {
        callback(null, { length });
        pool.close();
      })
      }).catch(error => {
        callback(null, { error });
        pool.close();
      })
};

module.exports.fetchRandomMasterID = (event, context, callback) => {
  new sql.ConnectionPool(config).connect().then(pool => {
    queryElectronicTableLength(pool).then(maxLen => {
      const row = Math.floor(Math.random() * maxLen);
      queryAlbumAtRow(pool, row).then((release) => {
        callback(null, {
          masterID: release.MasterID,
          mainReleaseID: release.MainReleaseID,
          year: release.Year,
          title: release.Title,
        });
        pool.close();
      });
    })
  }).catch(error => {
    callback(null, { error });
    pool.close();
  })
};
