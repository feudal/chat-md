import React from 'react';
import ContactsList from "./ContactsList/ContactsList";
import classes from './ContactSection.module.css';

const ContactSection = (props) => {
    return (
        <section className={classes.section}>
            <h2 className={classes.title}>{props.title}</h2>
            <ContactsList list={props.list}/>
        </section>
    );
};

export default ContactSection;