import React from 'react';
import FormChangePassword from "../components/Forms/FormChangePassword";
import Bubbles from "../components/decoration/Bubbles/Bubbles";
import MessageNotification from "../components/UI/MessageNotification/MessageNotification";

const ChangePassword = () => {
    return (
        <>
            <Bubbles/>
            <MessageNotification/>
            <FormChangePassword/>
        </>
    );
};

export default ChangePassword;