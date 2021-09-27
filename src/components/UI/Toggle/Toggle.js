import React from 'react';
import classes from './Toggle.module.css';

const Toggle = (props) => {
    const classForToggle = `${classes.toggle}  ${props.isToggled ? classes.active : ''}`;
    return (
        <div className={classForToggle} onClick={props.onToggle}/>
    );
};

export default Toggle;