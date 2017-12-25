const express = require('express');
const AWS = require('aws-sdk');

// Configuring AWS
AWS.config.update({
  region: 'us-east-1',
});
const lambda = new AWS.Lambda();

const router = express.Router();

// Getting a random release, with no filtering by styles
router.get('/getrandom', (req, res) => {
  const params = {
    FunctionName: 'digger-serverless-dev-fetchRandomMasterID',
    Payload: '',
  };

  lambda.invoke(params, (err, data) => {
    if (err) {
      res.json({
        error: err,
        errorMessage: 'Something went wrong while fetching the randome release',
      });
    }
    const response = JSON.parse(data.Payload);
    res.json(response);
  });
});


module.exports = router;
