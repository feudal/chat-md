import React from 'react';
import classes from './ProfileForm.module.css';

const ProfileForm = (props) => {
    const profile = props.profileInfo;

    return (
        <form className={classes.form}>
            <label className={classes.label}>
                <span>Email</span>
                <input className={[classes.input, classes['input--lock']].join(' ')} type="email" placeholder='completati' value={profile.email} readOnly/>
            </label>
            <label className={classes.label}>
                <span>Nume prenume</span>
                <input className={classes.input} type="text" placeholder={profile.name ? profile.name : 'completati'} />
            </label>
            <label className={classes.label}>
                <span>Telefon</span>
                <input className={classes.input} type="text" placeholder={profile.mobile ? profile.mobile : 'completati'} />
            </label>
            <label className={classes.label}>
                <span>Data de naștere</span>
                <input className={classes.input} type="date" value={profile.dob} />
            </label>
            <label className={classes.label}>
                <span>Despre mine</span>
                <textarea className={classes.textarea} value={profile.text}/>
            </label>
            <input className={classes.button} type="submit" value='Applica schimbarile'/>
            <div className={classes['form-group']}>
            </div>
        </form>
    );
};

export default ProfileForm;