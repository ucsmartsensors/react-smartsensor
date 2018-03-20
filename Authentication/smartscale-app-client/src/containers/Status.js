import React, { Component } from "react";
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
            <ListGroup>
              
             {this.state.status.map((shipment)=> {  
          return <ListGroupItem bsStyle={shipment.fulfilled ? 'success' : 'danger'} 

    
            shipment={shipment} 
            key={shipment.shippingId}> 
            ShippingId:{shipment.shippingId}, 
            OrderId:{shipment.orderId},
            weight:{shipment.weight},
            qty:{shipment.qty},
            Total:{shipment.total}, </ListGroupItem>
             
        })}
        </ListGroup>
            
          </div>
        );

}
}
