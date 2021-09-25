import React from 'react';
import ContactsList from "./ContactsList/ContactsList";
import classes from './ContactSection.module.css';

const elementIsInArray = (el, arr) => {
    for (let i = 0; i < arr.length; i++) {
        if (el === arr[i]) {
            return true;
        }
    }
    return false;
}

const ContactSection = (props) => {
    const favoriteList = props.list.filter((item) => elementIsInArray(item.email, props.favorite));
    const contactList = props.list.filter((item) => elementIsInArray(item.email, props.contacts));

    const elementsThatIsNotInAllList = [...props.favorite, ...props.contacts];
    let otherUsersList = props.list.filter((item) => !elementIsInArray(item.email, elementsThatIsNotInAllList));
    //delete current user from contact list
    otherUsersList = otherUsersList.filter((item) => !elementIsInArray(item.email, [localStorage.email]));

    return (
        <section className={classes.section}>
            <h2 className={classes.title}>Favorite</h2>
            <ContactsList list={favoriteList} isFavorite={true}/>
            <h2 className={classes.title}>Contacte</h2>
            <ContactsList list={contactList}/>
            <h2 className={classes.title}>Alți utitizatorii</h2>
            <ContactsList list={otherUsersList}/>
        </section>
    );
};

export default ContactSection;