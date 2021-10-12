import React, {useEffect} from 'react';
import classes from './Welcome.module.css';
import {useDispatch, useSelector} from "react-redux";
import {refreshUserInfoFromServer} from "../../../store/user";

const Welcome = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(refreshUserInfoFromServer());
    }, [dispatch]);

    const name = useSelector(state => state.user.userInformation.name);

    return (
        <div className={classes.welcome}>
            <div>
                <span>Bun venit </span>
                {name && <span>{'\n' + name}!</span>}
                {!name && <span>!</span>}
            </div>
        </div>
    );
};

export default Welcome;