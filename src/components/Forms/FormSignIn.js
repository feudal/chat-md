import React from 'react';
import classes from './Forms.module.css';
import {Link} from "react-router-dom";

const FormSignIn = (props) => {
    return (
        <form className={classes.form}>
            <h2 className={classes.title}>Logare</h2>
            <label className={classes.label}>
                Email
                <input className={classes.input} type="email" />
            </label>
            <span className={classes.error}>Format de email invalid!</span>
            <label className={classes.label}>
                Parola
                <input className={classes.input} type="password" />
            </label>
            <span className={classes.error}>Parola prea scurta!</span>
            <input className={classes.button} type="submit" value='Inregistrare'/>
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