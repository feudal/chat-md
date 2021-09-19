import React, {useEffect, useState} from 'react';
import Bubbles from "../components/decoration/Bubbles/Bubbles";
import FormRegister from "../components/Forms/FormRegister.js";
import FormSignIn from '../components/Forms/FormSignIn.js';
import MessageNotification from "../components/UI/MessageNotification/MessageNotification";
import {useDispatch, useSelector} from "react-redux";
import {uiActions} from "../store/ui";

const Entrance = () => {
    const [isLoginForm, setIsLoginForm] = useState(true);
    const dispatch = useDispatch();
    const messageNotificationState = useSelector(state => state.ui.messageNotification);

    const onSwitchFormHandler = () => {
        setIsLoginForm(!isLoginForm);
    }

    //close messageNotification after 5 second
    useEffect(() => {
        const timeout = setTimeout(() => {
            dispatch(uiActions.closeMessageNotification());
        }, 5000);

        return () => {
            clearTimeout(timeout)
        }
    }, [messageNotificationState, dispatch]);

    return (
        <div>
            <Bubbles/>
            <MessageNotification/>
            {isLoginForm && <FormSignIn switchForm={onSwitchFormHandler}/>}
            {!isLoginForm && <FormRegister switchForm={onSwitchFormHandler}/>}
        </div>
    );
};

export default Entrance;