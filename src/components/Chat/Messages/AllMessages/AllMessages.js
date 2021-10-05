import React, {useEffect} from 'react';
import classes from './AllMessages.module.css';
import AllMessagesList from "./AllMessagesList/AllMessagesList";
import {useDispatch, useSelector} from "react-redux";
import {messageActions} from "../../../../store/messages";

const formatEmail = (email) => {
    if (email) {
        email = email.replace(/\./g, '-')
        email = email.replace('@', '-aron-')
        return email;
    }
}

const findKeyFromData = (data, email) => {
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            if (data[key][email]) {
                return key;
            }
        }
    }
}

const AllMessages = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.user.currentContact);
    const emailFormatted = formatEmail(currentUser.email);

    useEffect(() => {
        if (emailFormatted) {
            fetch('https://chat-6f549-default-rtdb.europe-west1.firebasedatabase.app/all-messages/' + localStorage.id + '.json')
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        console.log('error')
                    }
                })
                .then(data => {
                    console.log(data)
                    const theKey = findKeyFromData(data, emailFormatted);
                    let messagesFromThisEmail = null;
                    if (data.hasOwnProperty(theKey)) {
                        messagesFromThisEmail = data[theKey][emailFormatted];
                    }
                    let arr = [];
                    for(const key in messagesFromThisEmail) {
                        if(messagesFromThisEmail && messagesFromThisEmail.hasOwnProperty(key)){
                            arr.push(messagesFromThisEmail[key]);
                        }
                    }
                    console.log(arr);
                    dispatch(messageActions.initiateCurrentMessages(arr));
                })
        }
    }, [dispatch, emailFormatted])

    return (
        <div className={classes.block}>
            <AllMessagesList/>
        </div>
    );
};

export default AllMessages;