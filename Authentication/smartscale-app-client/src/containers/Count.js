import React, { Component } from "react";
import "./Home.css";
import { invokeApig } from '../libs/awsLib';
import { PageHeader, ListGroup, ListGroupItem, FormControl } from "react-bootstrap";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      shipments: [],
      search: '1'

    };
    this.updateSearch = this.updateSearch.bind(this)
    this.shipments = this.shipments.bind(this)
  }

  componentDidMount() {
    if (!this.props.isAuthenticated) {
      return;
    }
  /*
    try {
     const results = await this.shipments(this.state.search);
     this.setState({ shipments: results });
   } catch (e) {
    
    alert(e);
    }
   
    this.setState({ isLoading: false });
  */ 
  }

  
 
  
  async shipments(event) {

    event.preventDefault()
    
    const results = await invokeApig({ path: `/count/${this.state.search}` });
    console.log(results)
    this.setState({ shipments: results });
   
    }

    updateSearch = (event) =>{
      this.setState({search: event.target.value.substr(0, 20)
      
      });

      console.log(this.state.search)
    }
    
  renderShipmentsList() {
    console.log(this.state)

    return (<div>
      <ul>
        {this.state.shipments.map((shipment)=> {  
          return <li shipment={shipment} 
            key={shipment.shippingId}> 
            ShippingId:{shipment.shippingId}, 
            OrderId:{shipment.orderId},
            weight:{shipment.weight},
            qty:{shipment.qty},
            Total:{shipment.total}, </li>

        })}
        </ul>
      </div>);
  }
 
  renderLander() {
    return (
      <div className="lander">
        <h1>Orders</h1>
        <p>A Smart Order Fullfilment App</p>
      </div>
    );
  }

  renderShipments() {
    return (
      <div className="count">
        <PageHeader>Your Orders</PageHeader>
       
          {!this.state.isLoading }
          
          <form onSubmit={this.shipments}>

          <input type="text" value={this.state.search} 
        onChange={this.updateSearch}

        />
        <button> Search </button> 
         </form> 
          
         <ListGroup>
         {this.renderShipmentsList(this.state.shipments)}
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