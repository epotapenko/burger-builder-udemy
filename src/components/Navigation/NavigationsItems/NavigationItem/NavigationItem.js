import React from 'react'
import Type from 'prop-types';
import { NavLink } from 'react-router-dom';

import classes from './NavigationItem.module.css';

const NavigationItem = ({
    link,
    active,
    children
}) => (
    <li className={classes.NavigationItem}>
        <NavLink 
            to={link} 
            exact
            activeClassName={classes.active}
           >{children}</NavLink>
    </li>
);

NavigationItem.propTypes = {
    link: Type.string.isRequired,
    active: Type.bool,
    children: Type.node.isRequired
}

export default NavigationItem;
