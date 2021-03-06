import React from 'react';
import classes from './ContactInfo.module.css';
import ContactSetting from "./ContactSetting/ContactSetting";
import Frame from "./ContactSetting/Frame/Frame";
import CloseBtn from "../../UI/CloseBtn/CloseBtn";
import {useDispatch, useSelector} from 'react-redux';
import classNames from "classnames/bind";
import {uiActions} from "../../../store/ui";
import {initiateMessaging} from "../../../store/messages";
import {
    addToContact,
    addToFavorite,
    blockContact,
    removeFromContact,
    removeFromFavorite,
    unblockContact
} from "../../../store/contacts";


const ContactInfo = () => {
    const showContactInfo = useSelector(state => state.ui.showContactInfo);
    const dispatch = useDispatch();
    const closeHandler = () => {
        dispatch(uiActions.closeContactInfo());
    }
    const currentUser = useSelector(state => state.contacts.currentContact);

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

    const addToContactHandler = (email) => {
        dispatch(addToContact(email));
        dispatch(initiateMessaging(email));

    }
    const removeFromContactHandler = (email) => {
        dispatch(removeFromContact(email));
    }
    const blockContactHandler = (email) => {
        dispatch(blockContact(email));
    }
    const unblockContactHandler = (email) => {
        dispatch(unblockContact(email));
    }

    return (
        <div className={classForContactInfo}>
            <CloseBtn close={closeHandler}/>
            <Frame
                imgUrl={currentUser.imgUrl}
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
                        title='Ad??ugare la favorite'
                    />
                    <ContactSetting
                        haveToggle={false}
                        contactChange={() => removeFromContactHandler(currentUser.email)}
                        title='??terge acest contact'
                    />
                    <ContactSetting
                        haveToggle={false}
                        contactChange={() => blockContactHandler(currentUser.email)}
                        color='danger'
                        title='Blocheaz?? acest contact'
                    />
                </>
            )}
            {(!currentUser.isFavorite && !currentUser.isContact && !currentUser.isBlocked && currentUser.name) && (
                <ContactSetting
                    haveToggle={false}
                    contactChange={() => addToContactHandler(currentUser.email)}
                    title='Adaug?? acest contact'
                />
            )}
            {(currentUser.isBlocked && (
                <ContactSetting
                    haveToggle={false}
                    contactChange={() => unblockContactHandler(currentUser.email)}
                    color='danger'
                    title='Deblocheaza acest contact'
                />
            ))}
        </div>
    );
};

export default ContactInfo;