import React from 'react';
import classes from './ContactsList.module.css';
import ContactItem from "./ContactItem/ContactItem";

const ContactsList = (props) => {
    let contactList;
    if(props.list) {
        contactList = props.list.map((item) => {
            return <ContactItem name={item.name}/>
        });
    }

    return (
        <ul className={classes.list}>
            {contactList}
        </ul>
    );
};

export default ContactsList;