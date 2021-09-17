import React from 'react';
import classes from './EnterMessage.module.css';

const EnterMessage = () => {
    return (
        <form className={classes.form}>
            <input className={classes.input} type="text" placeholder='Scrie mesaj'/>
            <button className={classes.button}>Trimite</button>
        </form>
    );
};

export default EnterMessage;