import React from 'react';
import classes from './Messages.module.css';
import TopBar from "./TopBar/TopBar";
import EnterMessage from "./EnterMessage/EnterMessage";
import AllMessages from "./AllMessages/AllMessages";

const Messages = () => {
    return (
        <div className={classes.messages}>
            <TopBar/>
            <div className={classes.wrapper}>
                <AllMessages/>
                <EnterMessage/>
            </div>
        </div>
    );
};

export default Messages;