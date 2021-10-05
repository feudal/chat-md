import React, {useRef} from 'react';
import classes from './EnterMessage.module.css';
import {useDispatch, useSelector} from "react-redux";
import {messageActions} from "../../../../store/messages";

const EnterMessage = () => {
    const dispatch = useDispatch();
    const userInput = useRef();
    const userInfo = useSelector(state => state.user.userInformation);

    const onSubmitHandler = (event) => {
        event.preventDefault();
        dispatch(messageActions.sendMessage({
            message: userInput.current.value,
            name: userInfo.name,
        }));
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