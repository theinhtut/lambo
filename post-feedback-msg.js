'use strict'
const AWS = require('aws-sdk')
const { v4: uuidv4 } = require('uuid')

const docClient = new AWS.DynamoDB.DocumentClient({
  apiVersion: '2012-08-10',
  endpoint: 'http://host.docker.internal:8000'
})

let response

exports.lambdaHandler = async (event, context) => {
  const body = JSON.parse(event.body)
  const { msg } = body
  
  let statusCode
  let resBody

  // Make params
  const params = {
    TableName: process.env.DDB_TABLE_NAME,
    Item: {
      msg: msg,
      id: uuidv4()
    }
  }

  // Writing to DynamoDB
  try {
    const data = await docClient.put(params).promise()
    statusCode = 201
    resBody = data
  } catch (err) {
    statusCode = 422
    resBody = `Unable to put data`
    console.log(err)
    return err
  }

  const response = {
    statusCode: statusCode,
    body: resBody
  }

  return response
}
