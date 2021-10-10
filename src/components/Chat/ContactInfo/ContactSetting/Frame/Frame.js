import React from 'react';
import classes from './Frame.module.css';

const Frame = (props) => {
    const emailLink = 'mailto:'+ props.email;
    return (
        <div className={classes.frame}>
            <div className={classes.img}>
                {props.imgUrl && <img src={props.imgUrl} alt="user img"/>}
                {!props.imgUrl && <div className={classes.letter}>{props.name[0]}</div>}
            </div>
            <h3 className={classes.name}>{props.name}</h3>
            <a className={classes.contact} href={emailLink}>{props.email}</a>
        </div>
    );
};

export default Frame;