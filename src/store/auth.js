import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    idToken: '',
    isLoggedIn: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action) {
            state.idToken = action.payload;
            state.isLoggedIn = true;
        },
        logout(state) {
            state.idToken = '';
            state.isLoggedIn = false;
        }
    }
});

export default authSlice;
export const authActions = authSlice.actions;