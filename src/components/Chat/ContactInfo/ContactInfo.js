import React from 'react';
import classes from './ContactInfo.module.css';
import ContactSetting from "./ContactSetting/ContactSetting";
import Frame from "./ContactSetting/Frame/Frame";
import CloseBtn from "../../UI/CloseBtn/CloseBtn";
import {useDispatch, useSelector} from 'react-redux';
import {uiActions} from "../../../store/ui";
import classNames from "classnames/bind";
import {addToFavorite, removeFromFavorite} from "../../../store/user";


const ContactInfo = () => {
    const showContactInfo = useSelector(state => state.ui.showContactInfo);
    const dispatch = useDispatch();
    const closeHandler = () => {
        dispatch(uiActions.closeContactInfo());
    }
    const currentUser = useSelector(state => state.user.currentContact);

    const toggleFavoriteHandler = (email) => {
        if (currentUser.isFavorite) {
            dispatch(removeFromFavorite(email));
        } else {
            dispatch(addToFavorite(email));
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

            {(currentUser.isFavorite || currentUser.isContact) && (
                <>
                    <ContactSetting
                        deactivateLink={true}
                        haveToggle={true}
                        toggleStateIsTrue={currentUser.isFavorite}
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
            {(!currentUser.isFavorite && !currentUser.isContact) && (
                <ContactSetting
                    haveToggle={false}
                    title='Adaugă contact'
                />
            )}
        </div>
    );
};

export default ContactInfo;