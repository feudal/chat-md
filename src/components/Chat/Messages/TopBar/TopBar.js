import React from 'react';
import classes from './TopBar.module.css';
import Info from "../../../UI/Info/Info";
import {useDispatch, useSelector} from "react-redux";
import {uiActions} from "../../../../store/ui";

const TopBar = () => {
    const currentUsername = useSelector(state => state.contacts.currentContact.name)
    const dispatch = useDispatch();
    const openHandler = () => {
        dispatch(uiActions.openContactInfo());
    }

    return (
        <div className={classes.topbar}>
            <h3 className={classes.title}>{currentUsername}</h3>
            <Info title='About this user' open={openHandler}/>
        </div>
    );
};

export default TopBar;