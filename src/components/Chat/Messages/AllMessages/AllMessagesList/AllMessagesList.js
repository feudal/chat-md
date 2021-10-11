import React from 'react';
import MyMessage from "./MyMessage/MyMessage";
import YourMessage from "./YourMessage/YourMessage";
import {useSelector} from "react-redux";
import classes from './AllMessagesList.module.css';

const AllMessagesList = () => {
    const currentMessages = useSelector(state => state.message.currentMessages);
    const currentContact = useSelector(state => state.contacts.currentContact);

    const listOfMessage = currentMessages.map((item) => {
        let time = new Date( Date.parse(item.date) );
        let hour = time.getHours().toString();
        let min = time.getMinutes().toString();

        //transform  2:3 to 02:03
        hour = (hour.length === 1) ? ('0' + hour) : hour;
        min = (min.length === 1) ? ('0' + min) : min;

        if(item.name === localStorage.email){
            return (
                <MyMessage
                    key={item.date}
                    name={item.name}
                    text={item.message}
                    hour={hour}
                    min={min}
                />
            )
        } else {
            return (
                <YourMessage
                    key={item.date}
                    name={item.name}
                    text={item.message}
                    hour={hour}
                    min={min}
                />
            )
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