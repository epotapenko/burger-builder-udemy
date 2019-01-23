import React from 'react'; 
import Type from 'prop-types';

import burgerLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.module.css';

const Logo = props => (
    <div className={classes.Logo}>
        <img src={burgerLogo} alt="myBurgerLogo"/>
    </div>
);

Logo.propTypes = {

}

export default Logo;
