import React, { Component } from 'react';
import Shipping from './containers/Shipping';

export default class ShippingSubmit extends Component {

    handleSubmit(data) {
        console.log('form submission data', data);
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.handleSubmit}></Form>
            </div>
        );
    }
}
