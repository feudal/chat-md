import React from 'react';
import logo from '../../assets/img/logo.png';
import classes from './Logo.module.css';
import {Link} from "react-router-dom";

const Logo = () => {
    return (
        <Link title="Home page" to='/' >
            <img className={classes.img} src={logo} alt="logo"/>
        </Link>
    );
};

export default Logo;