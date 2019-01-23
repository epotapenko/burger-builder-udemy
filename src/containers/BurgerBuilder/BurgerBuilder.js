import React, { Component } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.6
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            cheese: 0,
            salad: 0,
            bacon: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey]
        }).reduce((sum, item) => {
            return sum += item;
        }, 0)

        this.setState({
            purchasable: sum > 0
        })
    }

    handleAddIngredient = type => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }

        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        })

        this.updatePurchaseState(updatedIngredients);
    }

    handleRemoveIngredient = type => {
        const oldCount = this.state.ingredients[type];

        if(oldCount <= 0) {
            return;
        }

        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }

        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        })

        this.updatePurchaseState(updatedIngredients);
    }

    handlePurchaseActivate = () => {
        this.setState({
            purchasing: true
        })
    }

    handlePurchaseCancel = () => {
        this.setState({
            purchasing: false
        })
    }

    handlePurchaseContinue = () => {
        alert('You continue!');
        this.handlePurchaseCancel();
    }

    render() {
        const { ingredients, purchasing, totalPrice } = this.state;

        const disableInfo = {
            ...this.state.ingredients
        };

        for(let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }

        return (
            <>
                <Modal show={purchasing} onModalClose={this.handlePurchaseCancel}>
                    <OrderSummary 
                        ingredients={ingredients} 
                        price={totalPrice}
                        onCancelOrder={this.handlePurchaseCancel}
                        onContinueOrder={this.handlePurchaseContinue}/>
                </Modal>
                <Burger ingredients={ingredients}/>
                <BuildControls 
                    onAddIngredient={this.handleAddIngredient}
                    onRemoveIngredient={this.handleRemoveIngredient}
                    onPurchase={this.handlePurchaseActivate}
                    price={this.state.totalPrice}
                    disabled={disableInfo}
                    purchasable={this.state.purchasable}/>
            </>
        )
    }
}

export default BurgerBuilder;