import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    message: '',
}

const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        firstReducer() {},
    }
})

export default messageSlice;