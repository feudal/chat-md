import React from 'react';
import classes from './Error404.module.css';

const Error404 = () => {
    return (
        <>
            <div className={classes.error}>
                <div className={classes.title}>Page not found</div>
                <span>404</span>
            </div>
        </>
    );
};

export default Error404;