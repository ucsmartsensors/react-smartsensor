'use strict';

const ENV = 'dev';
const SCALE_TABLE = `serverless-${ENV}-scale`;
const shipping = require('./shipping.js');
const uuid = require('uuid');
const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports.create = (event, context, callback) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);

  const params = {
    TableName: SCALE_TABLE,
    Item: {
      id: uuid.v1(),
      createdAt: timestamp,
      updatedAt: timestamp,
      deviceID: data.deviceID,
      shippingId: data.shippingId,
      orderId: data.orderId,
      weight_data: data.weight_data,
      weightMeasurement: data.weightMeasurement
    }
  }
  
  dynamoDB.put(params, (error, result) => {
    if (error) {
      console.error(error);
      callback(new Error("Couldn't create the scale item."));
    }

    shipping.incrementWeight(data.shippingId, data.Arduino_JSON.weight, (error, result) => {
      if (error) {
        console.error(error);
        callback(new Error("Scale data recorded, but shipping item's weight not incremented."));
        return;
      }
    });

    const response = {
      statusCode: 200,
      body: JSON.stringify(params)
    };
    callback(null, response);
  })
}

module.exports.list = (event, context, callback) => {
  const params = {TableName: SCALE_TABLE};

  dynamoDB.scan(params, (error, result) => {
    if (error) {
      console.error(error);
      callback(new Error("Couldn't list the scale items."));
      return;
    }

    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Items)
    };
    callback(null, response);
  })
}

module.exports.get = (event, context, callback) => {
  const params = {
    TableName: SCALE_TABLE,
    Key: { id: event.pathParameters.id }
  };

  dynamoDB.get(params, (error, result) => {
    if (error){
      console.error(error);
      callback(new Error("Couldn't fetch the scale item."));
      return;
    }

    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Item)
    };
    callback(null, response);
  })
}
