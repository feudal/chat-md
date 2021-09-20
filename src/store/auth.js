import {createSlice} from "@reduxjs/toolkit";

const authState = () => {
    //logout state if the token is expired;
    let idToken = localStorage.idToken;
    let isLoggedIn = localStorage.isLoggedIn;
    let timeOfLogOut = localStorage.timeOfLogOut;

    const currentTime = new Date().getTime();
    const timeOfLogOutInStamps = Date.parse(timeOfLogOut);
    if (currentTime > timeOfLogOutInStamps) {
        idToken = null;
        isLoggedIn = null;
        timeOfLogOut = null;
    }
    return [idToken, isLoggedIn, timeOfLogOut]
}

const [idToken, isLoggedIn, timeOfLogOut] = authState();

const initialState = {
    idToken,
    isLoggedIn,
    timeOfLogOut,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.idToken = null;
            state.isLoggedIn = false;
            state.timeOfLogOut = null;
            localStorage.removeItem('idToken');
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('timeOfLogOut');
        },
        login(state, action) {
            state.idToken = action.payload;
            state.isLoggedIn = true;
            localStorage.setItem('idToken', action.payload.idToken);
            localStorage.setItem('isLoggedIn', true);
            localStorage.timeOfLogOut = new Date();
        }
    }
});

export default authSlice;
export const authActions = authSlice.actions;