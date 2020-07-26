'use strict'
const AWS = require('aws-sdk')

const docClient = new AWS.DynamoDB.DocumentClient({
  apiVersion: '2012-08-10',
  endpoint: 'http://host.docker.internal:8000'
})

let response

exports.lambdaHandler = async (event, context) => {
  // Make params
  const params = {
    TableName: process.env.DDB_TABLE_NAME
  }

  // Scan ddb table and return one or more items
  try {
    const data = await docClient.scan(params).promise()
    response = {
      statusCode: 200,
      body: JSON.stringify(data.Items)
    }
  } catch (err) {
    console.log(err)
    return err
  }

  return response
}
