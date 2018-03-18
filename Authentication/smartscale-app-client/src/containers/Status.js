import React, { Component } from "react";
import { invokeApig } from "../libs/awsLib";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import config from "../config";
import "./Shipments.css";
import AWS from "aws-sdk";
AWS.config.update({ region: "us-east-2" });

export default class Status extends Component {
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
        mass_unit: ""
        },

        options: {
          fulfilled: [],
          selected: ""
        }
      };
       this.handleChange = this.handleChange.bind(this);
       this.handleSubmit = this.handleSubmit.bind(this);
     //  this.handleSelect = this.handleSelect.bind(this);
  }
  
 async componentDidMount() {
    if (!this.props.isAuthenticated) {
      return;
    }
    try {
      const validateResults = await this.validate();
      this.setState({ fulfilled: validateResults });
      console.log(this)
    } catch (e) {
      alert(e);
      console.log(e)
    }
  
    this.setState({ isLoading: false });
  }
  
  validate() {
    return invokeApig({ path: "/validate" });
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

  /*
  async onHandleClick(shipment) {
  
    const results = invokeApig({
      path: "/validate/",
      method: "GET",
      body: shipment

    });
    
  }
*/

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

  handleSubmit = async event => {
      event.preventDefault();
      const form = new FormData(event.target)
      const postData = { 
        addressFrom: {
      
          name: "smartscale",
          company: "",
          street_no: "",
          street1: "3508 MOONEY AVE",
          street2: "",
          city: "CINCINNATI",
          state: "OH",
          zip: "45208-1317",
          country: "US",
          phone: "1234567890",
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

        const { name, street1, city, state, zip, country, length, width, height, distance_unit, weight, mass_unit } = this.state.shipment;
    this.setState({ isLoading: true });

  }

  renderResponse() {
    return(
      <div>
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
                <td>{response.estimated_days}</td>
                <td><button onClick={this.handleSelect.bind(this,response)}>Select</button></td>
                <td><button onClick={this.handleSelect.bind(this,response)}>Select</button></td>
                </tr>
              )
            })}
            </tbody>
          </table>
      </div>
    )
    

  }


  render() {
    return (
      <div className="Shipments">
          <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="orders">
              <ControlLabel>Select Order</ControlLabel>
              <FormControl componentClass="select" placeholder="orders">
                <option value="select">select</option>
                
                {this.state.options.fulfilled.map((option, index) => {
              return (<option key={index} value={option.shippingId}>{option.shippingId}</option>)
                  })
                }
              </FormControl>
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
                placeholder="Distance Unit"
                type="text" />
            </FormGroup>
            <FormGroup controlId="mass_unit">
              <FormControl
                onChange={this.handleChange}
             
                label="Mass Unit"
                name="mass_unit"
                placeholder="Mass Unit"
                type="text" />
            </FormGroup>
            <FormGroup controlId="name">
            <ControlLabel>Shipping To</ControlLabel>
              <FormControl
                onChange={this.handleChange}
               
                label="Name"
                name="name"
                placeholder="Name"
                type="text" />
            </FormGroup>
            <FormGroup controlId="street1">
              <FormControl
                onChange={this.handleChange}
                
                label="Address Line 1"
                name="street1"
                placeholder="Address Line 1"
                type="text" />
            </FormGroup>
            <FormGroup controlId="city">
              <FormControl
                onChange={this.handleChange}
                
                label="City"
                name="city"
                placeholder="City"
                type="text" />
            </FormGroup>
            <FormGroup controlId="state">
              <FormControl
                onChange={this.handleChange}
              
                label="State"
                name="state"
                placeholder="State"
                type="text" />
            </FormGroup>
            <FormGroup controlId="zip">
              <FormControl
                onChange={this.handleChange}
                
                label="Zip"
                name="zip"
                placeholder="Zip"
                type="text" />
            </FormGroup>
            <FormGroup controlId="country">
              <FormControl
                onChange={this.handleChange}
           
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
              text="Save"
              loadingText="Saving…" />
          </form>
          {this.state.response && this.renderResponse()}

          </div>
        );

}
}
