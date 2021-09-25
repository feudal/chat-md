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
    const currentUser = useSelector(state => state.user.currentContact);

    let classNameBound = classNames.bind(classes);
    const classForContactInfo = classNameBound(
        classes['contact-info'],
        {'contact-info--opened': showContactInfo},
        {'contact-info--closed': !showContactInfo});

    return (
        <div className={classForContactInfo}>
            <CloseBtn close={closeHandler}/>
            <Frame
                name={currentUser.name}
                email={currentUser.email}
            />
            <ContactSetting
                deactivateLink={true}
                haveToggle={true}
                toggleStateIsTrue={currentUser.isFavorite || false}
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