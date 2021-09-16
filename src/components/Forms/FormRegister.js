import React from 'react';
import classes from './Forms.module.css';
import {Link} from "react-router-dom";

const FormRegister = (props) => {
    return (
        <form className={classes.form}>
            <h2 className={classes.title}>Creare account</h2>
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
            <label className={classes.label}>
                Confirmă parola
                <input className={classes.input} type="password"/>
            </label>
            <span className={classes.error}>Parola nu coencide!</span>
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