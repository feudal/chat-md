import React from 'react';
import classes from "./Forms.module.css";
import useInput from "../../hooks/use-input";
import TogglePassword from "../UI/TogglePassword/TogglePassword";
import {useDispatch, useSelector} from "react-redux";
import {uiActions} from "../../store/ui";
import {authActions} from "../../store/auth";

function validatePassword(password) {
    return password.trim().length > 5;
}

const FormChangePassword = () => {
    const idToken = useSelector(state => state.auth.idToken);
    const dispatch = useDispatch();

    const {
        value: newPasswordValue,
        hasError: newPasswordHasError,
        valueIsValid: newPasswordIsValid,
        valueChangeHandler: newPasswordChangeHandler,
        valueInputBlurHandler: newPasswordInputBlurHandler,

    } = useInput(validatePassword);

    const formHandler = (event) => {
        event.preventDefault();
        if (!newPasswordIsValid) {
            newPasswordInputBlurHandler();
            return;
        }
        dispatch(uiActions.setMessageNotification({
            type: 'Loading',
            message: 'Trimitem datele!'
        }));

        const API_KEY = 'AIzaSyAb00BknyYAFZ9_dz_idnW4mqPLdpPxdns';
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=' + API_KEY,
            {
                method: 'POST',
                body: JSON.stringify({
                    idToken,
                    password: newPasswordValue,
                    returnSecurityToken: true,
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then(res => {//check errors
            if (res.ok) {
                dispatch(uiActions.setMessageNotification({
                    type: 'Success',
                    message: 'response.ok = true'
                }));
                return res.json();
            } else {
                dispatch(uiActions.setMessageNotification({
                    type: 'Error',
                    message: 'Erroare schimbare parolă'
                }));
            }
        }).then(data => {
            if(data) {
                dispatch(authActions.login({
                    id: data.localId,
                    idToken: data.idToken,
                }));
                setTimeout(() => dispatch(authActions.logout()), +data.expiresIn * 1000);
            }
        })
    }

    return (
        <form
            onSubmit={formHandler}
            className={classes.form}>
            <h2 className={classes.title}>Schimbare parolă</h2>
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