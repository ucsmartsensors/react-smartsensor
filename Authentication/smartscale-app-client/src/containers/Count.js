import React, { Component } from "react";
import "./Home.css";
import { invokeApig } from '../libs/awsLib';
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      shipments: [],
      search: '1'
    };
   }

  
   updateSearch = (event) =>{
    this.setState({search: event.target.value.substr(0, 20)
    });
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
   
    this.setState({ isLoading: true });
    
  }

 
 
  
  shipments() {
    return invokeApig({ path: `/count/${this.state.search}` });
    console.log(this.shipments)
  }

  renderShipmentsList() {
    let filteredShipments = this.props.shipments.filter(
     (shipment) => {
      return shipment.shippingId.indexOf(this.state.
        search) !==1;

      }
        
    );
  /* <p key={shipment.shippingId}> ShippingID:{shipment.shippingId}, OrderID:{shipment.orderId}, Weight:{shipment.weight}, QTY:{shipment.qty}, Total:{shipment.total} </p> */   

    return (<div>
      <ul>
        {filteredShipments.map((shipment)=> {  
          return <Home shipment={shipment}
            key={shipment.shippingId}/>

        })}

<input type="text" value={this.state.search} 
        onChange={this.updateSearch.bind(this)}
        /> 
      
      </ul>
   
        
        

      </div>);
  }
 
  /*
  handleNoteClick = event => {
    event.preventDefault();
    this.props.history.push(event.currentTarget.getAttribute("href"));
  }
  */
  renderLander() {
    return (
      <div className="lander">
        <h1>Scratch</h1>
        <p>A simple note taking app</p>
      </div>
    );
  }

  renderShipments() {
    return (
      <div className="notes">
        <PageHeader>Your Orders</PageHeader>
        <ListGroup>
          {!this.state.isLoading && this.renderShipmentsList(this.state.shipments)}
          
          
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