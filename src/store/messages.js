import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {findSecondFragment, realtimeDatabaseUrl} from "../AditionalConstAndFunction/aditionalConstAndFunction";

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
        [sendMessageAsync.rejected]: (state) => {
        }
    }
})

export default messageSlice;
export const messageActions = messageSlice.actions;