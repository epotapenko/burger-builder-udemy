import React from 'react';
import Type from 'prop-types';

import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' }
];

const BuildControls = ({
    onAddIngredient,
    onRemoveIngredient,
    onPurchase,
    price,
    disabled,
    purchasable
}) => (
    <div className={classes.BuildControls}>
        <p>Current price: <strong>{price.toFixed(2)}</strong></p>
        {
            controls.map(control => <BuildControl 
                key={control.label} 
                label={control.label}
                type={control.type}
                onAddIngredient={() => onAddIngredient(control.type)} 
                onRemoveIngredient={() => onRemoveIngredient(control.type)}
                disabled={disabled[control.type]}/>)
        }
        <button 
            className={classes.OrderButton} 
            onClick={onPurchase}
            disabled={!purchasable}
            >ORDER NOW</button>
    </div>
)

BuildControls.propTypes = {
    onAddIngredient: Type.func.isRequired,
    onRemoveIngredient: Type.func.isRequired,
    price: Type.number.isRequired,
    disabled: Type.object.isRequired,
    purchasable: Type.bool.isRequired
}

export default BuildControls;

