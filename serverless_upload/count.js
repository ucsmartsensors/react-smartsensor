import uuid from "uuid";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";


/*


shippingId 
measuered qty = measuredWeight/weight
 
Return PUT countData/measuredWeight


*/



export async function main(event, context, callback) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: "Orders",
    Item: {
      shippingId: data.shippingId,
      weight: data.weight,
    
      //createdAt: new Date().getTime(),
    },
    KeyConditionExpression: "shippingId = :shippingId",
    ExpressionAttributeValues: {
      ":shippingId":  event.pathParameters.id }
};

  try {
    await dynamoDbLib.call("put", params);
    callback(null, success(params.Item));
  } catch (e) {
    callback(null, failure({ status: false }));
  }
}