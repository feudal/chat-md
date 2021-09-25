import React from 'react';
import classes from './Forms.module.css';
import {Link} from "react-router-dom";
import useInput from "../../hooks/use-input";
import TogglePassword from "../UI/TogglePassword/TogglePassword";
import {uiActions} from "../../store/ui";
import {useDispatch} from "react-redux";
import {authActions, createUserOnServer} from "../../store/auth";


function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validatePassword(password) {
    return password.trim().length > 5;
}

function validatePasswordConfirm(passConfirm, pass) {
    return passConfirm === pass;
}

const FormRegister = (props) => {
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

    const {
        // value: enteredPasswordConfirm,
        hasError: passwordConfirmHasError,
        valueIsValid: passwordConfirmIsValid,
        valueChangeHandler: passwordConfirmChangeHandler,
        valueInputBlurHandler: passwordConfirmInputBlurHandler
    } = useInput(validatePasswordConfirm, enteredPassword);

    const formHandler = (event) => {
        event.preventDefault();
        if (!emailIsValid || !passwordIsValid || !passwordConfirmIsValid) {
            emailInputBlurHandler();
            passwordInputBlurHandler();
            passwordConfirmInputBlurHandler();
            return;
        }

        dispatch(uiActions.setMessageNotification({
            // show: true,
            type: 'Loading',
            message: 'Trimitem datele!'
        }));

        const API_KEY = 'AIzaSyAb00BknyYAFZ9_dz_idnW4mqPLdpPxdns';
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + API_KEY,
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
            if (res.ok) {
                dispatch(uiActions.setMessageNotification({
                    type: 'Success',
                    message: 'Contul a fost creat!'
                }));
                return res.json();

            } else {
                res.json().then(data => {
                    let errorMessage = 'Creare cont eșuată!';
                    if (data && data.error && data.error.message) {
                        errorMessage = data.error.message;
                    }
                    if (errorMessage === 'EMAIL_EXISTS') {
                        errorMessage = 'Așa email există!'
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

                createUserOnServer({
                    id: data.localId,
                    email: data.email,
                    name: data.email,
                });

                setTimeout(() => dispatch(authActions.logout()), 3600 * 1000); //one hour;
            }
        });
    }

    return (
        <form className={classes.form} onSubmit={formHandler}>
            <h2 className={classes.title}>Creare account</h2>
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
                        onChange={passwordChangeHandler}
                        onBlur={passwordInputBlurHandler}
                        className={`${classes.input} ${!passwordHasError ? '' : classes['input--error']}`}
                        type="password"
                    />
                </TogglePassword>
            </label>
            {passwordHasError && <span className={classes.error}>Parola prea scurta! (minim 6 simboluri)</span>}
            <label className={classes.label}>
                <span>Confirmă parola</span>
                <TogglePassword>
                    <input
                        onBlur={passwordConfirmInputBlurHandler}
                        onChange={passwordConfirmChangeHandler}
                        className={`${classes.input} ${!passwordConfirmHasError ? '' : classes['input--error']}`}
                        type="password"/>
                </TogglePassword>
            </label>
            {passwordConfirmHasError && <span className={classes.error}>Parola nu coencide!</span>}
            <input className={classes.button} type="submit" value='Inregistrare'/>
            <div className={classes['form-group']}>
                <span className={classes.span}>Deja ești membru?</span>
                <Link
                    onClick={props.switchForm}
                    className={classes.link}
                    to='/'>Intră în cont</Link>
            </div>
        </form>
    );
};

export default FormRegister;