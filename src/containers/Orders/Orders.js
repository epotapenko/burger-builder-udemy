import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from '../../axios-orders';

import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
  state = {
      orders: [],
      loading: true
  }
  componentDidMount() {
    axios.get('/orders.json')
    .then(response => {
        
        this.setState({
            loading: false
        })

        const fetchedOrders = [];
        
        for(let key in response.data) {
            fetchedOrders.push({
                ...response.data[key],
                id: key
            })
        }

        this.setState({
            orders: fetchedOrders,
            loading: false
        })
    })
    .catch(error => {
        this.setState({
            loading: false
        })
    })
  }

  render() {
    return (
      <div>
          {this.state.orders.map(order => <Order key={order.id} order={order}/>)}
      </div>
    )
  }
}


export default withErrorHandler(Orders, axios);