import React, { Component } from "react";
import { invokeApig } from "../libs/awsLib";
import { FormGroup, FormControl} from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";


export default class Shipments extends Component {
  constructor(props) {
    super(props);

    // this.file = null;
    this.state = { 
        shippment: { 
        isLoading: null,
        isDeleting: null,
        shipmentId: null,
        content: "",
        name: "",
        street1 : "",
        city: "",
        state: "",
        zip: "",
        country: ""
      }
    };
    this.handleChange = this.handleChange.bind(this);
    }

  async componentDidMount() {
    try {
      const results = await this.getShipment();
      this.setState({
        shipment: results,
        content: results.content
      });
    } catch (e) {
      alert(e);
    }
  }


  getShipment() {
    return invokeApig({ path: `/count/${this.props.match.params.id}` });
  }

  validateForm() {
    return this.state.content.length > 0;
  }
  
/*  formatFilename(str) {
    return str.length < 50
      ? str
      : str.substr(0, 20) + "..." + str.substr(str.length - 20, str.length);
   }
*/
  
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }
 
 /* 
  handleFileChange = event => {
    this.file = event.target.files[0];
  }
 */ 
  
  saveShipment(shipment) {
    return invokeApig({
      path: `/count/${this.props.match.params.id}`,
      method: "PUT",
      body: shipment 
    });
  }
  
  handleSubmit = async event => {
  
  
    event.preventDefault();
  
 /*   if (this.file && this.file.size > config.MAX_ATTACHMENT_SIZE) {
      alert("Please pick a file smaller than 5MB");
      return;
    }
 */ 
    this.setState({ isLoading: true });
  
    try {
      
      await this.saveShipment({
        ...this.state.shipment,
        
        width: this.state.width,

//      attachment: uploadedFilename || this.state.note.attachment
      });
      this.props.history.push("/");
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  }

  
  /*
  handleDelete = async event => {
    event.preventDefault();
  
    const confirmed = window.confirm(
      "Are you sure you want to delete this note?"
    );
  
    if (!confirmed) {
      return;
    }
  
    this.setState({ isDeleting: true });
  }
*/  



  render() {
    return (

      <div className="Shipments">
        {this.state.shipment &&
          <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="content">
              <FormControl
                onChange={this.handleChange}
                value={this.state.content}
                componentClass="textarea"
              />

            </FormGroup>
           

            <LoaderButton
              block
              bsStyle="primary"
              bsSize="large"
              disabled={!this.validateForm()}
              type="submit"
              isLoading={this.state.isLoading}
              text="Save"
              loadingText="Saving…"
            />
          </form>}
      </div>
    );
}
}