const axios = require('axios');
const AWS = require('aws-sdk');

const discogs = axios.create({
  baseURL: 'https://api.discogs.com/',
});

// Configuring the database
AWS.config.update({
  region: 'eu-west-2',
});
const docClient = new AWS.DynamoDB.DocumentClient();

// Function that gets a Discogs master release, given Discogs master ID
function getDiscogsRelease(id) {
  return discogs.get(`masters/${id}`)
    .then(response => response.data)
    .catch(error => ({
      error,
      errorMessage: 'Something went wrong while fetching the release, try again',
    }));
}

// Function that gets a release from DynamoDB, given Master ID
function getReleaseFromDynamoDB(id) {
  const params = {
    TableName: 'Masters',
    KeyConditionExpression: '#id = :id',
    ExpressionAttributeNames: {
      '#id': 'id',
    },
    ExpressionAttributeValues: {
      ':id': id,
    },
  };
  const dynamoQuery = docClient.query(params).promise();
  return dynamoQuery
    .then(response => response.Items[0])
    .catch(err => ({
      err,
      errorMessage: 'Something went wrong while fetching the release, try again',
    }));
}

module.exports = {
  getDiscogsRelease,
  getReleaseFromDynamoDB,
};
