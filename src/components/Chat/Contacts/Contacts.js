import React, {useEffect, useState} from 'react';
import classes from './Contacts.module.css';
import ContactSection from "./ContactSection/ContactSection";
import SearchSection from "./SearchSection/SearchSection";
import {useDispatch, useSelector} from "react-redux";
import {userAction} from "../../../store/user";
import {realtimeDatabaseUrl} from "../../../AditionalConstAndFunction/aditionalConstAndFunction";

const Contacts = () => {
    const [serverError, setServerError] = useState(false);
    const dispatch = useDispatch();

    const allContactList = useSelector(state => state.user.allUserContactList);
    const contactList = useSelector(state => state.user.userContactList);
    const favoriteContactList = useSelector(state => state.user.userFavoriteContactList);
    const blockedContactList = useSelector(state => state.user.userBlockedContactList);

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
                dispatch(userAction.setAllUserContactList(arr));
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

                dispatch(userAction.setUserContactList(contList));
                dispatch(userAction.setFavoriteContactList(favList));
                dispatch(userAction.setBlockedContactList(blockList));
            });
    }, [dispatch]);

    return (
        <div className={classes.contacts}>
            <h2 className={classes.title}>Chat Room</h2>
            <SearchSection/>
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