import React from 'react';
import classes from './MessageNotification.module.css';
import CloseBtn from "../CloseBtn/CloseBtn";
import {useDispatch, useSelector} from "react-redux";
import {uiActions} from "../../../store/ui";
import classNames from "classnames/bind";

const MessageNotification = (props) => {
    const dispatch = useDispatch();
    const toggleMessageNotificationHandler = () => {
        dispatch(uiActions.toggleMessageNotification());
    }

    const showMessageNotification = useSelector(state => state.ui.showMessageNotification);
    const classNameBound = classNames.bind(classes);
    const classForMessageNotification = classNameBound(
        classes.notification,
        {'notification--open': showMessageNotification},
        {'notification--closed': !showMessageNotification},
        {'notification--error': props.type === 'error'},
        {'notification--success': props.type === 'success'},
        {'notification--info': props.type === 'info'})
    return (
        <div className={classForMessageNotification}>
            <CloseBtn close={toggleMessageNotificationHandler}/>
            <span className={classes.text}>{props.title}</span>
            <span className={classes.text}>{props.message}</span>
        </div>
    );
};

export default MessageNotification;