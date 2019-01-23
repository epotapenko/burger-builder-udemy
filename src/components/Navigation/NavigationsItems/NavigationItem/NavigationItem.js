import React from 'react'
import Type from 'prop-types';

import classes from './NavigationItem.module.css';

const NavigationItem = ({
    link,
    active,
    children
}) => (
    <li className={classes.NavigationItem}>
        <a href={link} className={active ? classes.active : null}>{children}</a>
    </li>
);

NavigationItem.propTypes = {
    link: Type.string.isRequired,
    active: Type.bool,
    children: Type.node.isRequired
}

export default NavigationItem;
