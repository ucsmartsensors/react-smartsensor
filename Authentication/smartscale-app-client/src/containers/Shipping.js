import React, { Component } from "react";
import "./Shipping.css";
import { Form } from "react-bootstrap";
import axios from 'axios';
import AWS from "aws-sdk";
AWS.config.update({ region: "us-east-2" });
const dynamoDb = new AWS.DynamoDB.DocumentClient();

export default class Shipping extends Component {
  constructor(props) {
      super(props);
        this.state = {
          height: "",
          width: "",
          length: "",
          weight: "",
          name: "",
          street1: "",
          city: "",
          state: "",
          zip: "",
          country: "",
          distance_unit: "",
          mass_unit: ""
          };

          this.handleChange = this.handleChange.bind(this);
          this.handleSubmit = this.handleSubmit.bind(this);
        }

        handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
      }

      handleSubmit = (e) => {
        e.preventDefault();
        const { name, street1, city, state, zip, country, length, width, height, distance_unit, weight, mass_unit } = this.state;

         //axios.post('/', { name, street1, city, state, zip, country, length, width, height, distance_unit, weight, mass_unit })
        //.then((result) => {
      }

  render() {
    return (
      <div className="Shipping">
        <div className="card">
          <form onSubmit={this.handleSubmit}>
            <fieldset>
              Select Order:<br></br>
              <select id="orders">
                  <option value="orderid">Order</option>
              </select>
              <br></br><br></br>
              <legend>Dimensions in Inches</legend>
              Height:
              <input
                name="height"
                type="text"
                onChange={this.handleChange}
                value={this.state.height}
                placeholder="Enter text" />
              Width:
              <input
                name="width"
                type="text"
                placeholder="Enter text"
                value={this.state.width}
                onChange={this.handleChange} />
              Length:
              <input
                name="length"
                type="text"
                placeholder="Enter text"
                value={this.state.length}
                onChange={this.handleChange} />
              Weight:
              <input
                name="weight"
                type="text"
                placeholder="Enter text"
                value={this.state.weight}
                onChange={this.handleChange} />
              Distance Unit:
              <input
                name="distance_unit"
                type="text"
                value="in" />
              Mass Unit:
              <input
                name="mass_unit"
                type="text"
                value="lb" />
            </fieldset>
            <br></br>
            <fieldset>
                <legend>Shipping To:</legend>
                Name:
                <input
                  name="name"
                  type="text"
                  placeholder="Enter text"
                  value={this.state.name}
                  onChange={this.handleChange} />
                Address Line 1:
                <input
                  name="street1"
                  type="text"
                  placeholder="Enter text"
                  value={this.state.street1}
                  onChange={this.handleChange} />
                City:
                <input
                  name="city"
                  type="text"
                  placeholder="Enter text"
                  value={this.state.city}
                  onChange={this.handleChange} />
                State:
                <input
                  name="state"
                  type="text"
                  placeholder="Enter text"
                  value={this.state.state}
                  onChange={this.handleChange} />
                <br></br>
                Zip:
                <input
                  name="zip"
                  type="text"
                  placeholder="Enter text"
                  value={this.state.zip}
                  onChange={this.handleChange} />
                Country:
                <input
                  name="country"
                  type="text"
                  value="US" />
                <button type="submit">Get Rates</button>
        </fieldset>
        </form>
        </div>
      </div>
    );
  }
}
