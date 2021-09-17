import React from 'react';
import classes from './TopBar.module.css';
import Info from "../../../UI/Info/Info";

const TopBar = () => {
    return (
        <div className={classes.topbar}>
            <h3 className={classes.title}>Maria Botgros</h3>
            <Info title='About this user'/>
        </div>
    );
};

export default TopBar;