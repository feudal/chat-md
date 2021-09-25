import React from 'react';
import classes from './Toggle.module.css';
// import {useDispatch, useSelector} from "react-redux";

const Toggle = (props) => {
    // const dispatch = useDispatch();
    // const currentUser = useSelector(state => state.user.currentContact);
    // const toggleContactFavorite = () => {
    //
    // }

    const classForToggle = `${classes.toggle}  ${props.isToggled ? classes.active : ''}`;
    return (
        <div className={classForToggle} onClick={true}/>
    );
};

export default Toggle;