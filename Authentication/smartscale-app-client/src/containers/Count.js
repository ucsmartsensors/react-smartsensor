import React, { Component } from "react";
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import "./Home.css";
import { invokeApig } from '../libs/awsLib';
import { PageHeader, ListGroup, ListGroupItem, FormControl } from "react-bootstrap";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      shipments: [],
      search: '',
      confirm: false,
      

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

ShowHideTextComponentView = () =>{
 
  if(this.state.confirm == true)
  {
    this.setState({confirm: false})
  }
  else
  {
    this.setState({confirm: true})
  }
};

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
    
    

  async onHandleClick(shipment) {
      console.log(shipment)
      const results = invokeApig({
        path: "/countData/",
        method: "POST",
        body: shipment

      });
      
    }
  
    //this.sendCount(shipment.shippingId)


  renderShipmentsList() {
    console.log(this.state)

    return (<div>
      <ListGroup>
        {this.state.shipments.map((shipment)=> {  
          return <ListGroupItem onClick={() => this.onHandleClick(shipment)} 
            shipment={shipment} 
            key={shipment.shippingId}> 
            ShippingId:{shipment.shippingId}, 
            OrderId:{shipment.orderId},
            weight:{shipment.weight},
            qty:{shipment.qty},
            Total:{shipment.total}, </ListGroupItem>

        })}
        </ListGroup>
      </div>);
  }
 
  renderResponse() {
    return(
      <div className="Confirm">
       {this.state.confirm ? <p>Order data has been sent to the scale.</p> :null}
      <button onClick={this.ShowHideTextComponentView}>Confirm</button>
      </div>
    )
  
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
      <div className="Count">
        <PageHeader className="Count">Orders</PageHeader>
       
          {!this.state.isLoading }
          
          <form onSubmit={this.shipments}>
          

          <input type="text" value={this.state.search} 
        onChange={this.updateSearch}

        />
        <button> Search </button> 
         </form> 
          <p></p>
         <ListGroup>
         {this.renderShipmentsList(this.state.shipments)}
        </ListGroup>
      </div>
    );
  }

  render() {
    return (
      <div className="Count">
        {this.props.isAuthenticated ? this.renderShipments() : this.renderLander()}
        {this.props.isAuthenticated ? this.renderResponse() : this.renderLander()}
      </div>
    );
  }
}