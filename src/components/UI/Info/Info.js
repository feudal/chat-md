import React from 'react';
import classes from './Info.module.css';

const Info = (props) => {
    return <div
        onClick={props.open}
        title={props.title}
        className={classes.info}/>
};

export default Info;