import React from 'react';
import classes from './Contacts.module.css';
import ContactSection from "./ContactSection/ContactSection";
import SearchSection from "./SearchSection/SearchSection";

const FAVORITE_CONTACTS = [
    {
        name: 'Andreea Petre',
        email: 'andreea@gmail.com',
        age: '28',
    },
    {
        name: 'Vasile Lupescu',
        email: 'vasile@gmail.com',
        age: '33',
    },
    {
        name: 'Ana Chiperi',
        email: 'ana@gmail.com',
        age: '21',
    },
]

const SIMPLE_CONTACTS = [
    {
        name: 'Maxima Bondarenco',
        email: 'maxim@gmail.com',
        age: '28',
    },
    {
        name: 'Colea Tarus',
        email: 'colea@gmail.com',
        age: '33',
    },
    {
        name: 'Emilia Covei',
        email: 'emilia@gmail.com',
        age: '21',
    },
    {
        name: 'Andrei Floris',
        email: 'andrei@gmail.com',
        age: '21',
    },
    {
        name: 'Mahmed Gibbs',
        email: 'mahmed@gmail.com',
        age: '41',
    },
    {
        name: 'Maria Botgros',
        email: 'maria@gmail.com',
        age: '25',
    },
    {
        name: 'Ion Istrati',
        email: 'ion@gmail.com',
        age: '50',
    }
]

const Contacts = () => {
    return (
        <div className={classes.contacts}>
            <h2 className={classes.title}>Chat Room</h2>
            <SearchSection/>
            <ContactSection
                title='Favorite'
                list={FAVORITE_CONTACTS}
            />
            <ContactSection
                title='Contacte'
                list={SIMPLE_CONTACTS}
            />
        </div>
    );
};

export default Contacts;