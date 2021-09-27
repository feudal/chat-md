import React from 'react';
import {NavLink} from "react-router-dom";
import classes from './ContactItem.module.css';
import {useDispatch} from "react-redux";
import {userAction} from "../../../../../../store/user";

const ContactItem = (props) => {
    const dispatch = useDispatch();
    const setCurrentUserHandler = () => {
        dispatch(userAction.setCurrentContact(props.contact));
    }
    return (
        <li className={classes.item} onClick={setCurrentUserHandler}>
            <NavLink to={`/chat/${props.contact.name}`} className={classes.link} activeClassName={classes.active}>
                <div className={classes.logo}/>
                <span className={classes.name}>{props.contact.name}</span>
            </NavLink>
        </li>
    );
};

export default ContactItem;