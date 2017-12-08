// Initializing the Masters Table in DynamoDB

const AWS = require('aws-sdk');
const fs = require('fs');

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

  docClient.put(params, (err) => {
    if (err) {
      console.error('Unable to add release', release.title, '. Error JSON:', JSON.stringify(err, null, 2));
    } else {
      console.log('PutItem succeeded:', release.title);
    }
  });
  // setTimeout(() => {}, 1000);
});
