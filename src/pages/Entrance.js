import React, {useState} from 'react';
import Bubbles from "../components/decoration/Bubbles/Bubbles";
import FormRegister from "../components/Forms/FormRegister.js";
import FormSignIn from '../components/Forms/FormSignIn.js';
import MessageNotification from "../components/UI/MessageNotification/MessageNotification";

const Entrance = () => {
    const [isLoginForm, setIsLoginForm] = useState(true);

    const onSwitchFormHandler = () => {
        setIsLoginForm(!isLoginForm);
    }

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