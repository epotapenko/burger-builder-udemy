import React, { Component } from 'react';
import axios from '../../../axios-orders';
import classes from './ContactData.module.css';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    handleOrder = (event) => {
        event.preventDefault();
        const { ingredients, price } = this.props;

        this.setState({ loading: true });

        const order = {
            ingredients: ingredients,
            price: price,
            customer: {
                name: 'Evgeniy',
                address: {
                    street: 'Franka 5',
                    country: 'Ukraine'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        }

        console.log(order)

        axios.post('/orders.json', order)
        .then(response => {
            this.setState({
                loading: false
            })
            this.props.history.push('/')
        })
        .catch(error => 
            this.setState({
                loading: false
            })    
        );
    }

  render() {
      let form = (
        <form>
            <input type="text" name="name" placeholder="Your Name"/>
            <input type="email" name="email" placeholder="Your Email"/>
            <input type="text" name="street" placeholder="Street"/>
            <input type="text" name="postal" placeholder="Postal Code"/>
            <Button type="Success" handler={this.handleOrder}>Order</Button>
        </form>
      );

      if(this.state.loading) {
          form = <Spinner />;
      }
    return (
      <div className={classes.ContactData}>
        <h4>Enter you contact data:</h4>
        {form}
      </div>
    )
  }
}

export default ContactData;
