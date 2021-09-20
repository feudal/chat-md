import React, {useEffect} from 'react';
import classes from './MessageNotification.module.css';
import CloseBtn from "../CloseBtn/CloseBtn";
import {useDispatch, useSelector} from "react-redux";
import {uiActions} from "../../../store/ui";
import classNames from "classnames/bind";
import Loader from "../../decoration/Loader/Loader";

const MessageNotification = () => {

    const dispatch = useDispatch();
    const toggleMessageNotificationHandler = () => {
        dispatch(uiActions.closeMessageNotification());
    }

    //close messageNotification after 5 second
    const messageNotificationState = useSelector(state => state.ui.messageNotification);
    useEffect(() => {
        const timeout = setTimeout(() => {
            dispatch(uiActions.closeMessageNotification());
        }, 5000);

        return () => {
            clearTimeout(timeout)
        }
    }, [messageNotificationState.show, dispatch]);

    const classNameBound = classNames.bind(classes);
    const classForMessageNotification = classNameBound(
        classes.notification,
        {'notification--open': messageNotificationState.show},
        {'notification--closed': !messageNotificationState.show},
        {'notification--error': messageNotificationState.type === 'Error'},
        {'notification--success': messageNotificationState.type === 'Success'},
        {'notification--info': messageNotificationState.type === 'Info'},
        {'notification--loading': messageNotificationState.type === 'Loading'});

    return (
        <div className={classForMessageNotification}>
            {(messageNotificationState.type === 'Loading') && <Loader/>}
            <CloseBtn close={toggleMessageNotificationHandler}/>
            <span className={classes.text}>{messageNotificationState.type}</span>
            <span className={classes.text}>{messageNotificationState.message}</span>
        </div>
    );
};

export default MessageNotification;