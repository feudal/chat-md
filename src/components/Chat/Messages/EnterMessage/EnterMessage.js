import React, {useRef} from 'react';
import classes from './EnterMessage.module.css';
import {useDispatch, useSelector} from "react-redux";
import {sendMessageAsync} from "../../../../store/messages";

const EnterMessage = () => {
    const dispatch = useDispatch();
    const userInput = useRef();
    const userInfo = useSelector(state => state.user.userInformation);
    const currentUserEmail = useSelector(state => state.user.currentContact.email);

    const onSubmitHandler = (event) => {
        event.preventDefault();
        if(userInput.current.value) {
            dispatch(sendMessageAsync({
                username: userInfo.name,
                message: userInput.current.value,
                email: currentUserEmail,
            }));
        }
        userInput.current.value = '';
    }

    return (
        <form className={classes.form} onSubmit={onSubmitHandler}>
            <input
                className={classes.input}
                type="text"
                ref={userInput}
                placeholder='Scrie mesaj'/>
            <button className={classes.button} type='submit'>Trimite</button>
        </form>
    );
};

export default EnterMessage;