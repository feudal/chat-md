import React from 'react';
import classes from "./MyMessage.module.css";

const MyMessage = (props) => {
    return (
        <div className={classes.message}>
            <p className={classes.text}>{props.text}</p>
            <div className={classes.group}>
                <span className={classes.date}>{props.hour}:{props.min}</span>
                <span className={classes.name}>{props.name}</span>
            </div>
        </div>
    );
};

export default MyMessage;