import React from 'react';
import classes from './ProfileImage.module.css';

const ProfileImage = () => {
    return (
        <div>
            <div className={classes['img-frame']}/>
            <button className={classes.button}>Adaugă imagine</button>
        </div>
    );
};

export default ProfileImage;