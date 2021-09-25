import React, {useEffect, useState} from 'react';
import classes from './Contacts.module.css';
import ContactSection from "./ContactSection/ContactSection";
import SearchSection from "./SearchSection/SearchSection";
import {useDispatch, useSelector} from "react-redux";
import {userAction} from "../../../store/user";

const Contacts = () => {
    const [serverError, setServerError] = useState(false);
    const dispatch = useDispatch();

    const allContactList = useSelector(state => state.user.allUserContactList);
    const contactList = useSelector(state => state.user.userContactList);
    const favoriteContactList = useSelector(state => state.user.userFavoriteContactList);

    useEffect(() => {
        fetch('https://chat-6f549-default-rtdb.europe-west1.firebasedatabase.app/users-info.json')
            .then(response => {
                if (response.ok) {
                    console.log(response);
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
                        email: data[key].email
                    })
                }
                // setList(arr);
                dispatch(userAction.setAllUserContactList(arr));
            });
    }, [dispatch]);

    useEffect(() => {
        fetch('https://chat-6f549-default-rtdb.europe-west1.firebasedatabase.app/' + localStorage.id + '/contacts.json')
            .then(response => {
                if (response.ok) {
                    console.log(response);
                    return response.json();
                } else {
                    setServerError(true);
                }
            })
            .then(data => {
                let arr = [];
                for (const key in data) {
                    arr.push(data[key].email);
                }
                dispatch(userAction.setUserContactList(arr))
            })
    }, [dispatch]);

    useEffect(() => {
        fetch('https://chat-6f549-default-rtdb.europe-west1.firebasedatabase.app/' + localStorage.id + '/favorites.json')
            .then(response => {
                if (response.ok) {
                    console.log(response);
                    return response.json();
                } else {
                    setServerError(true);
                }
            })
            .then(data => {
                let arr = [];
                for (const key in data) {
                    arr.push(data[key].email);
                }
                dispatch(userAction.setFavoriteContactList(arr));
            })
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
                    list={allContactList}
                />
            )}
        </div>
    );
};

export default Contacts;