import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummery from '../../components/Order/CheckoutSummery/CheckoutSummery';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    handleCheckoutCancel = () => {
        this.props.history.goBack();
    }

    handleCheckoutContinue = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        const { ingredients } = this.props;
        return (
        <div>
            <CheckoutSummery 
                ingredients={ingredients}
                onCheckoutCancel={this.handleCheckoutCancel}
                onCheckoutContinue={this.handleCheckoutContinue}/>
            <Route 
                path={this.props.match.path + '/contact-data'} 
                component={ContactData}/>
        </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients
    }
}

export default connect(mapStateToProps, null)(Checkout);
