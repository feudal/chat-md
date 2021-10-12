import React, {useRef} from 'react';
import classes from './EnterMessage.module.css';
import classesFromAllMessage from '../AllMessages/AllMessages.module.css';
import {useDispatch, useSelector} from "react-redux";
import {sendMessageAsync} from "../../../../store/messages";

const EnterMessage = () => {
    const dispatch = useDispatch();
    const userInput = useRef();
    const currentUser = useSelector(state => state.contacts.currentContact);

    const onSubmitHandler = (event) => {
        event.preventDefault();
        //can send message if user is not in contact and is not favorite
        if (!currentUser.isContact && !currentUser.isFavorite) {
            userInput.current.value = '';
        }

        if (userInput.current.value) {
            dispatch(sendMessageAsync({
                message: userInput.current.value,
                email: currentUser.email,
            }));
            //scroll down when the message is sending
            const element = document.querySelector('.' + classesFromAllMessage.block);
            const scroll = () => {
                setTimeout(()=> {
                    element.scrollTop = element.scrollHeight;
                }, 500);
            }
            scroll();
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