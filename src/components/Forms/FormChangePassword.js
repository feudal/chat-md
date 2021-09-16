import React from 'react';
import classes from "./Forms.module.css";

const FormChangePassword = () => {
    return (
        <form className={classes.form}>
            <h2 className={classes.title}>Schimbare parolă</h2>
            <label className={classes.label}>
                Parola nouă
                <input className={classes.input} type="email" />
            </label>
            <span className={classes.error}>Parola prea scurta!</span>
            <input className={classes.button} type="submit" value='Schimbare parolă'/>
        </form>
    );
};

export default FormChangePassword;