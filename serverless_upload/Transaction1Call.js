
var shippo = require('shippo')('shippo_test_b19b2d39541b35ca70355a176e82c084069431dd');

// Create a new transaction object and purchase the shipping label with one API call
shippo.transaction.create({
    "shipment": {
      "address_to": {
        "name": "this.state.name",
        "street1": "this.state.street1",
        "city": "this.state.city",
        "state": "this.state.state",
        "zip": "this.state.zip",
        "country": "this.state.country",
      },
      "address_from": {
        "name": "Positech",
        "street1": "11310 Williamson Rd",
        "city": "Blue Ash",
        "state": "OH",
        "zip": "45241",
        "country": "US",
      },
      "parcels": [{
        "length": "this.state.length",
        "width": "this.state.width",
        "height": "this.state.height",
        "distance_unit": "this.state.distance_unit",
        "weight": "this.state.weight",
        "mass_unit": "this.state.mass_unit"
      }]
    },
    "carrier_account": "b741b99f95e841639b54272834bc478c",
    "servicelevel_token": "usps_priority"
}, function(err, transaction) {
   // asynchronous callback
});
