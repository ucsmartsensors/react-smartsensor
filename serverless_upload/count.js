import uuid from "uuid";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";
var AWS = require('aws-sdk') 
var docClient = new AWS.DynamoDB.DocumentClient();
/*

shippingId 
measuered qty = measuredWeight/weight
 
Return PUT countData/measuredWeight

*/


export const handler = (event, context, callback) => {
  console.log('event', JSON.stringify(event, true));
  console.log('context', JSON.stringify(context, true));
  //var data = event; const data = JSON.parse(event.body);
  var data = JSON.parse(event.body);
  
  const otherParams = {
    TableName: "Orders",
    Item: {
      shippingId: data.shippingId,
      orderId: data.orderId,
      weight: data.weight,
      qty: data.qty, 
      total: data.total, 
     createdAt: new Date().getTime(),
    }
  }
  
    // step 2
    //query scale database, return most recent entry in the database
    //grab the measured weight data from it
    
    
console.log("Querying for items");

/*
{
  "Arduino_JSON": {
    "M": {
      "UUID": {
        "N": "11745"
      },
      "weight": {
        "N": "98"
      }
    }
  },
  "device_id": {
    "S": "awsYun"
  },
  "timestamp": {
    "S": "1521938404743"
  }
}
*/
var params = {
    TableName : "Iot_Rawdata",
    KeyConditionExpression: "#id = :id",
    ExpressionAttributeNames:{
        "#id": "device_id"
    },
    ExpressionAttributeValues: {
        ":id":"awsYun"
    },
    ScanIndexForward:false
};

docClient.query(params, function(err, data) {
    if (err) {
        console.log("Unable to query. Error:", JSON.stringify(err, null, 2));
        callback("Query failed ... cannot go futher");
    } else {
      console.log(data.Items[0]);
      //console.log(JSON.stringify(JSON.parse(data.Items[0])));
        //console.log("Query succeeded. Got first as: " + JSON.stringify(JSON.parse(data.Items[0])));
        confirmWeight(data.Items[0].Arduino_JSON);
        //call out function for step3
        /*data.Items.forEach(function(item) {
            console.log(item.timestamp, item)
        });*/

    }
});


function confirmWeight(scaleData){
  console.log("Calculating Scale Info",scaleData.weight);
  var qty = data.qty;
  var measuredWeight = scaleData.weight;
  var itemWeight = data.weight;

  var expectedWeight = qty*itemWeight;
  var tolerance = 100;  //+ or - this eight
  
  //boolean
  var isFulfilled = (Math.abs(expectedWeight-measuredWeight) <= tolerance);
  console.log("Do weights match?  ", isFulfilled);
  updateOrdersTable(isFulfilled, expectedWeight, measuredWeight); 
}

function updateOrdersTable(isFulfilled, expectedWeight, measuredWeight){

// Update the item, unconditionally,
console.log("Started to Send Update")
var params = {
  TableName:"Orders",
  Key:{
      "shippingId": data.shippingId,
      "orderId":data.orderId,
  },
  UpdateExpression: "set isFulfilled = :f",
  ExpressionAttributeValues:{
      ":f":isFulfilled
  },
  ReturnValues:"UPDATED_NEW"
};

console.log("Updating the item...");
docClient.update(params, function(err, data) {
  if (err) {
      console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));

      var resp = {
        statusCode: 500,
        body:"UPDATE FAILED"
      }

      callback(resp);
  } else {
      console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
      
      isEntireOrderFulfilled(expectedWeight,measuredWeight,isFulfilled);
  }
});

function isEntireOrderFulfilled(expectedWeight, measuredWeight,isFulfilled){
  var params = {
    TableName : "Orders",
    KeyConditionExpression: "#id = :id",
    ExpressionAttributeNames:{
        "#id": "orderId"
    },
    ExpressionAttributeValues: {
        ":id":data.orderId
    }
};

docClient.query(params, function(err, data) {
    if (err) {
        console.log("Unable to query. Error:", JSON.stringify(err, null, 2));
        var resp = {
          statusCode: 500,
          body:"Query FAILED"
        }
  
        callback(resp);
    } else {

      var body = {
        expectedWeight, measuredWeight, isFulfilled
      }

        //call out function for step3
        data.Items.forEach(function(item) {
          if(item.isFulfilled != true){
            body.entireShipmentFulfilled = false;
            var resp = {
              statusCode: 200,
              body:JSON.stringify(body)
            }
            callback(null,resp)
          }  
        });
        
        body.entireShipmentFulfilled = true;
        var resp = {
          statusCode: 200,
          body:JSON.stringify(body)
        }
        
        callback(null,resp)

    }
});






}

}





}   ;

  //step 3 
    //to get the data from the shippingID, weight, qty, 
    //calculate total qty based of weight of individual item and measured weight
    

    //incrememnt this, and be able to weigh again if needed until the expected qty is matched
    //and trigger a flag. If required qty has been fulfilled than fulfilled=true

/*

  const functionName = 'the-other-function; // this exists
  const payload = { foo: 'bar' };

  console.log('before invoke');
  promiseInvoke({ functionName, payload })
    .then(() => {
      console.log('after invoke');
      callback(null, null);
    })
    .catch(error => {
      console.error(error);
      callback(error);
    });
  console.log('handler exit');*/




/*

const params = {
  TableName: "iot_dinner",
  Item:{
    TimeStamp: data.shippingID,
    weight: data.weight_data.state.reported.Weight
  }
};
*/




