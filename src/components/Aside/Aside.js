import React, {useEffect} from 'react';
import {NavLink, useHistory, useLocation} from "react-router-dom";
import classes from './Aside.module.css';
import Logo from "./Logo";
import ChatIcon from "../Icons/ChatIcon";
import CalendarIcon from "../Icons/CalendarIcon";
import SettingIcon from "../Icons/SettingIcon";
import LogoutIcon from "../Icons/LogoutIcon";
import UserIcon from "../User/UserIcon";
import {useDispatch, useSelector} from "react-redux";
import {authActions} from "../../store/auth";
import {refreshUserInfoFromServer} from "../../store/user";
import {uiActions} from "../../store/ui";

const Aside = () => {
    const dispatch = useDispatch();

    const userImgUrl = useSelector(state => state.user.userInformation.imgUrl);
    const history = useHistory();
    const userIsLoggedIn = useSelector(state => state.auth.isLoggedIn);

    useEffect(() => {
        dispatch(refreshUserInfoFromServer());
    }, [dispatch]);

    const logOutHandler = () => {
        dispatch(authActions.logout());
        history.push('/');
    }

    const toggleContactSectionHandler = () => {
        dispatch(uiActions.toggleContactSection());
    }
    const contactSectionIsClosed = useSelector(state => state.ui.contactSectionIsClosed);
    const location = useLocation();
    const isChatPage = location.pathname === '/chat';
    const classForNavLinkContacts = `${classes.link} ${contactSectionIsClosed && isChatPage ? classes['link--contacts-closed'] : ''}`

    return (
        <aside className={classes.aside}>
            <Logo/>
            <nav className={classes.nav}>
                {userIsLoggedIn && (
                    <NavLink
                        onClick={toggleContactSectionHandler}
                        title="Chat"
                        className={classForNavLinkContacts}
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
                            <UserIcon url={userImgUrl} />
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