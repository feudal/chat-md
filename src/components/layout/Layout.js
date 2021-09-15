import React from 'react';
import Aside from "../Aside/Aside";
import classes from './Layouts.module.css';

const Layout = (props) => {
    return (
        <div className={classes.wrapper}>
            <Aside/>
            <main className={classes.main}>{props.children}</main>
        </div>
    );
};

export default Layout;