import React, {useEffect} from 'react';
import classes from './ProfileInfo.module.css';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {refreshUserInfoFromServer} from "../../../store/user";

const ProfileInfo = () => {
    const userInfo = useSelector(state => state.user.userInformation);
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(refreshUserInfoFromServer());
    },[dispatch]);

    return (
        <div className={classes.container}>
            <Link className={classes['edit-btn']} to='/edit-profile'/>
            <h3 className={classes['main-title']}>Despre mine</h3>
            <p className={classes.text}>{userInfo.text}</p>
            <div className={classes.group}>
                <h3 className={classes.title}>Nume prenume</h3>
                <span className={classes.text}>{userInfo.name}</span>
            </div>
            <div className={classes.group}>
                <h3 className={classes.title}>Email</h3>
                <span className={classes.text}>{userInfo.email}</span>
            </div>
            <div className={classes.group}>
                <h3 className={classes.title}>Telefon</h3>
                <span className={classes.text}>{userInfo.phone}</span>
            </div>
            <div className={classes.group}>
                <h3 className={classes.title}>Data de nastere</h3>
                <span className={classes.text}>{userInfo.dob}</span>
            </div>
        </div>
    );
};

export default ProfileInfo;