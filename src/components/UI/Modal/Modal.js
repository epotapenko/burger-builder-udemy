import React, { Component } from 'react';
import Type from 'prop-types';

import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.show !== this.props.show
  }

  render() {
    const animationStyles = {
      transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
      opacity: this.props.show ? '1' : '0'
    }
  
    return (
      <>
        <Backdrop show={this.props.show} onClose={this.props.onModalClose}/>
        <div 
          className={classes.Modal}
          style={animationStyles}>
            {this.props.children}
        </div>
      </>
    )
  }
}

Modal.propTypes = {
    show: Type.bool.isRequired,
    children: Type.node.isRequired
}

export default Modal;
