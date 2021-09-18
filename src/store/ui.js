import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    showContactInfo: true,
    showMessageNotification: true,
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
        toggleMessageNotification(state) {
            state.showMessageNotification = !state.showMessageNotification;
        }
    }
});

export default uiSlice;
export const uiActions = uiSlice.actions;