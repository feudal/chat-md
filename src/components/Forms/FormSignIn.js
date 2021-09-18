import React from 'react';
import classes from './Forms.module.css';
import {Link} from "react-router-dom";
import useInput from "../../hooks/use-input";

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validatePassword(password) {
    return password.trim().length > 5;
}

const FormSignIn = (props) => {
    const {
        value: enteredEmail,
        hasError: emailHasError,
        valueIsValid: emailIsValid,
        valueChangeHandler: emailChangeHandler,
        valueInputBlurHandler: emailInputBlurHandler
    } = useInput(validateEmail);

    const {
        value: enteredPassword,
        hasError: passwordHasError,
        valueIsValid: passwordIsValid,
        valueChangeHandler: passwordChangeHandler,
        valueInputBlurHandler: passwordInputBlurHandler
    } = useInput(validatePassword);

    const formHandler = (event) => {
        event.preventDefault();
        if (!emailIsValid || !passwordIsValid) {
            emailInputBlurHandler();
            passwordInputBlurHandler();
            return;
        }
        console.log('logare');
        console.log(enteredEmail);
        console.log(enteredPassword);
    }


    return (
        <form onSubmit={formHandler} className={classes.form}>
            <h2 className={classes.title}>Logare</h2>
            <label className={classes.label}>
                Email
                <input
                    onBlur={emailInputBlurHandler}
                    onChange={emailChangeHandler}
                    className={`${classes.input} ${!emailHasError ? '' : classes['input--error']}`}
                    type="email"/>
            </label>
            {emailHasError && <span className={classes.error}>Format de email invalid!</span>}
            <label className={classes.label}>
                Parola
                <input
                    onBlur={passwordInputBlurHandler}
                    onChange={passwordChangeHandler}
                    className={`${classes.input} ${!passwordHasError ? '' : classes['input--error']}`}
                    type="password"/>
            </label>
            {passwordHasError && <span className={classes.error}>Parola prea scurta! (minim 6 simboluri)</span>}
            <input className={classes.button} type="submit" value='Logare'/>
            <div className={classes['form-group']}>
                <span className={classes.span}>Nu ai cont?</span>
                <Link
                    onClick={props.switchForm}
                    className={classes.link}
                    to='/'>Creaza unul</Link>
            </div>
        </form>
    );
};

export default FormSignIn;