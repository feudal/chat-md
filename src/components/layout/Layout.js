import React from 'react';
import Aside from "../Aside/Aside";
import classes from './Layouts.module.css';

const Layout = (props) => {
    return (
        <>
            <Aside/>
            <main className={classes.main}>{props.children}</main>
        </>
    );
};

export default Layout;