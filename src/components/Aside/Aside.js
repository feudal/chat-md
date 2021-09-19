import React from 'react';
import {NavLink} from "react-router-dom";
import classes from './Aside.module.css';
import Logo from "./Logo";
import ChatIcon from "../Icons/ChatIcon";
import CalendarIcon from "../Icons/CalendarIcon";
import SettingIcon from "../Icons/SettingIcon";
import LogoutIcon from "../Icons/LogoutIcon";
import UserIcon from "../User/UserIcon";
import {useSelector} from "react-redux";

const Aside = () => {
    const userIsLoggedIn = useSelector(state => state.auth.isLoggedIn);

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
                        <NavLink
                            title="Logout"
                            className={classes['logout-link']}
                            activeClassName={classes.active}
                            to='/logout'>
                            <LogoutIcon/>
                        </NavLink>
                    </>
                )}
            </nav>
        </aside>
    );
};

export default Aside;