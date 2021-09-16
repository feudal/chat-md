import React, {useState} from 'react';
import classes from './ChangeSettings.module.css';
import {Link} from "react-router-dom";

const ChangeSettings = (props) => {
    const [isToggled, setIsToggled] = useState(false);
    const toggle = () => {
        setIsToggled(!isToggled);
    }

    const classForToggle = `${classes.toggle}  ${isToggled ? classes.active : ''}`;

    return (
        <div className={classes.block}>
            <h2 className={classes.title}>{props.title}</h2>
            <div className={classes.group}>
                {props.span && <span className={classes.span}>{props.span}</span>}
                {props.toggle && <div className={classForToggle} onClick={toggle}/>}
            </div>
            <Link to='/change-password' className={classes.link}>{props.link}</Link>
        </div>
    );
};

export default ChangeSettings;