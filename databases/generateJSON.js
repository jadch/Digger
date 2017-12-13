// Script that generates a JSON file, using the Discogs Data Dump,
// with all the 'Electronic' master releases inside
// For a first test, I generated 142'782 releases.

const xmlparser = require('xml2js');
const LineByLineReader = require('line-by-line');
const path = require('path');
const jsonfile = require('jsonfile');

const DiscogsDump = path.join(__dirname, './discogs_20171101_masters.xml');
const outputFile = './ElectronicReleases.json';
const lineReader = new LineByLineReader(DiscogsDump);

// Logging errors that happen during file reading
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

function generateJSON() {
  lineReader.on('line', (line) => {
    lines += 1;
    lineReader.pause(); // Pausing while the async stuff happens

    // if (releases === 400) return 'Done, 400 releases generated!';

    if (line.indexOf('<master') !== -1 && line.indexOf('</master>') !== -1) {
      // Great! the line represents a full release
      xmlparser.parseString(line, (err, result) => {
        if (err) {
          errors += 1;
          console.log('Error parsing the XML : ', err);
        }
        const release = JSON.parse(JSON.stringify(result.master));
        if (release.genres && release.genres[0].genre.indexOf('Electronic') !== -1) {
          const newMaster = {
            id: release.$.id,
            styles: release.styles ? release.styles[0].style : [],
            genres: release.genres ? release.genres[0].genre : [],
            artists: release.artists[0].artist.map(artist => ({
              name: artist.name[0],
              id: artist.id[0],
            })),
            videos: videoify(release.videos),
            title: release.title[0],
            year: release.year[0],
            main_release: release.main_release[0],
            data_quality: release.data_quality[0],
          };

          // Adding the release to the JSON file
          jsonfile.writeFile(outputFile, newMaster, { flag: 'a', EOL: ',\n' }, (error) => {
            console.error(error);
            releases += 1;
          });
        }
        lineReader.resume();
      });
    } else {
      errors += 1;
      lineReader.resume();
    }
    console.log('In progress... ', lines, releases, errors);
  });

  lineReader.on('end', () => `DONE! lines:${lines} releases:${releases} errors:${errors}`);
}

generateJSON();
