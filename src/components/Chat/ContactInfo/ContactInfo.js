import React from 'react';
import classes from './ContactInfo.module.css';
import ContactSetting from "./ContactSetting/ContactSetting";
import Frame from "./ContactSetting/Frame/Frame";
import CloseBtn from "../../UI/CloseBtn/CloseBtn";

const ContactInfo = () => {
    return (
        <div className={classes['contact-info']}>
            <CloseBtn/>
            <Frame name='Maria Botgros'/>
            <ContactSetting
                deactivateLink={true}
                haveToggle={true}
                title='Adăugare la favorite'/>
            <ContactSetting
                haveToggle={false}
                title='Șterge acest contact'/>
            <ContactSetting
                haveToggle={false}
                color='danger'
                title='Blochează acest contact'/>
        </div>
    );
};

export default ContactInfo;