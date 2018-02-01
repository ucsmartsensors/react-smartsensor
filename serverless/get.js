//import * as dynamoDbLib from "./libs/dynamodb-lib";
//import { success, failure } from "./libs/response-lib";
import AWS from "aws-sdk";
AWS.config.update({ region: "us-east-2" });
const dynamoDb = new AWS.DynamoDB.DocumentClient();

export async function main(event, context, callback) {
  const params = {
    TableName: "Orders",
    // 'KeyConditionExpression' defines the condition for the query
    // - 'userId = :userId': only return items with matching 'userId'
    //   partition key
    // 'ExpressionAttributeValues' defines the value in the condition
    // - ':userId': defines 'userId' to be Identity Pool identity id
    //   of the authenticated user
    KeyConditionExpression: "orderId = event.pathParameters.id"
  };

  dynamoDb.get(params, (error, data) => {
    // Set response headers to enable CORS (Cross-Origin Resource Sharing)
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true
    };

    // Return status code 500 on error
    if (error) {
      const response = {
        statusCode: 500,
        headers: headers,
        body: JSON.stringify({ status: false })
      };
      callback(null, response);
      return;
    }

    // Return status code 200 and the newly created item
    const response = {
      statusCode: 200,
      headers: headers,
      body: JSON.stringify(params.Item)
    };
    callback(null, response);
  });
}


/*
export async function main(event, context, callback) {
  const params = {
    TableName: "orders",
    // 'Key' defines the partition key and sort key of the item to be retrieved
    // - 'userId': Identity Pool identity id of the authenticated user
    // - 'noteId': path parameter
    Key: {
      shippingId: data.shippingId
    }
  };

  try {
    const result = await dynamoDbLib.call("get", params);
    if (result.Item) {
      // Return the retrieved item
      callback(null, success(result.Item));
    } else {
      callback(null, failure({ status: false, error: "Item not found." }));
    }
  } catch (e) {
    callback(null, failure({ status: false }));
  }
}
*/