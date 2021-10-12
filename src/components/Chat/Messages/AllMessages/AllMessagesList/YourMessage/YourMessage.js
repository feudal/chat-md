import React from 'react';
import classes from './YourMessage.module.css';
import {useSelector} from "react-redux";

const YourMessage = (props) => {
    const imgUrl = useSelector(state => state.contacts.currentContact.imgUrl);

    return (
        <li className={classes.message}>
            <p className={classes.text}>{props.text}</p>
            <div className={classes.group}>
                {props.name !== 'System' && (
                    <div className={classes.photo}>
                        <img src={imgUrl} alt="user"/>
                    </div>)
                }
                {/*if props.name is null, don't show it*/}
                {props.name && (
                    <>
                        <span className={classes.name}>{props.name}</span>
                        <span className={classes.date}>{props.hour}:{props.min}</span>
                    </>
                )}
            </div>
        </li>
    );
};

export default YourMessage;