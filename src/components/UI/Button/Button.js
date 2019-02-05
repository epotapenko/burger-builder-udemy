import React from 'react';
import Type from 'prop-types';
import classes from './Button.module.css';

const Button = ({
    type,
    handler,
    disabled,
    children
}) => {
  return (
    <button 
        className={[classes.Button, classes[type]].join(' ')}
        disabled={disabled}
        onClick={handler}>
      {children}
    </button>
  )
}

Button.propTypes = {
    type: Type.string.isRequired,
    disabled: Type.bool,
    handler: Type.func,
    children: Type.node
}

export default Button
