import * as dynamoDbLib from "./libs/dynamodb-lib";
'use str

const doc = require('dynamodb-doc');

const dynamo = new doc.DynamoDB();

const AWS = require('aws-sdk');

const doClient = new AWS.DynamoDB.DocumentClient({ region: "us-east-2" });

import { success, failure } from "./libs/response-lib";
import AWS from "aws-sdk";
AWS.config.update({ region: "us-east-2" });


exports.handler = (event, context, callback) => {
    let scanningParameters = {
        TableName: 'Iotdata_03',
        Limit: 100
    };
    
    doClient.scan(scanningParameters, function(err, data){
       if (err) {
           callback(err,null);
       } else{
           callback(null,data);
       }
    });
    
    try {
        const result = await dynamoDbLib.call("query", params);
        // Return the matching list of items in response body
        callback(null, success(result.Items));
      } catch(e) {
        console.log(e);
        callback(null, failure({status: false}));
      }
};

