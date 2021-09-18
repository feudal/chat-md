import React from 'react';
import classes from './MessageNotification.module.css';
import CloseBtn from "../CloseBtn/CloseBtn";
import {useDispatch, useSelector} from "react-redux";
import {uiActions} from "../../../store/ui";
import classNames from "classnames/bind";

const MessageNotification = () => {
    const dispatch = useDispatch();
    const toggleMessageNotificationHandler = () => {
        dispatch(uiActions.closeMessageNotification());
    }

    const messageNotificationState = useSelector(state => state.ui.messageNotification)
    const showMessageNotification = useSelector(state => state.ui.showMessageNotification);

    const classNameBound = classNames.bind(classes);
    const classForMessageNotification = classNameBound(
        classes.notification,
        {'notification--open': showMessageNotification},
        {'notification--closed': !showMessageNotification},
        {'notification--error': messageNotificationState.type === 'Error'},
        {'notification--success': messageNotificationState.type === 'Success'},
        {'notification--info': messageNotificationState.type === 'Info'});

    return (
        <div className={classForMessageNotification}>
            <CloseBtn close={toggleMessageNotificationHandler}/>
            <span className={classes.text}>{messageNotificationState.type}</span>
            <span className={classes.text}>{messageNotificationState.message}</span>
        </div>
    );
};

export default MessageNotification;