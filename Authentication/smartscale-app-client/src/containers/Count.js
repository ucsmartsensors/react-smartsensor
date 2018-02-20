import React, { Component } from "react";
import "./Home.css";
import { invokeApig } from '../libs/awsLib';
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      shipments: []
    };
  }

  async componentDidMount() {
    if (!this.props.isAuthenticated) {
      return;
    }
  
    try {
      const results = await this.shipments();
      this.setState({ shipments: results });
    } catch (e) {
      alert(e);
    }
  
    this.setState({ isLoading: false });
  }
  
  shipments() {
    return invokeApig({ path: "/count/1" });
  }

  renderShipmentsList(shipments) {
    return (<div>
      {this.state.shipments.shippingId}
      </div>);
  }
  
  handleNoteClick = event => {
    event.preventDefault();
    this.props.history.push(event.currentTarget.getAttribute("href"));
  }

  renderLander() {
    return (
      <div className="lander">
        <h1>SmartScale</h1>
        <p>A Smart Order Fullfillment System</p>
      </div>
    );
  }

  renderShipments() {
    return (
      <div className="notes">
        <PageHeader>Your Orders</PageHeader>
        <ListGroup>
          {!this.state.isLoading && this.renderShipmentsList(this.state.notes)}
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
