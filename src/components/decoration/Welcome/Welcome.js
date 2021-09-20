import React from 'react';
import classes from './Welcome.module.css';

const Welcome = (props) => {
    return (
        <div className={classes.wellcome}>
            Bun venit {props.name}!
        </div>
    );
};

export default Welcome;