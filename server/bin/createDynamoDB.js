// Setting up our DynamoDB database
const AWS = require('aws-sdk');

// Configuring the database
AWS.config.update({
  region: 'eu-west-2',
});

const dynamodb = new AWS.DynamoDB();

const paramsMasters = {
  TableName: 'Masters',
  KeySchema: [
    { AttributeName: 'id', KeyType: 'HASH' }, // Partition key
  ],
  AttributeDefinitions: [
    { AttributeName: 'id', AttributeType: 'S' },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 13,
  },
};

const paramsGenres = {
  TableName: 'Genres',
  KeySchema: [
    { AttributeName: 'id', KeyType: 'HASH' }, // Partition key
  ],
  AttributeDefinitions: [
    { AttributeName: 'id', AttributeType: 'S' },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 20,
    WriteCapacityUnits: 12,
  },
};


// Creating Tables
dynamodb.createTable(paramsMasters, (err, data) => {
  if (err) {
    console.error('Unable to create table. Error JSON:', JSON.stringify(err, null, 2));
  } else {
    console.log('Created table. Table description JSON:', JSON.stringify(data, null, 2));
  }
});

dynamodb.createTable(paramsGenres, (err, data) => {
  if (err) {
    console.error('Unable to create table. Error JSON:', JSON.stringify(err, null, 2));
  } else {
    console.log('Created table. Table description JSON:', JSON.stringify(data, null, 2));
  }
});
