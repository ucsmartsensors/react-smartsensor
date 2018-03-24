import uuid from "uuid";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";


/*

shippingId 
measuered qty = measuredWeight/weight
 
Return PUT countData/measuredWeight




{
  shippingId
  measuredQTY 
  DateTime

}

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


    let lambda_handler = function(event, context) {
      if (event.eventName === 'INSERT') {
        let item = {
          'TimeStamp': record.dynamodb.NewImage.shippingID.S
        }
        console.log('Item: ', item);
      }
    }    

    
};

try {
  await dynamoDbLib.call("put", params);

  callback(null, success(params.Item));
} catch (e) {
  callback(null, failure({ status: false }));
}
}



/*

const params = {
  TableName: "iot_dinner",
  Item:{
    TimeStamp: data.shippingID,
    weight: data.weight_data.state.reported.Weight
  }
};
*/












