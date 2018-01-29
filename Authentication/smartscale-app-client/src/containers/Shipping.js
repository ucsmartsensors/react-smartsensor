import React, { Component } from "react";
import "./Shipping.css";
import ShippingSubmit from './components/ShippingSubmit';
import "./components/ShippoPostShipment";

export default class Shipping extends Component {
  render() {
    return (
      <div className="Shipping">
        <div className="card">
          <form name="shippingform" onSubmit={this.handleSubmit}>
            <fieldset>
              Select Order:<br></br>
              <select id="orders">
                  <option value="orderid">Order</option>
              </select>
              <br></br><br></br>
              <legend>Dimensions in Inches</legend>
              Height:
              <input type="text" input id="height" />
              Width:
              <input type="text" input id="width" />
              Length:
              <input type="text" input id="length" />
              Weight:
              <input type="text" input id="weight" />
              Distance Unit:
              <input type="text" input id="distance_unit" value="in" />
              Mass Unit:
              <input type="text" input id="mass_unit" value="lb" />
            </fieldset>
            <br></br>
            <fieldset>
                <legend>Shipping To:</legend>
                Name:
                <input type="text" input id="name" />
                Address Line 1:
                <input type="text" input id="street1" />
                City:
                <input type="text" input id="city" />
                State:
                <input type="text" input id="state" />
                <br></br>
                Zip:
                <input type="text" input id="zip" />
                Country:
                <input type="text" input id="country" value="US" />
                <button type="submit">Print Label</button>
        </fieldset>
        </form>
        </div>
      </div>
    );
  }
}
