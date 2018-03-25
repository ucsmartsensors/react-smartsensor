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
      deviceID: data.Arduino_JSON.UUID,
    //  shippingId: data.shippingId,
    //  orderId: data.orderId,
    //  weight_data: data.weight_data,
      weightMeasurement: data.Arduino_JSON.weight
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