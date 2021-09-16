import React from 'react';
import classes from './ChangeSettings.module.css';
import {Link} from "react-router-dom";
import Toggle from "../../UI/Toggle/Toggle";

const ChangeSettings = (props) => {
    return (
        <div className={classes.block}>
            <h2 className={classes.title}>{props.title}</h2>
            <div className={classes.group}>
                {props.span && <span className={classes.span}>{props.span}</span>}
                {props.toggle && <Toggle isToggled={true}/>}
            </div>
            <Link to='/change-password' className={classes.link}>{props.link}</Link>
        </div>
    );
};

export default ChangeSettings;