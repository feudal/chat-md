import React from 'react';
import {NavLink} from "react-router-dom";
import classes from './ContactItem.module.css';

const ContactItem = (props) => {
    return (
        <li className={classes.item}>
            <NavLink to={`/chat/${props.name}`} className={classes.link} activeClassName={classes.active}>
                <div className={classes.logo}/>
                <span className={classes.name}>{props.name}</span>
            </NavLink>
        </li>
    );
};

export default ContactItem;