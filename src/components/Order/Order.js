import React from 'react';
import Type from 'prop-types';

import classes from './Order.module.css';

const Order = ({
    order
}) => {
    const ingredients = [];

    for(let ingredientName in order.ingredients) {
        ingredients.push({
            name: ingredientName,
            amount: order.ingredients[ingredientName]
        });
    }

    const ingredientStyle = {    
        textTransform: 'capitalize', 
        display: 'inline-block', 
        margin: '0 8px',
        border: '1px solid #ccc',
        padding: '5px'
    }

    const ingredientOutput = ingredients.map(ig => {
        return <span 
            style={ingredientStyle}
            key={ig.name}>{ig.name} ({ig.amount})</span>
    })
  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredientOutput}</p>
      <p>Price: <strong>USD {order.price}</strong></p>
    </div>
  )
}

Order.propTypes = {

}

export default Order;
