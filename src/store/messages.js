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
        sendMessage(state, action) {
            state.currentMessages.push({
                date: new Date(),
                message: action.payload.message,
                name: action.payload.name,
            })
        }
    }
})

export default messageSlice;
export const messageActions = messageSlice.actions;