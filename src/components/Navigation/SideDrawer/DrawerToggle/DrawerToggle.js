import React from 'react';
import Type from 'prop-types';

import classes from './DrawerToggle.module.css';

const DrawerToggle = ({
    onDrawerToggle
}) => (
    <div 
        className={classes.DrawerToggle}
        onClick={onDrawerToggle}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);

DrawerToggle.propTypes = {
    onDrawerToggle: Type.func.isRequired
}

export default DrawerToggle;
