import uuid from "uuid";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";
var shippo = require('shippo')('shippo_test_b19b2d39541b35ca70355a176e82c084069431dd');


/*
shippingId 
measuered qty = measuredWeight/weight
 Return PUT countData/measuredWeight
*/



//create shipment function
//event is the JSON payload sent from client (i.e. client triggered an event)
//callback is the response to client
export async function create(event, context, callback) {
  
  //JSON stored in reqData from API POST event from client
  const reqData = JSON.parse(event.body);
  // {parcel, addressTo, addressFrom}

  try {
    //create shipment object based on data sent from client
    const shipment = await shippo.shipment.create({
      "address_from": reqData.addressFrom,
      "address_to": reqData.addressTo,
      "parcels": [reqData.parcel],
      "async": false
    })

    //on successful API call, send back response of shipment.rates to client
    callback(null, success(shipment.rates));
  } catch (e) {
    callback(null, failure({ status: false }));
  }
}

//Transaction function
//event is the JSON payload sent from client
//callback is the response to client
export async function createTransaction(event, context, callback) {
  
  //JSON stored in reqData from API POST event from client
  // {rate, label_file_type, async}
  const reqData = JSON.parse(event.body);
  
  //set rateID to be used as a constant
  const rateId = reqData.rateId;
  

  try {
    
    //create transaction from chosen rateID
    const transaction = await shippo.transaction.create({
      "rate": rateId,
      "label_file_type": "PDF_4x6",
      "async": false
  })
   //on successful API call, send back response of transaction to client
    callback(null, success(transaction));
  } catch (e) {
    callback(null, failure({ status: false }));
  }
}