import React, { Component } from "react";
import { invokeApig } from "../libs/awsLib";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import config from "../config";
import "./Shipments.css";
import AWS from "aws-sdk";
AWS.config.update({ region: "us-east-2" });

export default class Shipments extends Component {
  constructor(props) {
    super(props);

    this.state = {
        shipment: {
        isLoading: "",
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
        }
      };
       this.handleChange = this.handleChange.bind(this);
       this.handleSubmit = this.handleSubmit.bind(this);
  }

  validateForm() {
       return this.state.shipment;
     };

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  saveShipment(shipment) {
    return invokeApig({
      path: `/shipments/${this.props.match.params.id}`,
      method: "PUT",
      body: shipment
    });
  }

  handleSubmit = async event => {
      event.preventDefault();
        const { name, street1, city, state, zip, country, length, width, height, distance_unit, weight, mass_unit } = this.state.shipment;
    this.setState({ isLoading: true });

    try {

      this.saveShipment({
        name: this.state.shipment.name,
        street1: this.state.shipment.street1,
        city: this.state.shipment.city,
        state: this.state.shipment.state,
        zip: this.state.shipment.zip,
        country: this.state.shipment.country,
        length: this.state.shipment.length,
        width: this.state.shipment.width,
        height: this.state.shipment.height,
        distance_unit: this.state.shipment.distance_unit,
        weight: this.state.shipment.weight,
        mass_unit: this.shipment.mass_unit,
      });
      this.props.history.push("/");
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  }

  render() {
    return (
      <div className="Shipments">
          <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="orders">
              <ControlLabel>Select Order</ControlLabel>
              <FormControl componentClass="select" placeholder="orders">
                <option value="select">select</option>
                <option value="other">...</option>
              </FormControl>
            </FormGroup>
            <FormGroup controlId="height">
            <ControlLabel>Dimensions in Inches</ControlLabel>
              <FormControl
                onChange={this.handleChange}
                value={this.state.shipment.height}
                label="Height"
                name="height"
                placeholder="Height"
                type="text" />
            </FormGroup>
            <FormGroup controlId="width">
              <FormControl
                onChange={this.handleChange}
                value={this.state.shipment.width}
                label="Width"
                name="width"
                placeholder="Width"
                type="text" />
            </FormGroup>
            <FormGroup controlId="length">
              <FormControl
                onChange={this.handleChange}
                value={this.state.shipment.length}
                label="Length"
                name="length"
                placeholder="Length"
                type="text" />
            </FormGroup>
            <FormGroup controlId="weight">
              <FormControl
                onChange={this.handleChange}
                value={this.state.shipment.weight}
                label="Weight"
                name="weight"
                placeholder="Weight"
                type="text" />
            </FormGroup>
            <FormGroup controlId="distance_unit">
              <FormControl
                onChange={this.handleChange}
                value={this.state.shipment.distance_unit}
                label="Distance Unit"
                name="distance_unit"
                placeholder="Distance Unit"
                type="text" />
            </FormGroup>
            <FormGroup controlId="mass_unit">
              <FormControl
                onChange={this.handleChange}
                value={this.state.shipment.mass_unit}
                label="Mass Unit"
                name="mass_unit"
                placeholder="Mass Unit"
                type="text" />
            </FormGroup>
            <FormGroup controlId="name">
            <ControlLabel>Shipping To</ControlLabel>
              <FormControl
                onChange={this.handleChange}
                value={this.state.shipment.name}
                label="Name"
                name="name"
                placeholder="Name"
                type="text" />
            </FormGroup>
            <FormGroup controlId="street1">
              <FormControl
                onChange={this.handleChange}
                value={this.state.shipment.street1}
                label="Address Line 1"
                name="street1"
                placeholder="Address Line 1"
                type="text" />
            </FormGroup>
            <FormGroup controlId="city">
              <FormControl
                onChange={this.handleChange}
                value={this.state.shipment.city}
                label="City"
                name="city"
                placeholder="City"
                type="text" />
            </FormGroup>
            <FormGroup controlId="state">
              <FormControl
                onChange={this.handleChange}
                value={this.state.shipment.state}
                label="State"
                name="state"
                placeholder="State"
                type="text" />
            </FormGroup>
            <FormGroup controlId="zip">
              <FormControl
                onChange={this.handleChange}
                value={this.state.shipment.zip}
                label="Zip"
                name="zip"
                placeholder="Zip"
                type="text" />
            </FormGroup>
            <FormGroup controlId="country">
              <FormControl
                onChange={this.handleChange}
                value={this.state.shipment.country}
                label="Country"
                name="country"
                placeholder="US"
                type="text" />
            </FormGroup>

            <LoaderButton
              block
              bsStyle="primary"
              bsSize="large"
              disabled={!this.validateForm()}
              type="submit"
              isLoading={this.state.isLoading}
              text="Save"
              loadingText="Saving…" />
          </form>
          </div>
        );

}
}
