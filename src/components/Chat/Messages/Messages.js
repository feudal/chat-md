import React from 'react';
import classes from './Messages.module.css';
import TopBar from "./TopBar/TopBar";

const Messages = () => {
    return (
        <div className={classes.messages}>
            <TopBar/>
        </div>
    );
};

export default Messages;