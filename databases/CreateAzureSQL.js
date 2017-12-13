// Script that creates a table in our Azure SQL Database.
// The Table holds all 'Electronic' releases from Discogs.
const dotenv = require('dotenv');
const { Connection, Request, TYPES } = require('tedious');

dotenv.load();

// Creating connection to the database
const config = {
  userName: process.env.DIGGERDB_USER,
  password: process.env.DIGGERDB_PASS,
  server: process.env.DIGGERDB_SERVER,
  options: {
    database: process.env.DIGGERDB_NAME,
    encrypt: true,
  },
};

const connection = new Connection(config);

// Attempting to connect and execute query if connection goes through
connection.on('connect', (err) => {
  if (err) {
    console.error(err);
  } else {
      console.log('Creating Electronic database...');

      const request = new Request(
        `CREATE TABLE Electronic(
          MasterID int,
          MainReleaseID int,
          Year int,
          Title varchar(255),
          Style1 varchar(255),
          Style2 varchar(255),
          Style3 varchar(255),
          Style4 varchar(255),
          Style5 varchar(255),
        )`,
        ((err, res) => {
          if (err) { console.error(err); }
          console.log('Done! Created table ', res);
          process.exit();
        }),
      );

      connection.execSql(request);
    }
  });
