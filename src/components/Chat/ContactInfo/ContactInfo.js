import React from 'react';
import classes from './ContactInfo.module.css';
import ContactSetting from "./ContactSetting/ContactSetting";
import Frame from "./ContactSetting/Frame/Frame";
import CloseBtn from "../../UI/CloseBtn/CloseBtn";
import {useDispatch, useSelector} from 'react-redux';
import {uiActions} from "../../../store/ui";
import classNames from "classnames/bind";
import {removeFromFavorite} from "../../../store/user";


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
    const toggleFavoriteHandler = (email) => {

        if (isFavoriteContact) {
            dispatch(removeFromFavorite(email));
        } else {
            //addToFavorite();
        }
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
                name={currentUser.name || 'User name'}
                email={currentUser.email}
            />
            {currentUser.name && (
                <>
                    <ContactSetting
                        deactivateLink={true}
                        haveToggle={true}
                        toggleStateIsTrue={isFavoriteContact}
                        onToggle={() => toggleFavoriteHandler(currentUser.email)}
                        title='Adăugare la favorite'
                    />
                    <ContactSetting
                        haveToggle={false}
                        title='Șterge acest contact'
                    />
                    <ContactSetting
                        haveToggle={false}
                        color='danger'
                        title='Blochează acest contact'
                    />
                </>
            )}
        </div>
    );
};

export default ContactInfo;