import React, {useRef} from 'react';
import classes from './ProfileForm.module.css';
import {useDispatch, useSelector} from "react-redux";
import {updateUserInfoOnServer} from '../../../store/user';
import {useHistory} from 'react-router-dom';

const ProfileForm = () => {
    const userInfo = useSelector(state => state.user.userInformation);
    const dispatch = useDispatch();
    const history = useHistory();

    const userName = useRef();
    const userPhone = useRef();
    const userDob = useRef();
    const userText = useRef();

    const onSubmitHandler = (event) => {
        event.preventDefault();
        dispatch(updateUserInfoOnServer({
            email: userName.current.value,
            name: userName.current.value,
            phone: userPhone.current.value,
            dob: userDob.current.value,
            personalInfo: userText.current.value,
        }))
        history.push('/profile');
    }

    return (
        <form className={classes.form} onSubmit={onSubmitHandler}>
            <label className={classes.label}>
                <span className={classes.span}>Email</span>
                <input
                    className={[classes.input, classes['input--lock']].join(' ')}
                    type="email" placeholder='completati'
                    value={userInfo.email} readOnly/>
            </label>
            <label className={classes.label}>
                <span className={classes.span}>Nume prenume</span>
                <input
                    ref={userName}
                    className={classes.input}
                    type="text" defaultValue={userInfo.name}
                    placeholder='completati'/>
            </label>
            <label className={classes.label}>
                <span className={classes.span}>Telefon</span>
                <input
                    ref={userPhone}
                    className={classes.input}
                    type="text"
                    defaultValue={userInfo.phone}
                    placeholder='completati'/>
            </label>
            <label className={classes.label}>
                <span className={classes.span}>Data de naștere</span>
                <input
                    ref={userDob}
                    className={classes.input}
                    type="date"
                    defaultValue={userInfo.dob}/>
            </label>
            <label className={classes.label}>
                <span className={classes.span}>Despre mine</span>
                <textarea
                    ref={userText}
                    className={classes.textarea}
                    defaultValue={userInfo.personalInfo}/>
            </label>
            <input className={classes.button} type="submit" value='Applica schimbarile'/>
            <div className={classes['form-group']}>
            </div>
        </form>
    );
};

export default ProfileForm;