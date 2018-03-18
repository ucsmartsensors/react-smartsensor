import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";
import AWS from "aws-sdk";
AWS.config.update({ region: "us-east-2" });


export async function main(event, context, callback) {
  const params = {
    TableName: "Orders",
    IndexName: 'fulfilled-shippingId-index',

    KeyConditionExpression: "fulfilled = :fulfilled",
    FilterExpression: 'attribute_exists("fulfilled") AND ("fulfilled" = :val1 ) OR ("fulfilled" = :val2 )' ,
   //FilterExpression : 'contains(fulfilled=true) OR fulfilled=false',
   ExpressionAttributeValues: {
    ":val1": "true",
    ":val2": "false"
  },
  
    
  };


    try {
      const result = await dynamoDbLib.call("query", params);
      // Return the matching list of items in response body
      callback(null, success(result.Items));
    } catch(e) {
      console.log(e);
      callback(null, failure({status: false}));
    }
  }



  