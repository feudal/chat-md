import React from 'react';
import classes from './ChatLayout.module.css';

const ChatLayout = (props) => {
    return (
        <div className={classes.layout}>
            {props.children}
        </div>
    );
};

export default ChatLayout;