import fetch from 'isomorphic-fetch';

export function ShippoPostShipment(data) {
    return fetch('https://api.goshippo.com/shipments/', {
        method: 'POST',
        mode: 'CORS',
        headers: {
            'Authorization': 'ShippoToken shippo_test_b19b2d39541b35ca70355a176e82c084069431dd'
            'Content-Type': 'application/json'
        }
        body: JSON.stringify(data),({
        {
          "address_from":{
          "name":"Daren Kummer",
          "street1":"5492 Brandywine Lane",
          "city":"Milford",
          "state":"OH",
          "zip":"45150",
          "country":"US",
            },
          "address_to":{
          "name":"",
          "street1":"",
          "city":"",
          "state":"",
          "zip":"",
          "country":"US",
            },
          "parcels":[{
          "length":"",
          "width":"",
          "height":"",
          "distance_unit":"in",
          "weight":"",
          "mass_unit":"lb"
        }],
     "async": false
  }
      })
    }).then(res => {
        return res;
    }).catch(err => err);
}
