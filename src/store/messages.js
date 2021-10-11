import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {
    findSecondFragment,
    formatEmail,
    realtimeDatabaseUrl
} from "../AditionalConstAndFunction/aditionalConstAndFunction";

export const sendMessageAsync = createAsyncThunk(
    'message/sendMessageAsync',
    async function ({username, message, email}, {dispatch, rejectWithValue}) {
        try {
            fetch(realtimeDatabaseUrl + 'all-messages.json')
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Server error');
                    }
                })
                .then(data => {
                    const secondFragmentUrl = findSecondFragment(data, email);

                    if (secondFragmentUrl) { //if messages exist
                        return fetch(realtimeDatabaseUrl + 'all-messages/' + secondFragmentUrl, {
                            method: 'POST',
                            body: JSON.stringify({
                                date: new Date(),
                                name: username,
                                message,
                            })
                        })
                    }
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Server error 2');
                    } else {
                        dispatch(messageActions.sendMessage({
                            date: new Date(),
                            name: username,
                            message,
                        }))
                    }
                })
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

export const initiateMessaging = createAsyncThunk(
    'message/initiateMessaging',
    async function (email, { rejectWithValue}) {
        try {
            fetch(realtimeDatabaseUrl + '/all-messages.json')
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Server error');
                    }
                })
                .then(data => {
                    console.log(data);
                    const secondFragmentUrl = findSecondFragment(data, email);

                    if (!secondFragmentUrl) {//dont create a new array of message
                        return fetch(realtimeDatabaseUrl + '/all-messages.json', {
                            method: 'POST',
                            body: JSON.stringify({
                                [formatEmail(email) + '-and-' + formatEmail(localStorage.email)]: {
                                    '-someKey': {
                                        date: new Date(),
                                        message: 'Ati inceput sa comunicati cu un contact nou',
                                        name: 'System',
                                    }
                                }
                            })
                        })
                    }
                })

        } catch (error) {
            return rejectWithValue(error);
        }
    }
)

const initialState = {
    currentMessages: [],
}

const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        initiateCurrentMessages(state, action) {
            state.currentMessages = action.payload.sort((a, b) => {//sort arr of obj by date
                const c = new Date(a.date);
                const d = new Date(b.date);
                return c - d;
            });
        },
        sendMessage(state, action) {
            state.currentMessages.push({
                date: new Date(),
                message: action.payload.message,
                name: action.payload.name,
            })
        }
    },
    extraReducers: {
        [sendMessageAsync.rejected]: () => {},
        [initiateMessaging.rejected]: () => {},
    }
})

export default messageSlice;
export const messageActions = messageSlice.actions;