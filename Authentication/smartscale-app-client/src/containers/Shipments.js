import React, { Component } from "react";
import { invokeApig } from "../libs/awsLib";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import config from "../config";
import "./Shipping.css";
import AWS from "aws-sdk";
AWS.config.update({ region: "us-east-2" });

export default class Shipments extends Component {
  constructor(props) {
    super(props);

    // this.file = null;
    this.state = {
        shipment: {
        isLoading: null,
        isDeleting: null,
        shipmentId: null,
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
  }

  async componentDidMount() {
    try {
      const results = await this.getShipment();
      this.setState({
        shipment: results,
        height: results.height,
        width: results.width,
        length: results.length,
        weight: results.weight,
        name: results.name,
        street1: results.street1,
        city: results.city,
        state: results.state,
        zip: results.zip,
        country: results.county,
        distance_unit: results.distance_unit,
        mass_unit: results.mass_unit
      });
    } catch (e) {
      alert(e);
    }
  }

  getShipment() {
    return invokeApig({ path: `/shipments/${this.props.match.params.id}` });
  }

  validateForm() {
    if (this.state.shipment > 0) {
      return this.state.shipment;
    }
    else {
        console.log('FAILLLLLLLLLLLLLLLLLLLLLLLLL');
    }
  }

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
    let uploadedFilename;

    event.preventDefault();

    this.setState({ isLoading: true });

    try {

      await this.saveShipment({
        ...this.state.shipment,
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
      <div className="Shipping">
        {this.state.shipment &&
          <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="orders">
              <ControlLabel>Select</ControlLabel>
              <FormControl componentClass="select" placeholder="orders">
                <option value="select">select</option>
                <option value="other">...</option>
              </FormControl>
            </FormGroup>
            <FormGroup controlId="height">
              <FormControl
                onChange={this.handleChange}
                value={this.state.shipment.height}
                label="Height"
                componentClass="text" />
            </FormGroup>
            <FormGroup controlId="width">
              <FormControl
                onChange={this.handleChange}
                value={this.state.shipment.width}
                label="Width"
                componentClass="text" />
            </FormGroup>
            <FormGroup controlId="length">
              <FormControl
                onChange={this.handleChange}
                value={this.state.shipment.length}
                label="Length"
                componentClass="text" />
            </FormGroup>
            <FormGroup controlId="weight">
              <FormControl
                onChange={this.handleChange}
                value={this.state.shipment.weight}
                label="Weight"
                componentClass="text" />
            </FormGroup>
            <FormGroup controlId="distance_unit">
              <FormControl
                onChange={this.handleChange}
                value={this.state.shipment.distance_unit}
                label="Distance Unit"
                componentClass="text" />
            </FormGroup>
            <FormGroup controlId="mass_unit">
              <FormControl
                onChange={this.handleChange}
                value={this.state.shipment.mass_unit}
                label="Mass Unit"
                componentClass="text" />
            </FormGroup>
            <FormGroup controlId="name">
              <FormControl
                onChange={this.handleChange}
                value={this.state.shipment.name}
                label="Name"
                componentClass="text" />
            </FormGroup>
            <FormGroup controlId="street1">
              <FormControl
                onChange={this.handleChange}
                value={this.state.shipment.street1}
                label="Address Line 1"
                componentClass="text" />
            </FormGroup>
            <FormGroup controlId="city">
              <FormControl
                onChange={this.handleChange}
                value={this.state.shipment.city}
                label="City"
                componentClass="text" />
            </FormGroup>
            <FormGroup controlId="state">
              <FormControl
                onChange={this.handleChange}
                value={this.state.shipment.state}
                label="State"
                componentClass="text" />
            </FormGroup>
            <FormGroup controlId="zip">
              <FormControl
                onChange={this.handleChange}
                value={this.state.shipment.zip}
                label="Zip"
                componentClass="text" />
            </FormGroup>
            <FormGroup controlId="country">
              <FormControl
                onChange={this.handleChange}
                value={this.state.shipment.country}
                label="Country"
                componentClass="text" />
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
          </form>}
      </div>
    );
}
}
