require('dotenv').config()
const AWS = require('aws-sdk');


AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  httpOptions: {
    timeout: 5000
  },
  region: 'eu-central-1'
});

// Create S3 service object
const s3 = new AWS.S3({ apiVersion: '2006-03-01' });


// Create DynamoDB document client
const ddb = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });


module.exports = { s3, ddb };
