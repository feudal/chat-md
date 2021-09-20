import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    idToken: localStorage.idToken,
    isLoggedIn: localStorage.isLoggedIn,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action) {
            state.idToken = action.payload;
            state.isLoggedIn = true;
            localStorage.setItem('idToken', action.payload);
            localStorage.setItem('isLoggedIn', true);
        },
        logout(state) {
            state.idToken = '';
            state.isLoggedIn = false;
            localStorage.removeItem('idToken');
            localStorage.removeItem('isLoggedIn');
        }
    }
});

export default authSlice;
export const authActions = authSlice.actions;