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
   
};





/*

const params = {
  TableName: "iot_dinner",
  Item:{
    TimeStamp: data.shippingID,
    weight: data.weight_data.state.reported.Weight
  }
};
*/

let lambda_handler = function(event, context) {
  if (event.eventName === 'INSERT') {
    let item = {
      'TimeStamp': record.dynamodb.NewImage.shippingID.S
    }
    console.log('Item: ', item);
  }
}

def lambda_handler(event, context) 
    for record in event['iot_dinner']:
        if record['eventName'] == 'INSERT':
            Item = {
                'TimeStamp': record['dynamodb']['NewImage']['ShippingID']['S'],
  
            }
            logger.info('Book: ' + json.dumps(book, indent=2))






  try {
    await dynamoDbLib.call("put", params);

    callback(null, success(params.Item));
  } catch (e) {
    callback(null, failure({ status: false }));
  }
}



var myLeftPromise = request.getItem(thisPullParams).promise().then(function(data) {return URL_BASE + data.Item.imageFile.S});

// set a random number 0-9 for the slot position
thisPullParams.Key.slotPosition.N = Math.floor(Math.random()*10).toString();
// call DynamoDB to retrieve the image to use for the Middle slot result
var myMiddlePromise = request.getItem(thisPullParams).promise().then(function(data) {return URL_BASE + data.Item.imageFile.S});

// set a random number 0-9 for the slot position
thisPullParams.Key.slotPosition.N = Math.floor(Math.random()*10).toString();
// call DynamoDB to retrieve the image to use for the Right slot result
var myRightPromise = request.getItem(thisPullParams).promise().then(function(data) {return URL_BASE + data.Item.imageFile.S});


Promise.all([deviceData, postData]).then(function(values) {
  // assign resolved promise values to returned JSON
  slotResults.leftWheelImage.file.S = values[0];
  slotResults.middleWheelImage.file.S = values[1];
  slotResults.rightWheelImage.file.S = values[2];
  // if all three values are identical, the spin is a winner
  if ((values[0] === values[1]) && (values[0] === values[2])) {
    slotResults.isWinner = true;            
  }
  // return the JSON result to the caller of the Lambda function
  callback(null, slotResults);
});