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

    useEffect(() => {
        dispatch(refreshUserInfoFromServer());
    }, [dispatch]);

    let listOfMessageJSX = [];
    currentMessages.forEach((item, index) => {
        let time = new Date(Date.parse(item.date));
        let hour = time.getHours().toString();
        let min = time.getMinutes().toString();

        //transform  2:3 to 02:03
        hour = (hour.length === 1) ? ('0' + hour) : hour;
        min = (min.length === 1) ? ('0' + min) : min;

        if (item.name === localStorage.id) {
            //delete name in the message if the next message is from the same user.
            let newName = activeUser.name;
            if (currentMessages[index + 1] && currentMessages[index + 1].name === item.name) {
                newName = null;
            }

            listOfMessageJSX.push(
                <MyMessage
                    key={item.date}
                    name={newName}
                    text={item.message}
                    hour={hour}
                    min={min}
                />
            )
        } else if (item.name === currentContact.id) {
            listOfMessageJSX.push(
                <YourMessage
                    key={item.date}
                    name={currentContact.name}
                    text={item.message}
                    hour={hour}
                    min={min}
                />
            )
        }
    });

    console.log(listOfMessageJSX)
    return (
        <ul>
            {(!currentContact.isContact && !currentContact.isFavorite) &&
            <p className={classes.info}>Nu puteti comunica cu acest contact , (nu este prezent in lista de
                contacte)</p>}
            {(currentContact.isContact || currentContact.isFavorite) && (
                <>
                    {listOfMessageJSX.length === 0 &&
                    <p className={classes.info}>Încă nu ați comunicat cu acest contact</p>}
                    {listOfMessageJSX}
                </>
            )}
        </ul>
    );
};

export default AllMessagesList;