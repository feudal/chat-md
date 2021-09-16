import React from 'react';
import classes from './ProfileInfo.module.css';
import {Link} from "react-router-dom";


const ProfileInfo = (props) => {
    const profile = props.profileInfo;
    return (
        <div className={classes.container}>
            <Link className={classes['edit-btn']} to='/edit-profile'/>
            <h3 className={classes['main-title']}>Despre mine</h3>
            <p className={classes.text}>{profile.text}</p>
            <div className={classes.group}>
                <h3 className={classes.title}>Nume prenume</h3>
                <span className={classes.text}>{profile.name}</span>
            </div>
            <div className={classes.group}>
                <h3 className={classes.title}>Email</h3>
                <span className={classes.text}>{profile.email}</span>
            </div>
            <div className={classes.group}>
                <h3 className={classes.title}>Telefon</h3>
                <span className={classes.text}>{profile.mobile}</span>
            </div>
            <div className={classes.group}>
                <h3 className={classes.title}>Gen</h3>
                <span className={classes.text}>{profile.gender}</span>
            </div>
            <div className={classes.group}>
                <h3 className={classes.title}>Data de nastere</h3>
                <span className={classes.text}>{profile.dob}</span>
            </div>
        </div>
    );
};

export default ProfileInfo;