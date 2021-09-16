import React from 'react';
import classes from './Frame.module.css';

const Frame = (props) => {
    return (
        <div className={classes.frame}>
            <div className={classes.img}>img</div>
            <h3 className={classes.name}>{props.name}</h3>
        </div>
    );
};

export default Frame;