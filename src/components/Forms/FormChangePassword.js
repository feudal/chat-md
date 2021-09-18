import React from 'react';
import classes from "./Forms.module.css";
import useInput from "../../hooks/use-input";
import TogglePassword from "../UI/TogglePassword/TogglePassword";

function validatePassword(password) {
    return password.trim().length > 5;
}

const FormChangePassword = () => {
    const {
        value: oldPasswordValue,
        hasError: oldPasswordHasError,
        valueIsValid: oldPasswordIsValid,
        valueChangeHandler: oldPasswordChangeHandler,
        valueInputBlurHandler: oldPasswordInputBlurHandler,

    } = useInput(validatePassword);

    const {
        value: newPasswordValue,
        hasError: newPasswordHasError,
        valueIsValid: newPasswordIsValid,
        valueChangeHandler: newPasswordChangeHandler,
        valueInputBlurHandler: newPasswordInputBlurHandler,

    } = useInput(validatePassword);

    const formHandler = (event) => {
        event.preventDefault();
        if (!oldPasswordIsValid || !newPasswordIsValid) {
            newPasswordInputBlurHandler();
            oldPasswordInputBlurHandler();
            return;
        }
        event.preventDefault();
        console.log(oldPasswordValue);
        console.log(newPasswordValue);
    }

    return (
        <form
            onSubmit={formHandler}
            className={classes.form}>
            <h2 className={classes.title}>Schimbare parolă</h2>
            <label className={classes.label}>
                <span>Parola veche</span>
                <TogglePassword>
                    <input
                        onBlur={oldPasswordInputBlurHandler}
                        onChange={oldPasswordChangeHandler}
                        className={`${classes.input} ${!oldPasswordHasError ? '' : classes['input--error']}`}
                        type="password"/>
                </TogglePassword>
            </label>
            {oldPasswordHasError && <span className={classes.error}>Parola e prea scurta!</span>}
            <label className={classes.label}>
                <span>Parola nouă</span>
                <TogglePassword>
                    <input
                        onBlur={newPasswordInputBlurHandler}
                        onChange={newPasswordChangeHandler}
                        className={`${classes.input} ${!newPasswordHasError ? '' : classes['input--error']}`}
                        type="password"/>
                </TogglePassword>
            </label>
            {newPasswordHasError && <span className={classes.error}>Parola e prea scurta!</span>}
            <input className={classes.button} type="submit" value='Schimbare parolă'/>
        </form>
    );
};

export default FormChangePassword;