import React, { Component } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.6
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false
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
        this.setState({ loading: true });

        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
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

        axios.post('/orders.json', order)
        .then(response => this.setState({
            loading: false,
            purchasing: false
        }))
        .catch(error => 
            this.state({
                loading: false,
                purchasing: false
            })    
        );
        this.handlePurchaseCancel();
    }

    componentDidMount() {
        axios.get('/ingredients.json')
            .then(response => {
                this.setState({
                    ingredients: response.data
                })
            })
            .catch(error => console.log(error, 'from GET'))
    }

    render() {
        const { ingredients, purchasing, totalPrice, loading } = this.state;

        const disableInfo = {
            ...this.state.ingredients
        };

        for(let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }

        return (
            <>
                <Modal show={purchasing} onModalClose={this.handlePurchaseCancel}>
                    {
                        loading || !ingredients
                        ? 
                        <Spinner />
                        :
                        <OrderSummary 
                            ingredients={ingredients} 
                            price={totalPrice}
                            onCancelOrder={this.handlePurchaseCancel}
                            onContinueOrder={this.handlePurchaseContinue}/>
                    }
                </Modal>
                {
                    ingredients
                    ?
                    <>
                        <Burger ingredients={ingredients}/>
                        <BuildControls 
                            onAddIngredient={this.handleAddIngredient}
                            onRemoveIngredient={this.handleRemoveIngredient}
                            onPurchase={this.handlePurchaseActivate}
                            price={this.state.totalPrice}
                            disabled={disableInfo}
                            purchasable={this.state.purchasable}/>
                    </>
                    :
                    <Spinner />
                }
                
            </>
        )
    }
}

export default withErrorHandler(BurgerBuilder, axios);