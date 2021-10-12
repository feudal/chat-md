import React from 'react';
import classes from './Welcome.module.css';
import {useSelector} from "react-redux";

const Welcome = () => {
    const name = useSelector(state => state.user.userInformation.name);
    console.log('name', name)
    return (
        <div className={classes.wellcome}>
            <div>
                <span>Bun venit </span>
                {name && <span>{'\n' + name}!</span>}
                {!name && <span>!</span>}
            </div>
        </div>
    );
};

export default Welcome;