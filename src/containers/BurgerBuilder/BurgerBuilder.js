import React, { Component } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        loading: false
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey]
        }).reduce((sum, item) => {
            return sum += item;
        }, 0)

        return sum > 0
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
        this.props.history.push('/checkout');
    }

    componentDidMount() {
        // axios.get('/ingredients.json')
        //     .then(response => {
        //         this.setState({
        //             ingredients: response.data
        //         })
        //     })
        //     .catch(error => console.log(error, 'from GET'))
    }

    render() {
        const { purchasing, loading } = this.state;
        const { ingredients, totalPrice, onAddIngredient, onRemoveIngredient } = this.props

        const disableInfo = {
            ...ingredients
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
                        <Burger ingredients={ingredients} />
                        <BuildControls 
                            onAddIngredient={onAddIngredient}
                            onRemoveIngredient={onRemoveIngredient}
                            onPurchase={this.handlePurchaseActivate}
                            price={totalPrice}
                            disabled={disableInfo}
                            purchasable={this.updatePurchaseState(ingredients)}/>
                    </>
                    :
                    <Spinner />
                }
                
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onRemoveIngredient: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));