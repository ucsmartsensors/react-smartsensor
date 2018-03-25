import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";
import AWS from "aws-sdk";
AWS.config.update({ region: "us-east-2" });


export async function main(event, context, callback) {
  const params = {
    TableName: "Orders",
  
  
  FilterExpression : "isFulfilled = :isFulfilled",
  ExpressionAttributeValues: {
  ":isFulfilled": "true",
}
  
    
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



  