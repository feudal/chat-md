import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    showContactInfo: true,
}

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        closeContactInfo(state) {
            state.showContactInfo = false;
        },
        openContactInfo(state) {
            state.showContactInfo = true;
        },
    }
});

export default uiSlice;
export const uiActions = uiSlice.actions;