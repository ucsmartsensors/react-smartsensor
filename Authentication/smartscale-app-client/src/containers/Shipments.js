import React, { Component } from "react";
import { Icon, Label, Menu, Table } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { invokeApig } from "../libs/awsLib";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import config from "../config";
import "./Shipments.css";
import AWS from "aws-sdk";
AWS.config.update({ region: "us-east-2" });


export default class Shipments extends Component {
  constructor(props) {
    super(props);

    this.state = {
        shipment: {
        isLoading: "",
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
        mass_unit: "",
        fulfilledOrders: []
        },

        options: {
          fulfilled: [],
          selected: ""
        }
      };
       this.handleChange = this.handleChange.bind(this);
       this.handleSubmit = this.handleSubmit.bind(this);
       this.populateForm = this.populateForm.bind(this);
     //  this.handleSelect = this.handleSelect.bind(this);
  }
  
 async componentDidMount() {
    if (!this.props.isAuthenticated) {
      return;
    }
    try {
      
      //Get data from API call and setstate
      const validateResults = await this.validate();
      console.log(validateResults);
      this.setState({ fulfilledOrders: validateResults
       });

      console.log(this)
      
    
    } catch (e) {
      alert(e);
      console.log(e)
    }
  
    this.setState({ isLoading: false });
  }
  
  


  

  validateForm() {
       return this.state.shipment;
     };

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSelect = async (data) => {
    const postData={rateId: data.object_id}
    const result = await this.saveTransaction(postData)
    window.open(result.label_url, "_blank")
    
  }

//API Calls
  validate() {
    return invokeApig({ path: "/status" });
  }

  saveShipment(body) {
     return invokeApig({
       path: `/shipment/`,
       method: "POST",
       body 
     });
    console.log(body)
  }

  saveTransaction(body) {
    return invokeApig({
      path: `/shipment/transaction`,
      method: "POST",
      body 
    });
   console.log(body)
 }

  populateForm(selectedOption) {
    this.setState({selectedOption})
    console.log(selectedOption)
  }

  handleSubmit = async event => {
      event.preventDefault();
      const form = new FormData(event.target)
      const postData = { 
        addressFrom: {
      
          name: "Noah",
          company: "",
          street_no: "",
          street1: "3508 MOONEY AVE",
          street2: "",
          city: "CINCINNATI",
          state: "OH",
          zip: "45208",
          country: "US",
          phone: "5137205572",
          email: "ucsmartsensors@gmail.com"
          
        },

        addressTo: {
      
          name: form.get('name'),
          street1: form.get('street1'),
          city: form.get('city'),
          state: form.get('state'),
          zip: form.get('zip'),
          country: form.get('country')
          
        },
        parcel: {
      
          length: form.get('length'),
          width: form.get('width'),
          height: form.get('height'),
          distance_unit: form.get('distance_unit'),
          weight: form.get('weight'),
          mass_unit: form.get('mass_unit')
           
          
        },


      }
      console.log(postData) 
    const results = await this.saveShipment(postData)
      this.state.response = results 

        const { name, street1, city, state, zip, country, phone, email, length, width, height, distance_unit, weight, mass_unit } = this.state.shipment;
    this.setState({ isLoading: true });

  }



  
  renderResponse() {
    return(
      <div className="rateDisplay">
        <table>
          <thead> 
            <tr>
              <th>Amount</th>
              <th>Provider</th>
              <th>Estimated Days</th>
              <th></th>
          
            </tr>
          </thead>
          <tbody>
            {this.state.response.map(response => {
              return(

                 <tr key={response.object_id}>
                <td>{response.amount}</td>
                <td>{response.provider}</td>
                <div className="duration"><td>{response.duration_terms}</td></div>
                <td><button onClick={this.handleSelect.bind(this,response)}>Buy</button></td>
           
                </tr>
              )
            })}
            </tbody>
          </table>
      </div>
    )
    

  }

  

  render() {
    const { fulfilledOrders } = this.state;
    const filteredOrders = fulfilledOrders && fulfilledOrders.filter( order => !!order.isFulfilled )
    console.log('fulfilledOrders', fulfilledOrders, filteredOrders);
    const value=this.state.selectedOption && this.state.selectedOption.shippingId
    console.log(value)
    const data = this.state.selectedOption || {}
    return (
      <div className="Shipments">
          <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="orders">
              <ControlLabel>Select Order</ControlLabel>
              
              <Select
              value={value}
              valueKey={"shippingId"}
              labelKey={"shippingId"}
              onChange={this.populateForm}
              options={ filteredOrders   }/>
            
            </FormGroup>
            <FormGroup controlId="height">
            <ControlLabel>Dimensions in Inches</ControlLabel>
              <FormControl
                onChange={this.handleChange}
                
                label="Height"
                name="height"
                placeholder="Height"
                type="text" />
            </FormGroup>
            <FormGroup controlId="width">
              <FormControl
                onChange={this.handleChange}
               
                label="Width"
                name="width"
                placeholder="Width"
                type="text" />
            </FormGroup>
            <FormGroup controlId="length">
              <FormControl
                onChange={this.handleChange}
              
                label="Length"
                name="length"
                placeholder="Length"
                type="text" />
            </FormGroup>
            <FormGroup controlId="weight">
              <FormControl
                onChange={this.handleChange}
                value={data.weight}
                label="Weight"
                name="weight"
                placeholder="Weight"
                type="text" />
            </FormGroup>
            <FormGroup controlId="distance_unit">
              <FormControl
                onChange={this.handleChange}
                
                label="Distance Unit"
                name="distance_unit"
                placeholder="in"
                type="text" />
            </FormGroup>
            <FormGroup controlId="mass_unit">
              <FormControl
                onChange={this.handleChange}
                
                label="Mass Unit"
                name="mass_unit"
                placeholder="lb"
                type="text" />
            </FormGroup>
            <FormGroup controlId="name">
            <ControlLabel>Shipping To</ControlLabel>
              <FormControl
                onChange={this.handleChange}
                value={data.name}
                label="Name"
                name="name"
                placeholder="Name"
                type="text" />
            </FormGroup>
            <FormGroup controlId="street1">
              <FormControl
                onChange={this.handleChange}
                value={data.street1}
                label="Address Line 1"
                name="street1"
                placeholder="Address Line 1"
                type="text" />
            </FormGroup>
            <FormGroup controlId="city">
              <FormControl
                onChange={this.handleChange}
                value={data.city}
                label="City"
                name="city"
                placeholder="City"
                type="text" />
            </FormGroup>
            <FormGroup controlId="state">
              <FormControl
                onChange={this.handleChange}
                value={data.state}
                label="State"
                name="state"
                placeholder="State"
                type="text" />
            </FormGroup>
            <FormGroup controlId="zip">
              <FormControl
                onChange={this.handleChange}
                value={data.zip}
                label="Zip"
                name="zip"
                placeholder="Zip"
                type="text" />
            </FormGroup>
            <FormGroup controlId="country">
              <FormControl
                onChange={this.handleChange}
                value={data.country}
                label="Country"
                name="country"
                placeholder="US"
                type="text" />
            </FormGroup>
          
            <LoaderButton
              block
              bsStyle="primary"
              bsSize="large"
              disabled={!this.validateForm()}
              type="submit"
              isLoading={this.state.isLoading}
              text="Send"
              loadingText="Receiving Rates…" />
          </form>
          {this.state.response && this.renderResponse()}

          </div>
        );

}
}