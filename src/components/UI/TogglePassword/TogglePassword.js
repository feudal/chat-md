import React, {useState} from 'react';
import classes from './TogglePassword.module.css';

const TogglePassword = (props) => {
    const [eyeIsOpen, setEyeIsOpen] = useState(false);
    const child = React.cloneElement(props.children, eyeIsOpen ? {type: 'text'} : {type: 'password'});

    const toggleEyeHandler = () => {
        setEyeIsOpen(!eyeIsOpen);
    }
    return (
        <div className={classes.toggle}>
            <div onClick={toggleEyeHandler} className={`${classes.eye} ${eyeIsOpen ? classes['eye--is-open'] : ''}`}/>
            {child}
        </div>
    );
};

export default TogglePassword;