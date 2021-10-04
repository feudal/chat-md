import React from 'react';
import classes from './ContactSetting.module.css';
import Toggle from "../../../UI/Toggle/Toggle";
import {Link} from "react-router-dom";
import classNames from "classnames/bind";


const ContactSetting = (props) => {
    let classNameBound = classNames.bind(classes);

    const classForLink = classNameBound(
        classes.link,
        {danger : (props.color === 'danger')},
        {'link--non-active' : props.deactivateLink});

    return (
        <div className={classes.block}>
            <Link to='/chat' className={classForLink}>{props.title}</Link>
            {props.haveToggle && <Toggle isToggled={props.toggleStateIsTrue || false} onToggle={props.onToggle}/>}
        </div>
    );
};

export default ContactSetting;