import React from 'react';
import classes from './SearchSection.module.css';

const SearchSection = () => {
    return (
        <form className={classes.form}>
            <h3 className={classes.title}>Căutare contacte</h3>
            <input className={classes.input} type="text"/>
        </form>
    );
};

export default SearchSection;