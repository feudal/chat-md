import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    showContactInfo: true,
    showMessageNotification: false,
    messageNotification: {
        type: null,
        message: null
    }
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
        closeMessageNotification(state) {
            state.showMessageNotification = false;
        },
        openMessageNotification(state) {
            state.showMessageNotification = true;
        },
        setMessageNotification(state, action) {
            state.messageNotification.type = action.payload.type;
            state.messageNotification.message = action.payload.message;
        }
    }
});

export default uiSlice;
export const uiActions = uiSlice.actions;