// Script that initializes our AWS DynamoDb DB, by getting all releases from Discogs
// and adding them to our database.
// Since Discogs has rate limits and north of a 1.5 millions releases,
// it makes sense to populate the database using the Discogs monthly data dumps
// instead of the API: http://data.discogs.com/

// The 'masters' data dump is released every month on http://data.discogs.com/
// and includes all master releases on Discogs, the data just needs to
// be converted from XML to JSON, formatted, and saved to the database.

// Unfortunately, the Master data dump doesn't include the tracklist
// or some other info (label, etc..).

const AWS = require('aws-sdk');
const fs = require('fs');

// Configuring the database
AWS.config.update({
  region: 'eu-west-2',
});

const docClient = new AWS.DynamoDB.DocumentClient();

console.log('Importing releases into DynamoDB. Please wait.');

const allReleases = JSON.parse(fs.readFileSync('data.json', 'utf8'));
allReleases.forEach((release) => {
  const params = {
    TableName: 'Masters',
    Item: release,
  };

  docClient.put(params, (err, data) => {
    if (err) {
      console.error('Unable to add release', release.title, '. Error JSON:', JSON.stringify(err, null, 2));
    } else {
      console.log('PutItem succeeded:', release.title);
    }
  });
});
