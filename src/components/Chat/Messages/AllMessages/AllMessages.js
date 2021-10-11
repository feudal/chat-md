import React, {useEffect} from 'react';
import classes from './AllMessages.module.css';
import AllMessagesList from "./AllMessagesList/AllMessagesList";
import {useDispatch, useSelector} from "react-redux";
import {messageActions} from "../../../../store/messages";
import {formatEmail, realtimeDatabaseUrl} from "../../../../AditionalConstAndFunction/aditionalConstAndFunction";

const findCurrentMessages = (obj, email) => {
    let newObj = [];
    for (let i = 0; i < obj.length; i++) {
        for (const key in obj[i]) {
            if (obj[i].hasOwnProperty(key)) {
                if (key.includes(email) && key.includes(formatEmail(localStorage.email))) {
                    newObj = obj[i][key];
                }
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
    const currentUser = useSelector(state => state.contacts.currentContact);
    const emailOfContactFormatted = formatEmail(currentUser.email);

    useEffect(() => {
        if (emailOfContactFormatted) {
            fetch(realtimeDatabaseUrl + 'all-messages.json')
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        console.log('error')
                    }
                })
                .then(data => {
                    console.log(data);
                    let allUsersMessages = [];
                    for (const key in data) {
                        if (data.hasOwnProperty(key)) {
                            allUsersMessages.push(data[key]);
                        }
                    }

                    const currentMessages = findCurrentMessages(allUsersMessages, emailOfContactFormatted);
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