import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const removeFromFavorite = createAsyncThunk(
    'user/removeFromFavorite',
    async function (email, {dispatch, rejectWithValue}) {
        try {
            fetch('https://chat-6f549-default-rtdb.europe-west1.firebasedatabase.app/' + localStorage.id + '/contacts.json')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Server error');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data)
                    let theKey;
                    for (const key in data) {
                        if (data[key].email === email) {
                            theKey = key;
                        }
                    }
                    return fetch('https://chat-6f549-default-rtdb.europe-west1.firebasedatabase.app/' + localStorage.id + '/contacts.json',
                        {
                            method: 'PATCH',
                            body: JSON.stringify({
                                [theKey]: {
                                    email,
                                    inContacts: true,
                                    isBlocked: false,
                                    isFavorite: false,
                                }
                            })
                        });
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Server error 2');
                    } else {
                        dispatch(userAction.removeFromFavoriteList(email));
                    }
                    return response.json()
                })
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

export const addToFavorite = createAsyncThunk(
    'user/addToFavorite',
    async function (email, {dispatch, rejectWithValue}) {
        try {
            fetch('https://chat-6f549-default-rtdb.europe-west1.firebasedatabase.app/' + localStorage.id + '/contacts.json')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Server error');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data)
                    let theKey;
                    for (const key in data) {
                        if (data[key].email === email) {
                            theKey = key;
                        }
                    }
                    if (theKey) { //if user exist
                        return fetch('https://chat-6f549-default-rtdb.europe-west1.firebasedatabase.app/' + localStorage.id + '/contacts.json',
                            {
                                method: 'PATCH',
                                body: JSON.stringify({
                                    [theKey]: {
                                        email,
                                        inContacts: false,
                                        isBlocked: false,
                                        isFavorite: true,
                                    }
                                })
                            });
                    } else {//if user not exist
                        return fetch('https://chat-6f549-default-rtdb.europe-west1.firebasedatabase.app/' + localStorage.id + '/contacts.json',
                            {
                                method: 'POST',
                                body: JSON.stringify({
                                    email,
                                    inContacts: false,
                                    isBlocked: false,
                                    isFavorite: true,
                                })
                            });
                    }
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Server error 2');
                    } else {
                        dispatch(userAction.addToFavoriteList(email));
                    }
                    return response.json()
                })

        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

// export const

const initialState = {
    status: 'null',
    userInformation: {
        id: localStorage.id,
        email: null,
        fullName: null,
        phone: null,
        dob: null,
    },
    currentContact: {
        name: null,
        email: null,
        isFavorite: false,
        isBlocked: false,
        isContact: false,
    },
    allUserContactList: [],
    userContactList: [],
    userFavoriteContactList: [],
    userBlockedContactList: [],
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCurrentContact(state, action) {
            state.currentContact = action.payload;
        },
        setAllUserContactList(state, action) {
            state.allUserContactList = action.payload;
        },
        setUserContactList(state, action) {
            state.userContactList = action.payload;
        },
        setFavoriteContactList(state, action) {
            state.userFavoriteContactList = action.payload;
        },
        setBlockedContactList(state, action) {
            state.userBlockedContactList = action.payload;
        },
        updateUserInformation(state, action) {
            state.userInformation = {
                id: localStorage.id,
                email: action.payload.email,
                fullName: action.payload.fullName,
                phone: action.payload.phone,
                dob: action.payload.dob,
            }
        },
        addToFavoriteList(state, action) {
            state.userFavoriteContactList.push(action.payload);
            state.userContactList = state.userContactList.filter(item => item !== action.payload);
        },
        removeFromFavoriteList(state, action) {
            state.userFavoriteContactList = state.userFavoriteContactList.filter(item => item !== action.payload);
            state.userContactList.push(action.payload);
        },
        addToBlockList(state, action) {
            state.userBlockedContactList.push(action.payload);
        },
        removeFromBlockList(state, action) {

        },
    },
    extraReducers: {
        [removeFromFavorite.rejected]: (state) => {
            state.status = 'server error';
        }
    }
});

export default userSlice;
export const userAction = userSlice.actions;