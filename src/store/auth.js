import {createSlice} from "@reduxjs/toolkit";
// import {useSelector} from "react-redux";
// import {userAction} from "./user";

const authState = () => {
    //logout state if the token is expired;
    let id = localStorage.id;
    let idToken = localStorage.idToken;
    let isLoggedIn = localStorage.isLoggedIn;
    let timeOfLogOut = localStorage.timeOfLogOut;

    const currentTime = new Date().getTime();
    const timeOfLogOutInStamps = Date.parse(timeOfLogOut);
    if (currentTime > timeOfLogOutInStamps) {
        id = null;
        idToken = null;
        isLoggedIn = null;
        timeOfLogOut = null;
    }
    return [id, idToken, isLoggedIn, timeOfLogOut]
}

const [id, idToken, isLoggedIn, timeOfLogOut] = authState();

const initialState = {
    id,
    idToken,
    isLoggedIn,
    timeOfLogOut,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.id = null;
            state.idToken = null;
            state.isLoggedIn = false;
            state.timeOfLogOut = null;
            localStorage.removeItem('id');
            localStorage.removeItem('idToken');
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('timeOfLogOut');
        },
        login(state, action) {
            state.id = action.payload.id;
            state.idToken = action.payload.idToken;
            state.isLoggedIn = true;
            localStorage.setItem('id', action.payload.id);
            localStorage.setItem('idToken', action.payload.idToken);
            localStorage.setItem('isLoggedIn', true);
            let date = new Date();
            date = new Date(date.setHours(date.getHours() + 1)); //add one hour
            localStorage.timeOfLogOut = date;
        }
    }
});

export const createUserOnServer = (userInformation) => {
    fetch(
        'https://chat-6f549-default-rtdb.europe-west1.firebasedatabase.app/users-info.json',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userInformation),
        }
    ).then(response => {
        console.log('response', response.ok, '...')
        if (!response.ok) {
            throw new Error('Create user on server failed!');
        } else {
            return response.json();
        }

    }).then(data => {
        console.log('data', data)
    });
}

export default authSlice;
export const authActions = authSlice.actions;