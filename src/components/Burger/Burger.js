import React from 'react';
import Type from 'prop-types';
import { withRouter } from 'react-router-dom';

import classes from './Burger.module.css';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = ({
    ingredients
}) => {
    
    let transformedIngredients = Object.keys(ingredients)
    .map(igKey => {
        return [...Array(ingredients[igKey])].map((_, i) => {
            return <BurgerIngredient key={igKey+i} type={igKey} />
        })
    })
    .reduce((arr, el) => {
        return arr.concat(el);
    }, []);

    if( transformedIngredients.length === 0 ) {
        transformedIngredients = 'Please start adding ingredients';
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    )
}

Burger.defaultProps = {
    ingredients: {
        cheese: 1,
        salad: 1,
        bacon: 1,
        meat: 1
    }
}

Burger.propTypes = {
    ingredients: Type.object.isRequired
}

export default withRouter(Burger);

