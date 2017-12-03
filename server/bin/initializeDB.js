// Script that initializes our DB, by getting all releases from Discogs
// and adding them to our database.
// Since Discogs has rate limits and north of a 1.5 millions releases,
// it makes sense to populate the database using the Discogs monthly data dumps
// instead of the API: http://data.discogs.com/

// The 'masters' data dump is released every month on http://data.discogs.com/
// and includes all master releases on Discogs, the data just needs to
// be converted from XML to JSON, formatted, and saved to the database.

// NB/TODO: this process is super time-consuming for now. I stopped the process
// at the 167'561 line/release, with 0 errors so far.

const xmlparser = require('xml2js');
const LineByLineReader = require('line-by-line');
const path = require('path');
const mongoose = require('mongoose');
const Master = require('../models/Master');

// Configuring the database
// mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true });
mongoose.connect('mongodb://localhost/digger', { useMongoClient: true });

const DiscogsDump = path.join(__dirname, './discogs_20171101_masters.xml');
const lineReader = new LineByLineReader(DiscogsDump);

// Logging errors that happend during file reading
lineReader.on('error', (err) => {
  console.error('Error reading line : ', err);
});

// Reading the file line by line, initializing counts of added releases and errors
let lines = 0;
let releases = 0;
let errors = 0;

// Function that takes in the video XML tag in the discogs dump
// and returns an array of objects {title, uri}
const videoify = (array) => {
  if (!array) return [];
  return array[0].video.map(video => ({
    title: video.title[0],
    uri: video.$.src,
  }));
};

lineReader.on('line', (line) => {
  lines += 1;
  lineReader.pause(); // Pausing while the async stuff happens

  if (line.indexOf('<master') !== -1 && line.indexOf('</master>') !== -1) {
    // Great! the line represents a full release
    xmlparser.parseString(line, (err, result) => {
      if (err) {
        errors += 1;
        console.log('Error parsing the XML : ', err);
      }
      const release = JSON.parse(JSON.stringify(result.master));
      const newMaster = {
        id: release.$.id,
        styles: release.styles ? release.styles[0].style : [],
        genres: release.genres ? release.genres[0].genre : [],
        artists: release.artists[0].artist.map(artist => ({
          name: artist.name[0],
          anv: artist.anv[0],
          id: artist.id[0],
        })),
        videos: videoify(release.videos),
        title: release.title[0],
        year: release.year[0],
        main_release: release.main_release[0],
        data_quality: release.data_quality[0],
      };
      console.log(release);
      // Saving the master release to the db
      Master.findOneAndUpdate(
        { id: newMaster.id },
        newMaster,
        { upsert: true, new: true },
      ).then(() => {
        releases += 1;
        lineReader.resume();
      }).catch((error) => {
        errors += 1;
        console.log('Error saving release to db: ', error);
      });
    });
  } else {
    errors += 1;
    lineReader.resume();
  }
  console.log('In progress... ', lines, releases, errors);
});

lineReader.on('end', () => {
  console.log(`DONE! lines:${lines} releases:${releases} errors:${errors}`);
});
