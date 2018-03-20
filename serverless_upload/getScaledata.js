import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";
import AWS from "aws-sdk";
AWS.config.update({ region: "us-east-2" });


export async function main(event, context, callback) {
  const params = {
    TableName: "Orders",
    // 'KeyConditionExpression' defines the condition for the query
    // - 'userId = :userId': only return items with matching 'userId'
    //   partition key
    // 'ExpressionAttributeValues' defines the value in the condition
    // - ':userId': defines 'userId' to be Identity Pool identity id
    //   of the authenticated user
    
  };


    try {
      const result = await dynamoDbLib.call("scan", params);
      // Return the matching list of items in response body
      callback(null, success(result.Items));
    } catch(e) {
      console.log(e);
      callback(null, failure({status: false}));
    }
  }