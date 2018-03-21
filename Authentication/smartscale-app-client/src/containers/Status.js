import React, { Component } from "react";
import { Icon, Label, Menu, Table } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import { invokeApig } from "../libs/awsLib";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import config from "../config";
import "./Shipments.css";
import AWS from "aws-sdk";
import Select from 'react-select';
import 'react-select/dist/react-select.css';
AWS.config.update({ region: "us-east-2" });

export default class Status extends Component {
  constructor(props) {
    super(props);

    this.state = {
        status: []
      };
       
  }
  
 async componentDidMount() {
    if (!this.props.isAuthenticated) {
      return;
    }
    try {
      const statusResults = await this.status();
      this.setState({ status: statusResults });
      console.log(this)
    } catch (e) {
      alert(e);
      console.log(e)
    }
  
    this.setState({ isLoading: false });
  }
  
  status() {
    return invokeApig({ path: "/status" });
  }

  
  


  render() {
    
    return (
      <div>
      
      
   <Table celled striped stackable compact inverted>
      <Table.Header>
      <Table.Row >
        <Table.HeaderCell>ShipmentId</Table.HeaderCell>
        <Table.HeaderCell>OrderId</Table.HeaderCell>
        <Table.HeaderCell>Weight</Table.HeaderCell>
        <Table.HeaderCell>QTY</Table.HeaderCell>
        <Table.HeaderCell>Total</Table.HeaderCell>
      </Table.Row>
    </Table.Header>   
    <Table.Body>
    
  
      
      {this.state.status.map((shipment)=> {  
        if (shipment.fulfilled) {
    return <Table.Row key={shipment.shippingId} positive>
      <Table.Cell>{shipment.shippingId}</Table.Cell>
      <Table.Cell>{shipment.orderId}</Table.Cell>
      <Table.Cell>{shipment.weight}</Table.Cell>
      <Table.Cell>   {shipment.qty} </Table.Cell>
      <Table.Cell> <Icon name='checkmark' />    {shipment.total} </Table.Cell>
    </Table.Row>   
        }
    return <Table.Row key={shipment.shippingId} negative>
    <Table.Cell>{shipment.shippingId}</Table.Cell>
    <Table.Cell>{shipment.orderId}</Table.Cell>
    <Table.Cell>{shipment.weight}</Table.Cell>
    <Table.Cell>   {shipment.qty} </Table.Cell>
    <Table.Cell> <Icon name='attention' />    {shipment.total} </Table.Cell>
  </Table.Row>   ;
      })}
    
    </Table.Body>
  </Table>
   
    </div>
    
        );

}
}
