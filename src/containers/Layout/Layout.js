import React, { Component } from 'react';
import Type from 'prop-types';

import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    handleSideDrawerClose = () => {
        this.setState({
            showSideDrawer: false
        })
    }

    handleSideDrawerToggle = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer}
        })
    }

    render() {
        const { showSideDrawer } = this.state;

        return (
            <>
                <Toolbar onDrawerToggle={this.handleSideDrawerToggle}/>
                <SideDrawer 
                    show={showSideDrawer} 
                    onClose={this.handleSideDrawerClose}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </>
        )
    }
}

Layout.propTypes = {
    children: Type.node.isRequired
}

export default Layout;