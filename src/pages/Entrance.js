import React, {useState} from 'react';
import Bubbles from "../components/decoration/Bubbles/Bubbles";
import FormRegister from "../components/Forms/FormRegister.js";
import FormSignIn from '../components/Forms/FormSignIn.js';
import MessageNotification from "../components/UI/MessageNotification/MessageNotification";
import {useSelector} from "react-redux";
import Welcome from "../components/decoration/Welcome/Welcome";

const Entrance = () => {
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
    const [isLoginForm, setIsLoginForm] = useState(true);

    const onSwitchFormHandler = () => {
        setIsLoginForm(!isLoginForm);
    }

    return (
        <div>
            <Bubbles/>
            <MessageNotification/>
            {isLoggedIn && <Welcome/>}
            {isLoginForm && !isLoggedIn && <FormSignIn switchForm={onSwitchFormHandler}/>}
            {!isLoginForm && ! isLoggedIn && <FormRegister switchForm={onSwitchFormHandler}/>}
        </div>
    );
};

export default Entrance;