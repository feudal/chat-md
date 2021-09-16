import React, {useState} from 'react';
import classes from './ChangeSettings.module.css';

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
                <span className={classes.span}>{props.span}</span>
                {props.toggle && <div className={classForToggle} onClick={toggle}/>}
            </div>
        </div>
    );
};

export default ChangeSettings;