import React from 'react';
import classes from './ContactSetting.module.css';
import Toggle from "../../../UI/Toggle/Toggle";

const ContactSetting = (props) => {
    return (
        <div className={classes.block}>
            <h3 className={classes.title}>{props.title}</h3>
            {props.haveToggle && <Toggle isToggled={false}/>}
        </div>
    );
};

export default ContactSetting;