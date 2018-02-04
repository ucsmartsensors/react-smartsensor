import React, { Component } from "react";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import "./Home.css";
import { invokeApig } from '../libs/awsLib';
import Amplify, { API } from 'aws-amplify';
import aws_exports from '../aws_exports';
Amplify.configure(aws_exports);

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      shipments: [],
      orderId: ''
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

 /*
  async shipments() { 
    let apiName = 'getOrder';
    let path = '/count/1';
    let myInit = { // OPTIONAL
        headers: {} // OPTIONAL
    }
    return await API.get(apiName, path, myInit);
}
*/
  
  shipments() {
    return invokeApig({ path: `/count/1` });
  }
  

renderShipments(shipments) {
  console.log(shipments.orderId)
  return [{}].concat(shipments).map(
    (shipment) =>

    <ListGroupItem
            key={shipment}
            href={`/orders/${shipment}`}
            onClick={this.handleNoteClick}
            
          >
          </ListGroupItem>
        

  );
}

handleNoteClick = event => {
  event.preventDefault();
  this.props.history.push(event.currentTarget.getAttribute("href"));
}

  renderLander() {
    return (
      <div className="lander">
        <h1>smart scale</h1>
        <p>order fullfillment </p>
      </div>
    );
  }

  rendershipments() {
    return (
      <div className="shipment">
        <PageHeader>Your shipment</PageHeader>
        
        <ListGroup>
          {!this.state.isLoading && this.renderShipments(this.state.shipments)}
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