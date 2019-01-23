import React from 'react';
import Type from 'prop-types';

import classes from './BuildControl.module.css';

const BuildControl = ({
    label,
    onAddIngredient,
    onRemoveIngredient,
    disabled
}) => (
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{label}</div>
        <button 
            className={classes.Less}
            onClick={onRemoveIngredient}
            disabled={disabled}>Less</button>
        <button 
            className={classes.More}
            onClick={onAddIngredient}
            >More</button>
    </div>
)

BuildControl.propTypes = {
    label: Type.string.isRequired,
    onAddIngredient: Type.func.isRequired,
    onRemoveIngredient: Type.func.isRequired,
    disabled: Type.bool.isRequired
}

export default BuildControl;

