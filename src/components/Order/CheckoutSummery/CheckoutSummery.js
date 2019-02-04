import React from 'react';
import Type from 'prop-types';

import classes from './CheckoutSummery.module.css';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

const CheckoutSummery = ({
    ingredients,
    onCheckoutCancel,
    onCheckoutContinue
}) => {
    return (
        <div className={classes.CheckoutSummery}>
            <h1>We hope it tastes well!</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger ingredients={ingredients}/>
            </div>
            <Button 
                type="Danger"
                handler={onCheckoutCancel}>CANCEL</Button>
            <Button 
                type="Success"
                handler={onCheckoutContinue}>CONTINUE</Button>
        </div>
    )
}

CheckoutSummery.propTypes = {
    ingredients: Type.object.isRequired,
    onCheckoutCancel: Type.func.isRequired,
    onCheckoutContinue: Type.func.isRequired
}

export default CheckoutSummery;
