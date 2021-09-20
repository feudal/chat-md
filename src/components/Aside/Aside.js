import React from 'react';
import {NavLink} from "react-router-dom";
import classes from './Aside.module.css';
import Logo from "./Logo";
import ChatIcon from "../Icons/ChatIcon";
import CalendarIcon from "../Icons/CalendarIcon";
import SettingIcon from "../Icons/SettingIcon";
import LogoutIcon from "../Icons/LogoutIcon";
import UserIcon from "../User/UserIcon";
import {useDispatch, useSelector} from "react-redux";
import {authActions} from "../../store/auth";
import {useHistory}  from 'react-router-dom';

const Aside = () => {
    const history = useHistory();
    const userIsLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const dispatch = useDispatch();

    const logOutHandler = () => {
        dispatch(authActions.logout());
        history.push('/');
    }
    return (
        <aside className={classes.aside}>
            <Logo/>
            <nav className={classes.nav}>
                {userIsLoggedIn && (
                    <NavLink
                        title="Chat"
                        className={classes.link}
                        activeClassName={classes.active}
                        to='/chat'>
                        <ChatIcon/>
                    </NavLink>
                )}
                < NavLink
                    title="Calendar"
                    className={classes.link}
                    activeClassName={classes.active}
                    to='/calendar'>
                    <CalendarIcon/>
                </NavLink>
                <NavLink
                    title="Settings"
                    className={classes.link}
                    activeClassName={classes.active}
                    to='/settings'>
                    <SettingIcon/>
                </NavLink>
            </nav>
            <nav className={classes.nav}>
                {userIsLoggedIn && (
                    <>
                        <NavLink
                            title="Profile"
                            className={classes['profile-link']}
                            activeClassName={classes.active}
                            to='/profile'>
                            <UserIcon/>
                        </NavLink>
                        <button
                            onClick={logOutHandler}
                            title="Logout"
                            className={classes['logout']}>
                            <LogoutIcon/>
                        </button>
                    </>
                )}
            </nav>
        </aside>
    );
};

export default Aside;