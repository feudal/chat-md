import {createSlice} from "@reduxjs/toolkit";
import {realtimeDatabaseUrl} from "../AditionalConstAndFunction/aditionalConstAndFunction";


const authState = () => {
    //logout state if the token is expired;
    let id = localStorage.id;
    let idToken = localStorage.idToken;
    let isLoggedIn = localStorage.isLoggedIn;
    let timeOfLogOut = localStorage.timeOfLogOut;
    let email = localStorage.email;

    const currentTime = new Date().getTime();
    const timeOfLogOutInStamps = Date.parse(timeOfLogOut);
    if (currentTime > timeOfLogOutInStamps) {
        id = null;
        idToken = null;
        isLoggedIn = null;
        timeOfLogOut = null;
        email = null;
    }
    return [id, idToken, isLoggedIn, timeOfLogOut, email]
}

const [id, idToken, isLoggedIn, timeOfLogOut, email] = authState();

const initialState = {
    id,
    idToken,
    isLoggedIn,
    timeOfLogOut,
    email,
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
            localStorage.clear();
        },
        login(state, action) {
            state.id = action.payload.id;
            state.idToken = action.payload.idToken;
            state.isLoggedIn = true;
            state.email = action.payload.email;
            localStorage.setItem('id', action.payload.id);
            localStorage.setItem('idToken', action.payload.idToken);
            localStorage.setItem('isLoggedIn', true);
            localStorage.setItem('email', action.payload.email);
            let date = new Date();
            date = new Date(date.setHours(date.getHours() + 1)); //add one hour
            localStorage.timeOfLogOut = date;
        }
    }
});

export const createUserOnServer = (userInformation) => {
    fetch(
        realtimeDatabaseUrl + 'users-info.json',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userInformation),
        }
    ).then(response => {
        if (!response.ok) {
            throw new Error('Create user on server failed!');
        } else {
            return response.json();
        }

    }).then(data => {
        // console.log('data', data)
    });
}

export default authSlice;
export const authActions = authSlice.actions;