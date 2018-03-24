'use strict';

const ENV = 'dev';
const SHIPPO_TABLE = `serverless-${ENV}-shippo`;
const uuid = require('uuid');
const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports.create = (event, context, callback) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);

  const params = {
    TableName: SHIPPO_TABLE,
    Item: {
      id: uuid.v1(),
      createdAt: timestamp,
      updatedAt: timestamp,
      shippingId: data.shippingId,
      orderId: data.orderId,
      weight: data.weight,
      name: data.name,
      street1: data.street1,
      street2: data.street2,
      city: data.city,
      state: data.state,
      zip: data.zip,
      country: data.country,
      email: data.email,
      phone: data.phone,
      fulfilled: data.fulfilled
    }
  }
  dynamoDB.put(params, (error, result) => {
    if (error) {
      console.error(error);
      callback(new Error("Couldn't create the shippo item."));
    }

    const response = {
      statusCode: 200,
      body: JSON.stringify(params)
    };
    callback(null, response);
  })
}

module.exports.list = (event, context, callback) => {
  const params = {TableName: SHIPPO_TABLE};

  dynamoDB.scan(params, (error, result) => {
    if (error) {
      console.error(error);
      callback(new Error("Couldn't list the shippo items."));
      return;
    }

    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Items)
    };
    callback(null, response);
  })
}

