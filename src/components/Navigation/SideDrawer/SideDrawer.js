import React from 'react';
import Type from 'prop-types';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationsItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import classes from './SideDrawer.module.css';

const SideDrawer = ({
    show,
    onClose
}) => {
    let attachedClasses = [classes.SideDrawer, classes.Close]
    if(show) {
        attachedClasses = [classes.SideDrawer, classes.Open]
    }
    return (
        <>
            <Backdrop show={show} onClose={onClose}/>
            <div className={attachedClasses.join(' ')}>
            <div className={classes.Logo}>
                <Logo />
            </div>
            <nav>
                <NavigationItems />
            </nav>
            </div>
        </>
        
    )
}

SideDrawer.propTypes = {
    show: Type.bool,
    onClose: Type.func
}

export default SideDrawer;
