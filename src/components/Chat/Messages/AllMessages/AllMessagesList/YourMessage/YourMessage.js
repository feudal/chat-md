import React from 'react';
import classes from './YourMessage.module.css';

const YourMessage = (props) => {
    return (
        <li className={classes.message}>
            <p className={classes.text}>{props.text}</p>
            <div className={classes.group}>
                <div className={classes.photo}>p</div>
                <span className={classes.name}>{props.name}</span>
                <span className={classes.date}>{props.hour}:{props.min}</span>
            </div>
        </li>
    );
};

export default YourMessage;