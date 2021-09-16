import React from 'react';
import classes from './ProfileImage.module.css';

const ProfileImage = () => {
    return (
        <div>
            <div className={classes['img-frame']}>
                <span className={classes.span}>Imaginea de profil</span>
            </div>
            <button className={classes.button}>Adaugă imagine</button>
        </div>
    );
};

export default ProfileImage;