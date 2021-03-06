import React from 'react';
import {NavLink} from "react-router-dom";
import classes from './ContactItem.module.css';
import {useDispatch, useSelector} from "react-redux";
import {contactsAction} from "../../../../../../store/contacts";
import UserIcon from "../../../../../User/UserIcon";

const ContactItem = (props) => {
    const dispatch = useDispatch();
    let contact = props.contact;
    const isFavList = useSelector(state => state.contacts.userFavoriteContactList)
    const isContactList = useSelector(state => state.contacts.userContactList)
    const isBlockedList = useSelector(state => state.contacts.userBlockedContactList)
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
        dispatch(contactsAction.setCurrentContact(contact));
    }
    return (
        <li className={classes.item} onClick={setCurrentUserHandler}>
            <NavLink to={`/chat/${props.contact.name}`} className={classes.link} activeClassName={classes.active}>
                <div className={classes.logo}>
                    { contact.imgUrl && <UserIcon url={contact.imgUrl}/>}
                    {!contact.imgUrl && <div className={classes['big-letter']}>{contact.name[0]}</div>}
                </div>
                <span className={classes.name}>{props.contact.name}</span>
            </NavLink>
        </li>
    );
};

export default ContactItem;