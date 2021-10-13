import React, {useEffect, useState} from 'react';
import classes from './Contacts.module.css';
import ContactSection from "./ContactSection/ContactSection";
import {useDispatch, useSelector} from "react-redux";
import {contactsAction} from "../../../store/contacts";
import {realtimeDatabaseUrl} from "../../../AditionalConstAndFunction/aditionalConstAndFunction";
import CloseBtn from "../../UI/CloseBtn/CloseBtn";
import {uiActions} from "../../../store/ui";

const Contacts = () => {
    const [serverError, setServerError] = useState(false);
    const dispatch = useDispatch();

    const allContactList = useSelector(state => state.contacts.allUserContactList);
    const contactList = useSelector(state => state.contacts.userContactList);
    const favoriteContactList = useSelector(state => state.contacts.userFavoriteContactList);
    const blockedContactList = useSelector(state => state.contacts.userBlockedContactList);

    useEffect(() => {
        fetch(realtimeDatabaseUrl + 'users-info.json')
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    setServerError(true);
                }
            })
            .then(data => {
                let arr = [];
                for (const key in data) {
                    arr.push({
                        id: key,
                        name: data[key].name,
                        email: data[key].email,
                        imgUrl: data[key].imgUrl,
                    })
                }
                dispatch(contactsAction.setAllUserContactList(arr));
            });
    }, [dispatch]);

    useEffect(() => {
        fetch(realtimeDatabaseUrl + 'contacts-of-the-users/' + localStorage.id + '/contacts.json')
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    setServerError(true);
                }
            })
            .then(data => {
                let arr = [];
                for (const key in data) {
                    arr.push(data[key]);
                }
                let contList = [];
                let favList = [];
                let blockList = [];

                arr.forEach(item => {
                    if (item.isFavorite === true) {
                        favList.push(item);
                        return;
                    }
                    if (item.isBlocked === true) {
                        blockList.push(item);
                        return;
                    }
                    contList.push(item);
                })
                contList = contList.map(item => item.email);
                favList = favList.map(item => item.email);
                blockList = blockList.map(item => item.email);

                dispatch(contactsAction.setUserContactList(contList));
                dispatch(contactsAction.setFavoriteContactList(favList));
                dispatch(contactsAction.setBlockedContactList(blockList));
            });
    }, [dispatch]);

    const closeContactSectionHandler = () => {
        dispatch(uiActions.toggleContactSection());
    }
    const contactSectionClosed = useSelector(state => state.ui.contactSectionIsClosed);
    const classForContact = `${classes.contacts } + ${contactSectionClosed ? classes['contacts--closed'] : ''}`;

    return (
        <div className={classForContact}>
            <div className={classes.title}>
                <h2>Chat Room</h2>
                <CloseBtn close={closeContactSectionHandler}/>
            </div>
            {serverError && <p className={classes['server-error']}>Server error...</p>}
            {!serverError && (
                <ContactSection
                    favorite={favoriteContactList}
                    contacts={contactList}
                    blocked={blockedContactList}
                    list={allContactList}
                />
            )}
        </div>
    );
};

export default Contacts;