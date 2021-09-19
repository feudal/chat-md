import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    showContactInfo: true,
    messageNotification: {
        show: false,
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
            state.messageNotification.show = false;
        },
        openMessageNotification(state) {
            state.messageNotification.show = true;
        },
        setMessageNotification(state, action) {
            state.messageNotification.show = true;
            state.messageNotification.type = action.payload.type;
            state.messageNotification.message = action.payload.message;
        }
    }
});

export default uiSlice;
export const uiActions = uiSlice.actions;