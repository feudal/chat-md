import React from 'react';
import classes from './CloseBtn.module.css';

const CloseBtn = (props) => {
    return <button onClick={props.close} className={classes['close-btn']}/>
};

export default CloseBtn;