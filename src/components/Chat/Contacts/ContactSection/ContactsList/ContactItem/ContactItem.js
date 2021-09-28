import React from 'react';
import {NavLink} from "react-router-dom";
import classes from './ContactItem.module.css';
import {useDispatch, useSelector} from "react-redux";
import {userAction} from "../../../../../../store/user";

const ContactItem = (props) => {
    const dispatch = useDispatch();
    let contact = props.contact;
    const isFavList = useSelector(state => state.user.userFavoriteContactList)
    const isContactList = useSelector(state => state.user.userContactList)
    const isBlockedList = useSelector(state => state.user.userBlockedContactList)
    let isFavorite = false;
    let isContact = false;
    let isBlocked = false;
    if(isFavList.includes(props.contact.email )) isFavorite = true;
    if(isContactList.includes(props.contact.email )) isContact = true;
    if(isBlockedList.includes(props.contact.email )) isBlocked = true;

    contact = {
        ...contact,
        isFavorite,
        isContact,
        isBlocked
    }

    const setCurrentUserHandler = () => {
        dispatch(userAction.setCurrentContact(contact));
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