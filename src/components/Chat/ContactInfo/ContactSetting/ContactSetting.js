import React from 'react';
import classes from './ContactSetting.module.css';
import Toggle from "../../../UI/Toggle/Toggle";
import classNames from "classnames/bind";


const ContactSetting = (props) => {
    let classNameBound = classNames.bind(classes);

    const classForButton = classNameBound(
        classes.button,
        {danger : (props.color === 'danger')},
        {'button--non-active' : props.deactivateLink});

    return (
        <div className={classes.block}>
            <button className={classForButton} onClick={props.contactChange}>{props.title}</button>
            {props.haveToggle && <Toggle isToggled={props.toggleStateIsTrue || false} onToggle={props.onToggle}/>}
        </div>
    );
};

export default ContactSetting;