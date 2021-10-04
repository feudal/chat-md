import React from 'react';
import ContactsList from "./ContactsList/ContactsList";
import classes from './ContactSection.module.css';
import {useSelector} from "react-redux";

const elementIsInArray = (el, arr) => {
    for (let i = 0; i < arr.length; i++) {
        if (el === arr[i]) {
            return true;
        }
    }
    return false;
}

const ContactSection = (props) => {
    const searchByInput = useSelector(state => state.ui.searchByInput);
    const list = props.list.filter((item) => item.name.toLowerCase().indexOf(searchByInput) > -1);

    const favoriteList = list.filter((item) => elementIsInArray(item.email, props.favorite));
    const contactList = list.filter((item) => elementIsInArray(item.email, props.contacts));
    const blockedList = list.filter((item) => elementIsInArray(item.email, props.blocked));

    const elementsThatIsNotInAllList = [...props.favorite, ...props.contacts, ...props.blocked, localStorage.email]; //localStorage.email is active user
    let otherUsersList = list.filter((item) => !elementIsInArray(item.email, elementsThatIsNotInAllList));

    return (
        <section className={classes.section}>

            <h2 className={classes.title}>Favorite</h2>
            {favoriteList.length > 0 && (<ContactsList list={favoriteList} isFavorite={true}/>)}
            {favoriteList.length === 0 && (<p className={classes.empty}>Nimeni</p>)}

            <h2 className={classes.title}>Contacte</h2>
            {contactList.length > 0 && (<ContactsList list={contactList}/>)}
            {contactList.length === 0 && (<p className={classes.empty}>Nimeni</p>)}

            <h2 className={classes.title}>Utitilizatori blocati</h2>
            {blockedList.length > 0 && (<ContactsList list={blockedList}/>)}
            {blockedList.length === 0 && (<p className={classes.empty}>Nimeni</p>)}

            <h2 className={classes.title}>Alți utitizatorii</h2>
            {otherUsersList.length > 0 && (<ContactsList list={otherUsersList}/>)}
            {otherUsersList.length === 0 && (<p className={classes.empty}>Nimeni</p>)}

        </section>
    );
};

export default ContactSection;