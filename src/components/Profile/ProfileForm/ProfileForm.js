import React from 'react';
import classes from './ProfileForm.module.css';

const ProfileForm = (props) => {
    const profile = props.profileInfo;

    return (
        <form className={classes.form}>
            <label className={classes.label}>
                <span className={classes.span}>Email</span>
                <input className={[classes.input, classes['input--lock']].join(' ')} type="email" placeholder='completati' value={profile.email} readOnly/>
            </label>
            <label className={classes.label}>
                <span className={classes.span}>Nume prenume</span>
                <input className={classes.input} type="text" defaultValue={profile.name} placeholder='completati' />
            </label>
            <label className={classes.label}>
                <span className={classes.span}>Telefon</span>
                <input className={classes.input} type="text" defaultValue={profile.mobile} placeholder='completati' />
            </label>
            <label className={classes.label}>
                <span className={classes.span}>Data de naștere</span>
                <input className={classes.input} type="date" value={profile.dob} />
            </label>
            <label className={classes.label}>
                <span className={classes.span}>Despre mine</span>
                <textarea className={classes.textarea} defaultValue={profile.text}/>
            </label>
            <input className={classes.button} type="submit" value='Applica schimbarile'/>
            <div className={classes['form-group']}>
            </div>
        </form>
    );
};

export default ProfileForm;