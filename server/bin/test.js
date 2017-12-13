const { Connection } = require('tedious');
const dotenv = require('dotenv');
const { Request, TYPES } = require('tedious');
const fs = require('fs');

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

// const connection = new Connection(config);
const allReleases = JSON.parse(fs.readFileSync('data1.json', 'utf8'));

// Function that tests inserting a row in the Masters database
function insertRowInMasters(release, connection) {
  const request = new Request(`
    INSERT Masters
      (MasterID, MainReleaseID, Year, Title, Blues, BrassMilitary, Childrens, Classical, Electronic, FolkWorld, FunkSoul, HipHop, Jazz, Latin, NonMusic, Pop, Reggae, Rock, StageScreen)
    VALUES
      (@MasterID, @MainReleaseID, @Year, @Title,
      @Blues, @BrassMilitary, @Childrens, @Classical, @Electronic, @FolkWorld, @FunkSoul, @HipHop, @Jazz, @Latin, @NonMusic, @Pop, @Reggae, @Rock, @StageScreen);`, ((err) => {
      if (err) {
        console.log(err);
      }
    }));
  request.addParameter('MasterID', TYPES.Int, parseInt(release.id, 10));
  request.addParameter('MainReleaseID', TYPES.Int, parseInt(release.main_release, 10));
  request.addParameter('Year', TYPES.Int, parseInt(release.year, 10));
  request.addParameter('Title', TYPES.NVarChar, release.title);
  // Genres
  const genres = ['Blues', 'BrassMilitary', 'Childrens', 'Classical', 'Electronic', 'FolkWorld', 'FunkSoul', 'HipHop', 'Jazz', 'Latin', 'NonMusic', 'Pop', 'Reggae', 'Rock', 'StageScreen'];
  genres.forEach((genre) => {
    if (release.genres.indexOf(genre) === -1) {
      request.addParameter(genre, TYPES.Int, 0);
    } else {
      request.addParameter(genre, TYPES.Int, 1);
    }
  });

  connection.execSql(request);
}

// Launching process
let count = 0;
const from = 23200; // included
const to = 24000; // not included

// Last: data1 24000 not included  -- (limit 400 000) !!! source of truth.

const releases = allReleases.slice(from, to);
console.log('Starting... importing data and inserting it in Azure SQL table');

let i = 0;
const howManyTimes = releases.length - 1;


function add(err, release, connection) {
  if (err) {
    console.log(err);
  } else {
    insertRowInMasters(release, connection);
    console.log(`Adding, count ${count},  ${release.title} - ${release.year}`);
  }
}

function populateDB() {
  count += 1;
  const connection = new Connection(config);
  connection.on('connect', (err) => {
    add(err, releases[i], connection);
    i += 1;
    // if (i < howManyTimes && i % 10 === 0) {
    //   setTimeout(populateDB, 1);
    if (i < howManyTimes) {
      populateDB();
    }
  });
}

populateDB();

module.exports = {
  insertRowInMasters,
};
