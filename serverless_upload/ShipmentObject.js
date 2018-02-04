import React, { Component } from "react";

var shippo = require('shippo')('shippo_test_b19b2d39541b35ca70355a176e82c084069431dd');

const addressFrom  = {
    "name": "Positech",
    "street1": "11310 Williamson Rd",
    "city": "Blue Ash",
    "state": "OH",
    "zip": "45241",
    "country": "US"
};

var addressTo = {
    "name": "this.state.name",
    "street1": "this.state.street1",
    "city": "this.state.city",
    "state": "this.state.state",
    "zip": "this.state.zip",
    "country": "this.state.country"
};

var parcel = {
    "length": "this.state.length",
    "width": "this.state.width",
    "height": "this.state.height",
    "distance_unit": "this.state.distance_unit",
    "weight": "this.state.weight",
    "mass_unit": "this.state.mass_unit"
};

shippo.shipment.create({
    "address_from": addressFrom,
    "address_to": addressTo,
    "parcels": [parcel],
    "async": false
}, function(err, shipment){
    // asynchronously called
});
