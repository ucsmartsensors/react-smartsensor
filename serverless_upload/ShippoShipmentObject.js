// replace <YOUR_PRIVATE_KEY> with your ShippoToken key
var shippo = require('shippo')('shippo_test_b19b2d39541b35ca70355a176e82c084069431dd');

var addressFrom  = {
	"name":"Ms Hippo",
	"company":"Shippo",
	"street1":"215 Clayton St.",
	"city":"San Francisco",
	"state":"CA",
	"zip":"94117",
	"country":"US", //iso2 country code
	"phone":"+1 555 341 9393",
	"email":"ms-hippo@goshippo.com",
}

// example address_to object dict
var addressTo = {
	"name":"Mr Hippo",
	"company":"London Zoo",
	"street1":"Regent's Park",
	"street2":"Outer Cir",
	"city":"LONDON",
	"state":"",
	"zip":"NW1 4RY",
	"country":"GB", //iso2 country code
	"phone":"+1 555 341 9393",
	"email":"mrhippo@goshippo.com",
	"metadata" : "Hippo T-Shirt Order #1043"
}

// parcel object dict
var parcel = {
	"length":"5",
	"width":"5",
	"height":"5",
	"distance_unit":"in",
	"weight":"2",
	"mass_unit":"lb",
}

	return shippo.shipment.create({
		"address_from": addressFrom,
		"address_to": addressTo,
		"parcels": [parcel],
		"customs_declaration": customsDeclaration.object_id,
		"async": false
	})

//}, function(err) {
	// Deal with an error
	//console.log("There was an error creating customs declaration: %s", err);
//})
.then(function(shipment) {
	console.log("shipment : %s", JSON.stringify(shipment, null, 4));
	shippo.shipment.rates(shipment.object_id)
	.then(function(rates) {
		console.log("rates : %s", JSON.stringify(rates, null, 4));
		// Get the first rate in the rates results for demo purposes.
		rate = rates.results[0];
		// Purchase the desired rate
		return shippo.transaction.create({"rate": rate.object_id, "async": false})
	}).catch(function(err) {
		// Deal with an error
		console.log("There was an error retrieving rates : %s", err);
	})
	.then(function(transaction) {
			console.log("transaction : %s", JSON.stringify(transaction, null, 4));
			// print label_url and tracking_number
			if(transaction.status == "SUCCESS") {
				console.log("Label URL: %s", transaction.label_url);
				console.log("Tracking Number: %s", transaction.tracking_number);
			}else{
				//Deal with an error with the transaction
				console.log("Message: %s", JSON.stringify(transaction.messages, null, 2));
			}

	}).catch(function(err) {
		// Deal with an error
		console.log("There was an error creating transaction : %s", err);
	});
}).catch(function(err) {
	// Deal with an error
	console.log("There was an error creating shipment: %s", err);
});
