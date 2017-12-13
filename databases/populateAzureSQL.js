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
const allReleases = JSON.parse(fs.readFileSync('ElectronicReleases.json', 'utf8'));
let count = 0;

// Function that tests inserting a row in the Masters database
function insertRowInMasters(release, connection) {
  const request = new Request(`
    INSERT Electronic
      (MasterID, MainReleaseID, Year, Title, Style1, Style2, Style3, Style4, Style5)
    VALUES
      (@MasterID, @MainReleaseID, @Year, @Title,
      @Style1, @Style2, @Style3, @Style4, @Style5);`, ((err) => {
      if (err) {
        console.log(err);
      }
    }));
  request.addParameter('MasterID', TYPES.Int, parseInt(release.id, 10));
  request.addParameter('MainReleaseID', TYPES.Int, parseInt(release.main_release, 10));
  request.addParameter('Year', TYPES.Int, parseInt(release.year, 10));
  request.addParameter('Title', TYPES.NVarChar, release.title);
  // Genres
  const stylesTemplate = ['', '', '', '', ''];
  const releaseStyles = release.styles;

  stylesTemplate.forEach((style, index) => {
    if (releaseStyles && releaseStyles[index]) {
      request.addParameter(`Style${index + 1}`, TYPES.NVarChar, releaseStyles[index]);
    } else {
      request.addParameter(`Style${index + 1}`, TYPES.NVarChar, '');
    }
  });

  connection.execSql(request);
}

function addArray(releases) {
  releases.forEach((release) => {
    const connection = new Connection(config);
    connection.on('connect', (err) => {
      if (err) {
        console.error(err);
      } else {
        insertRowInMasters(release, connection);
        count += 1;
        console.log(`Adding, count ${count},  ${release.title} - ${release.year}`);
      }
    });
  });
}

// Launching process
const from = 12500; // included
const to = 13001; // not included

// Last done until: 13001 not included  -- (out of total: 142 782)

const releases = allReleases.slice(from, to);

let i = 0;
const increment = 25;
const howManyTimes = releases.length - 1;


function populateDB() {
  console.log('Starting... importing data and inserting it in Azure SQL table');

  const releaseArray = releases.slice(i, i + increment); // getting increment releases
  addArray(releaseArray);
  i += increment;

  if (i <= howManyTimes - increment) {
    setTimeout(populateDB, 300);
  }
}

populateDB();
