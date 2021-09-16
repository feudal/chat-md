import React from 'react';
import classes from './ProfileLayout.module.css';

const ProfileLayout = (props) => {
    return (
        <div className={classes.layout}>
            {props.children}
        </div>
    );
};

export default ProfileLayout;