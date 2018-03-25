import React, { Component } from "react";
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import "./Home.css";
import { invokeApig } from '../libs/awsLib';
import { PageHeader, ListGroup, ListGroupItem, FormControl } from "react-bootstrap";


class ShipmentItem extends Component {
  state = {
    info : []
  }

  onHandleClick() {
    //async onHandleClick(shipment) {
      const { shipment } = this.props;
      console.log(shipment)
      invokeApig({
        path: "/countData/",
        method: "POST",
        body: shipment
      }).then( results => {

        
     console.log('RESULTS:', results);

     this.setState({ info: results });

      } ).catch( e => console.warn('Erro requesting API:', e) );
    

      //}  
    
    // pull the data from api
    // and update the state with setState
  }
  render(){
    const { shipment } = this.props;
    const { info } = this.state;
    console.log(shipment)
    console.log('INFO:', info)

    // use this.state.info somewhere in the ui

    return (
      <ListGroupItem bsStyle={info.isFulfilled ? "success" : "info" } onClick={e => this.onHandleClick() } 
            shipment={shipment} 
            key={shipment.shippingId}> 
            
            
            ShippingId:{shipment.shippingId}, 
            OrderId:{shipment.orderId},
            weight:{shipment.weight}, 
            measuredqty:{shipment.qty}
            expectedWeight:{info.expectedWeight}

                 
             

          {/* {"expectedWeight":150,"measuredWeight":0,"isFulfilled":false,"entireShipmentFulfilled":false} */}
            
          </ListGroupItem>
    )
  }
}




export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      shipments: [],
      search: '',
      confirm: false,
      response: []
      

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
    


  
  
      




    //this.sendCount(shipment.shippingId)


  renderShipmentsList() {
    console.log(this.state)

    return (<div>
      <ListGroup>
        {this.state.shipments.map((shipment)=> {  
          return <ShipmentItem shipment={shipment} />

           

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