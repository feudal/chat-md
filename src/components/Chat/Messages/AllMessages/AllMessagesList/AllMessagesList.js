import React, {useEffect} from 'react';
import MyMessage from "./MyMessage/MyMessage";
import YourMessage from "./YourMessage/YourMessage";
import {useDispatch, useSelector} from "react-redux";
import classes from './AllMessagesList.module.css';
import {refreshUserInfoFromServer} from "../../../../../store/user";

const AllMessagesList = () => {
    const currentMessages = useSelector(state => state.message.currentMessages);
    const currentContact = useSelector(state => state.contacts.currentContact);
    const activeUser = useSelector(state => state.user.userInformation);
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(refreshUserInfoFromServer());
    },[dispatch]);

    let listOfMessage = currentMessages.map((item) => {
        let time = new Date( Date.parse(item.date) );
        let hour = time.getHours().toString();
        let min = time.getMinutes().toString();

        //transform  2:3 to 02:03
        hour = (hour.length === 1) ? ('0' + hour) : hour;
        min = (min.length === 1) ? ('0' + min) : min;
        console.log('item',item)

        if (item.name === localStorage.id) {
            return (
                <MyMessage
                    key={item.date}
                    name={activeUser.name}
                    text={item.message}
                    hour={hour}
                    min={min}
                />
            )
        } else if (item.name === currentContact.id) {
            return (
                <YourMessage
                    key={item.date}
                    name={currentContact.name}
                    text={item.message}
                    hour={hour}
                    min={min}
                />
            )
        } else {
            return null;
        }
    });
    return (
        <ul>
            {(!currentContact.isContact && !currentContact.isFavorite) && <p className={classes.info}>Nu puteti comunica cu acest contact , (nu este prezent in lista de contacte)</p>}
            {(currentContact.isContact || currentContact.isFavorite) && (
                <>
                    {listOfMessage.length === 0 &&  <p className={classes.info}>Încă nu ați comunicat cu acest contact</p>}
                    {listOfMessage}
                </>
            )}
        </ul>
    );
};

export default AllMessagesList;