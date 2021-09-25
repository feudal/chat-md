import React from 'react';
import classes from './Forms.module.css';
import {Link} from "react-router-dom";
import useInput from "../../hooks/use-input";
import TogglePassword from "../UI/TogglePassword/TogglePassword";
import {uiActions} from "../../store/ui";
import {useDispatch} from "react-redux";
import {authActions} from "../../store/auth";

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validatePassword(password) {
    return password.trim().length > 5;
}

const FormSignIn = (props) => {
    const dispatch = useDispatch();

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

        dispatch(uiActions.setMessageNotification({
            type: 'Loading',
            message: 'Trimitem datele!'
        }));

        const API_KEY = 'AIzaSyAb00BknyYAFZ9_dz_idnW4mqPLdpPxdns';
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + API_KEY,
            {
                method: 'POST',
                body: JSON.stringify({
                    email: enteredEmail,
                    password: enteredPassword,
                    returnSecureToken: true,
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then(res => {
            if(res.ok) {
                dispatch(uiActions.setMessageNotification({
                    type: 'Success',
                    message: 'Logare efectuată!'
                }));
                return res.json();

            } else {
                res.json().then(data => {
                    let errorMessage='Authentificare eșuată!';
                    if (data && data.error && data.error.message) {
                        errorMessage = data.error.message;
                    }
                    if(errorMessage === 'INVALID_PASSWORD') {
                        errorMessage = 'Parolă greșită!'
                    }
                    if(errorMessage === 'EMAIL_NOT_FOUND') {
                        errorMessage = 'Cont inexistent!'
                    }
                    dispatch(uiActions.setMessageNotification({
                        type: 'Error',
                        message: errorMessage
                    }));
                })
            }
        }).then((data) => {
            if(data) {
                dispatch(authActions.login({
                    id: data.localId,
                    idToken: data.idToken,
                    email: data.email,
                }));
                setTimeout(() => dispatch(authActions.logout()), +data.expiresIn * 1000);
            }
        })
    }


    return (
        <form onSubmit={formHandler} className={classes.form}>
            <h2 className={classes.title}>Logare</h2>
            <label className={classes.label}>
                <span>Email</span>
                <input
                    onBlur={emailInputBlurHandler}
                    onChange={emailChangeHandler}
                    className={`${classes.input} ${!emailHasError ? '' : classes['input--error']}`}
                    type="email"/>
            </label>
            {emailHasError && <span className={classes.error}>Format de email invalid!</span>}
            <label className={classes.label}>
                <span>Parola</span>
                <TogglePassword>
                    <input
                        onBlur={passwordInputBlurHandler}
                        onChange={passwordChangeHandler}
                        className={`${classes.input} ${!passwordHasError ? '' : classes['input--error']}`}
                        type="password"/>
                </TogglePassword>
            </label>
            {passwordHasError && <span className={classes.error}>Parola prea scurta! (minim 6 simboluri)</span>}
            <input className={classes.button} type="submit" value='Logare'/>
            <div className={classes['form-group']}>
                <span className={classes.span}>Nu ai cont?</span>
                <Link
                    onClick={props.switchForm}
                    className={classes.link}
                    to='/'>Crează unul</Link>
            </div>
        </form>
    );
};

export default FormSignIn;