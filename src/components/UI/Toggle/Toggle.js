import React, {useState} from 'react';
import classes from './Toggle.module.css';

const Toggle = (props) => {
    const [isToggled, setIsToggled] = useState(props.isToggled);

    const toggleHandler = () => {
        setIsToggled(!isToggled);
    }

    const classForToggle = `${classes.toggle}  ${isToggled ? classes.active : ''}`;
    return (
        <div className={classForToggle} onClick={toggleHandler}/>
    );
};

export default Toggle;