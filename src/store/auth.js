import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    token: '',
    isLoggedIn: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action) {
            state.token = action.payload.token;
            state.isLoggedIn = true;
        },
        logout(state) {
            state.token = '';
            state.isLoggedIn = false;
        }
    }
});

export default authSlice;
export const authActions = authSlice.actions;