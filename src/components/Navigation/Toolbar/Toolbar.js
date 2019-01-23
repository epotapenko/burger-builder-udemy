import React from 'react'
import Type from 'prop-types';

import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationsItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const Toolbar = ({
  onDrawerToggle
}) => {
  return (
    <header className={classes.Toolbar}>
      <DrawerToggle onDrawerToggle={onDrawerToggle}/>
      <div className={classes.Logo}>
        <Logo />
      </div>
      <nav className={classes.DesktopOnly}>
        <NavigationItems />
      </nav>
      
    </header>
  )
}

Toolbar.propTypes = {
  onDrawerToggle: Type.func.isRequired
}

export default Toolbar;
