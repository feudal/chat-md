import React from 'react';
import classes from './Frame.module.css';

const Frame = (props) => {
    const emailLink = 'mailto:'+ props.email;
    return (
        <div className={classes.frame}>
            <div className={classes.img}>img</div>
            <h3 className={classes.name}>{props.name}</h3>
            <a className={classes.contact} href={emailLink}>{props.email}</a>
        </div>
    );
};

export default Frame;