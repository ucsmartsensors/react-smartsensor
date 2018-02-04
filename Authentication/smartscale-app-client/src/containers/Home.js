import React, { Component } from "react";
import { PageHeader, ListGroup } from "react-bootstrap";
import "./Home.css";
import { invokeApig } from '../libs/awsLib';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      shipment: []
    };
    
  }

  async componentDidMount() {
    if (!this.props.isAuthenticated) {
      return;
    }
  
    try {
      const results = await this.shipment();
      this.setState({ shipment: results });
    } catch (e) {
      alert(e);
    }
  
    this.setState({ isLoading: false });
  }
  
  notes() {
    return invokeApig({ path: "/shipment" });
  }

  renderShipments(shipment) {
    return null;
  }

  renderLander() {
    return (
      <div className="lander">
        <h1>smart scale</h1>
        <p>order fullfillment </p>
      </div>
    );
  }

  renderNotes() {
    return (
      <div className="shipment">
        <PageHeader>Your shipment</PageHeader>
        <ListGroup>
          {!this.state.isLoading && this.renderShipments(this.state.shipment)}
        </ListGroup>
      </div>
    );
  }

  render() {
    return (
      <div className="Home">
        {this.props.isAuthenticated ? this.renderShipments() : this.renderLander()}
      </div>
    );
  }
}