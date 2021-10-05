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

// const findKeyFromData = (data, email) => {
//     for (const key in data) {
//         if (data.hasOwnProperty(key)) {
//             if (data[key][email]) {
//                 return key;
//             }
//         }
//     }
// }

const findCurrentMessages = (obj, email) => {
    let newObj = [];
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (key.includes(email) && key.includes(formatEmail(localStorage.email))) {
                newObj = obj[key];
            }
        }
    }
    let newArr = [];
    for(const key in newObj) {
        if(newObj.hasOwnProperty(key)) {
            newArr.push(newObj[key]);
        }
    }
    return newArr;
}


const AllMessages = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.user.currentContact);
    const emailOfContactFormatted = formatEmail(currentUser.email);

    useEffect(() => {
        if (emailOfContactFormatted) {
            fetch('https://chat-6f549-default-rtdb.europe-west1.firebasedatabase.app/all-messages.json')
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        console.log('error')
                    }
                })
                .then(data => {
                    console.log(data);
                    let allMessages = [];
                    for (const key in data) {
                        if (data.hasOwnProperty(key)) {
                            allMessages = (data[key]);
                        }
                    }

                    const currentMessages = findCurrentMessages(allMessages, emailOfContactFormatted);
                    dispatch(messageActions.initiateCurrentMessages(currentMessages));
                })
        }
    }, [dispatch, emailOfContactFormatted])

    return (
        <div className={classes.block}>
            <AllMessagesList/>
        </div>
    );
};

export default AllMessages;