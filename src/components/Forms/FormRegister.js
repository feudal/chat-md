import React, {useRef} from 'react';
import classes from './Forms.module.css';
import {Link} from "react-router-dom";
import useInput from "../../hooks/use-input";

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validatePassword(password) {
    return password.trim().length > 5;
}

function validatePasswordConfirm(args) {
    const [pass, passConfirm] = args;
    return pass === passConfirm;
}

const FormRegister = (props) => {
    const {
        value: enteredEmail,
        hasError: emailHasError,
        valueChangeHandler: emailChangeHandler,
        valueInputBlurHandler: emailInputBlurHandler
    } = useInput(validateEmail);

    const {
        value: enteredPassword,
        hasError: passwordHasError,
        valueChangeHandler: passwordChangeHandler,
        valueInputBlurHandler: passwordInputBlurHandler
    } = useInput(validatePassword);

    const passwordConfirmRef = useRef();
    const {
        value: enteredPasswordConfirm,
        hasError: passwordConfirmHasError,
        valueChangeHandler: passwordConfirmChangeHandler,
        valueInputBlurHandler: passwordConfirmInputBlurHandler
    } = useInput(validatePasswordConfirm);

    const formHandler = (event) => {
        event.preventDefault();
        console.log(enteredEmail);
        console.log(enteredPassword);
        console.log(enteredPasswordConfirm);
    }

    return (
        <form className={classes.form} onSubmit={formHandler}>
            <h2 className={classes.title}>Creare account</h2>
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
                    onChange={passwordChangeHandler}
                    onBlur={passwordInputBlurHandler}
                    className={`${classes.input} ${!passwordHasError ? '' : classes['input--error']}`}
                    type="password"/>
            </label>
            {passwordHasError && <span className={classes.error}>Parola prea scurta! (minim 6 simboluri)</span>}
            <label className={classes.label}>
                Confirmă parola
                <input
                    ref={passwordConfirmRef}
                    onBlur={passwordConfirmInputBlurHandler}
                    onChange={passwordConfirmChangeHandler}
                    className={`${classes.input} ${!passwordConfirmHasError ? '' : classes['input--error']}`}
                    type="password"/>
            </label>
            {passwordConfirmHasError && <span className={classes.error}>Parola nu coencide!</span>}
            <input className={classes.button} type="submit" value='Inregistrare'/>
            <div className={classes['form-group']}>
                <span className={classes.span}>Deja esti membru?</span>
                <Link
                    onClick={props.switchForm}
                    className={classes.link}
                    to='/'>Intra in cont</Link>
            </div>
        </form>
    );
};

export default FormRegister;