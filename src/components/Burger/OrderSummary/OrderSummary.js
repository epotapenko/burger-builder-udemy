import React from 'react';
import Type from 'prop-types';

import Button from '../../UI/Button/Button';

const OrderSummary = ({
    ingredients,
    price,
    onCancelOrder,
    onContinueOrder
}) => {
    const ingredientsSummary = Object.keys(ingredients).
    map(igKey => (
            <li key={igKey}>
                <span style={{textTransform: 'capitalize'}}>{igKey}</span>
                : {ingredients[igKey]}
            </li>
        )
    );
    
    return (
        <>
            <h3>Your order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientsSummary}
            </ul>
            <p><strong>Total price: {price.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
            <Button type="Danger" handler={onCancelOrder}>CANCEL</Button>
            <Button type="Success" handler={onContinueOrder}>CONTINUE</Button>
        </>
    )
}

OrderSummary.propTypes = {
    ingredients: Type.object.isRequired,
    price: Type.number.isRequired,
    onCancelOrder: Type.func.isRequired,
    onContinueOrder: Type.func.isRequired
}

export default OrderSummary;
