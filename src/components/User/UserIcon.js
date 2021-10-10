import React from 'react';
import classes from './UserIcon.module.css';

const UserIcon = (props) => {
    return (
        <>
            {props.url && <img className={classes.img} src={props.url} alt="User icon"/>}
            {!props.url && <div className={classes.letter}>User</div>}
        </>
    )
};

export default UserIcon;