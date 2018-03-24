'use strict';

const ENV = 'dev';
const SHIPPING_TABLE = `serverless-${ENV}-shipping`;
const uuid = require('uuid');
const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports.create = (event, context, callback) => {
  const timestamp = new Date().getTime();
  let data = JSON.parse(event.body);

  const newItem = {
    id: uuid.v1(),
    createdAt: timestamp,
    updatedAt: timestamp,
    shippingId: data.shippingId,
    orderId: data.orderId,
    requiredWeight: data.requiredWeight,
    measuredWeight: data.measuredWeight || 0,
    requiredQty: data.requiredQty,
    measuredQty: data.measuredQty || 0,
    fulfilled: data.measuredWeight >= data.requiredWeight,
    total: data.total,
    createdAt: data.createdAt
  }

  putUpdates({}, newItem, callback);
}

module.exports.get = (event, context, callback) => {
  const params = {
    TableName: SHIPPING_TABLE,
    Key: { id: event.pathParameters.id }
  };

  dynamoDB.get(params, (error, result) => {
    if (error){
      console.error(error);
      callback(new Error("Couldn't fetch the shipping item."));
      return;
    }

    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Item)
    };
    callback(null, response);
  })
}

module.exports.list = (event, context, callback) => {
  const params = {TableName: SHIPPING_TABLE};

  dynamoDB.scan(params, (error, result) => {
    if (error) {
      console.error(error);
      callback(new Error("Couldn't list the shipping items."));
      return;
    }

    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Items)
    };
    callback(null, response);
  })
}

module.exports.update = (event, context, callback) => {
  const params = {
    TableName: SHIPPING_TABLE,
    Key: { id: event.pathParameters.id },
  }

  dynamoDB.get(params, (error, result) => {
    if (error) {
      console.error(error);
      callback(new Error("Couldn't retrieve the shipping item."));
    }
    putUpdates(result.Item, JSON.parse(event.body), callback);
  })
}

module.exports.incrementWeight = (id, weight, callback) => {
  const params = {
    TableName: SHIPPING_TABLE,
    Key: { id: id },
  }

  dynamoDB.get(params, (error, result) => {
    if (error) {
      console.error(error);
      callback(new Error("Couldn't retrieve the shipping item."));
    }

    const newWeight = result.Item.measuredWeight + weight;
    putUpdates(result.Item, {measuredWeight: newWeight}, callback);
  })
}

// All updates to shipping records must be done with this function to
// ensure that unit weights are calculated and fulfilled flags are set
const putUpdates = (originalItem, updates, callback) => {
  if (updates.measuredQty && updates.measuredWeight) {
    updates.unitWeight = updates.measuredWeight / updates.measuredQty;
  }
  updates.updatedAt = updates.updatedAt || new Date().getTime();

  let item = Object.assign(originalItem, updates);
  item.fulfilled = (item.measuredWeight >= item.requiredWeight);

  const updateParams = {
    TableName: SHIPPING_TABLE,
    Item: item
  }

  dynamoDB.put(updateParams, (error, result) => {
    if (error) {
      console.error(error);
      callback(new Error("Couldn't update the shipping item."));
    }

    callback(null, {
      statusCode: 200,
      body: JSON.stringify(updateParams)
    });
  });
}
