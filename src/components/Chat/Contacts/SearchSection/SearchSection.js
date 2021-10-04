import React, {useRef} from 'react';
import classes from './SearchSection.module.css';
import {useDispatch} from "react-redux";
import {uiActions} from "../../../../store/ui";

const SearchSection = () => {
    const dispatch = useDispatch();
    const userInput = useRef();

    const searchHandler = (event) => {
        event.preventDefault();
    }
    const onChangeHandler = () => {
        dispatch(uiActions.setSearchByInput(userInput.current.value));
    }

    return (
        <form className={classes.form} onSubmit={searchHandler}>
            <h3 className={classes.title}>Căutare contacte</h3>
            <div className={classes.group}>
                <input className={classes.input} type="text" ref={userInput} onChange={onChangeHandler}/>
                <button className={classes.search} type="submit"/>
            </div>
        </form>
    );
};

export default SearchSection;