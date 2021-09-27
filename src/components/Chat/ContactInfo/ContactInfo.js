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
    const favList = useSelector(state => state.user.userFavoriteContactList);
    let isFavoriteContact = false;
    for (let i = 0; i < favList.length; i++) {
        if (favList[i] === currentUser.email)
            isFavoriteContact = true;
    }

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
                toggleStateIsTrue={isFavoriteContact}
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