const AWS = require('aws-sdk');

// Configuring AWS
AWS.config.update({
  region: 'us-east-1',
});

const lambda = new AWS.Lambda();
const params = {
  FunctionName: 'digger-serverless-dev-hello',
  Payload: '',
};

lambda.invoke(params, (err, data) => {
  console.log(err, data);
});
