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
      orderId: data.orderId,
      weight: data.weight,
      qty: data.qty, 
      total: data.total, 
     createdAt: new Date().getTime(),
    },

};

  try {
    await dynamoDbLib.call("put", params);
    callback(null, success(params.Item));
  } catch (e) {
    callback(null, failure({ status: false }));
  }
}