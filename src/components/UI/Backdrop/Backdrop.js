import React from 'react';
import Type from 'prop-types';

import classes from './Backdrop.module.css';

const Backdrop = ({
  show,
  onClose
}) => {

  return (
    show 
    ? 
      <div 
        className={classes.Backdrop}
        onClick={onClose}>
        
      </div>
    :
    null
  )
}

Backdrop.propTypes = {
  show: Type.bool,
  onClose: Type.func
}

export default Backdrop;


