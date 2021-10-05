import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    currentMessages: [],
}

const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        initiateCurrentMessages(state, action) {
            state.currentMessages = action.payload;
        },
    }
})

export default messageSlice;
export const messageActions = messageSlice.actions;