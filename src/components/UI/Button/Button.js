import React from 'react';
import Type from 'prop-types';
import classes from './Button.module.css';

const Button = ({
    type,
    handler,
    children
}) => {
  return (
    <button 
        className={[classes.Button, classes[type]].join(' ')}
        onClick={handler}>
      {children}
    </button>
  )
}

Button.propTypes = {
    type: Type.string.isRequired,
    handler: Type.func,
    children: Type.node
}

export default Button
