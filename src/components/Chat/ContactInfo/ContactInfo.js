import React from 'react';
import classes from './ContactInfo.module.css';
import ContactSetting from "./ContactSetting/ContactSetting";
import Frame from "./ContactSetting/Frame/Frame";
import CloseBtn from "../../UI/CloseBtn/CloseBtn";
import {useDispatch, useSelector} from 'react-redux';
import {uiActions} from "../../../store/ui";
import classNames from "classnames/bind";


const ContactInfo = () => {
    const showContactInfo = useSelector(state => state.ui.showContactInfo);
    const dispatch = useDispatch();
    const closeHandler = () => {
        dispatch(uiActions.closeContactInfo());
    }

    let classNameBound = classNames.bind(classes);
    const classForContactInfo = classNameBound(
        classes['contact-info'],
        {'contact-info--opened' : showContactInfo},
        {'contact-info--closed' : !showContactInfo});

    return (
        <div className={classForContactInfo}>
            <CloseBtn close={closeHandler} />
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