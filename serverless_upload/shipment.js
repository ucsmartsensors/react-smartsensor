import uuid from "uuid";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";
var shippo = require('shippo')('shippo_test_b19b2d39541b35ca70355a176e82c084069431dd');


/*


shippingId 
measuered qty = measuredWeight/weight
 
Return PUT countData/measuredWeight


*/



export async function create(event, context, callback) {
  const reqData = JSON.parse(event.body);
  // {parcel, addressTo, addressFrom}

  try {
    //await dynamoDbLib.call("put", params);
    const shipment = await shippo.shipment.create({
      "address_from": reqData.addressFrom,
      "address_to": reqData.addressTo,
      "parcels": [reqData.parcel],
      "async": false
    })
    callback(null, success(shipment.rates));
  } catch (e) {
    callback(null, failure({ status: false }));
  }
}

export async function createTransaction(event, context, callback) {
  const reqData = JSON.parse(event.body);
  const rateId = reqData.rateId;
  // {parcel, addressTo, addressFrom}

  try {
    //await dynamoDbLib.call("put", params);
    const transaction = await shippo.transaction.create({
      "rate": rateId,
      "label_file_type": "PDF",
      "async": false
  })
    callback(null, success(transaction));
  } catch (e) {
    callback(null, failure({ status: false }));
  }
}