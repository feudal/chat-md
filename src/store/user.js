import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const findKeyWithEmailFromData = (data, email) => {
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            if (data[key].email === email) {
                return key;
            }
        }
    }
}

const realtimeDatabaseUrl = 'https://chat-6f549-default-rtdb.europe-west1.firebasedatabase.app/';
const fetchUrl = realtimeDatabaseUrl + '/contacts-of-the-users/' + localStorage.id + '/contacts.json'

export const removeFromFavorite = createAsyncThunk(
    'user/removeFromFavorite',
    async function (email, {dispatch, rejectWithValue}) {
        try {
            fetch(fetchUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Server error');
                    }
                    return response.json();
                })
                .then(data => {
                    let theKey = findKeyWithEmailFromData(data, email);

                    return fetch(fetchUrl,
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
                        dispatch(userAction.toggleFavoriteStateCurrentContact());
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
            fetch(fetchUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Server error');
                    }
                    return response.json();
                })
                .then(data => {
                    let theKey = findKeyWithEmailFromData(data, email);
                    if (theKey) { //if user exist
                        return fetch(fetchUrl,
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
                    }
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Server error 2');
                    } else {
                        dispatch(userAction.addToFavoriteList(email));
                        dispatch(userAction.toggleFavoriteStateCurrentContact());
                    }
                    return response.json()
                })

        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

export const addToContact = createAsyncThunk(
    'user/addToContact',
    async function (email, {dispatch, rejectWithValue}) {
        try {
            fetch(fetchUrl,
                {
                    method: 'POST',
                    body: JSON.stringify({
                        email,
                        inContacts: true,
                        isBlocked: false,
                        isFavorite: false,
                    })
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Server error');
                    } else {
                        dispatch(userAction.addToContactList(email));
                    }
                    return response.json();
                })
                .then(data => console.log(data))
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)
export const removeFromContact = createAsyncThunk(
    'user/removeFromContact',
    async function (email, {dispatch, rejectWithValue}) {
        try {
            fetch(fetchUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Server error');
                    }
                    return response.json();
                })
                .then(data => {
                    let theKey = findKeyWithEmailFromData(data, email);
                    return fetch(fetchUrl,
                        {
                            method: 'PATCH',//delete
                            body: JSON.stringify({
                                [theKey]: {}
                            })
                        });
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Server error 2');
                    } else {
                        dispatch(userAction.removeFromFavoriteList(email));
                        dispatch(userAction.removeFromContactList(email));
                    }
                    return response.json()
                })
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

export const blockContact = createAsyncThunk(
    'user/blockContact',
    async function (email, {dispatch, rejectWithValue}) {
        try {
            fetch(fetchUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Server error');
                    }
                    return response.json();
                })
                .then(data => {
                    let theKey = findKeyWithEmailFromData(data, email);
                    if (theKey) { //if user exist
                        return fetch(fetchUrl,
                            {
                                method: 'PATCH',
                                body: JSON.stringify({
                                    [theKey]: {
                                        email,
                                        inContacts: false,
                                        isBlocked: true,
                                        isFavorite: false,
                                    }
                                })
                            });
                    }
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Server error 2');
                    } else {
                        dispatch(userAction.addToBlockList(email));
                        dispatch(userAction.removeFromFavoriteList(email));
                        dispatch(userAction.removeFromContactList(email));
                    }
                    return response.json()
                })

        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

export const unblockContact = createAsyncThunk(
    'user/unblockContact',
    async function (email, {dispatch, rejectWithValue}) {
        try {
            fetch(fetchUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Server error');
                    }
                    return response.json();
                })
                .then(data => {
                    let theKey = findKeyWithEmailFromData(data, email);
                    if (theKey) { //if user exist
                        return fetch(fetchUrl,
                            {
                                method: 'PATCH',
                                body: JSON.stringify({
                                    [theKey]: {
                                        email,
                                        inContacts: false,
                                        isBlocked: false,
                                        isFavorite: false,
                                    }
                                })
                            });
                    }
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Server error 2');
                    } else {
                        dispatch(userAction.removeFromBlockList(email));
                    }
                    return response.json()
                })

        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

const initialState = {
    status: 'null',
    userInformation: {
        id: localStorage.id,
        email: localStorage.email,
        name: localStorage.email,
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
    extraReducers: {
        [removeFromFavorite.rejected]: (state) => {
            state.status = 'server error';
        },
        [addToFavorite.rejected]: (state) => {
            state.status = 'server error';
        },
        [addToContact.rejected]: (state) => {
            state.status = 'server error';
        },
        [removeFromContact.rejected]: (state) => {
            state.status = 'server error';
        }
    },
    reducers: {
        setUserContactList(state, action) {
            state.userContactList = action.payload;
        },
        setFavoriteContactList(state, action) {
            state.userFavoriteContactList = action.payload;
        },
        setBlockedContactList(state, action) {
            state.userBlockedContactList = action.payload;
        },
        setAllUserContactList(state, action) {
            state.allUserContactList = action.payload;
        },
        setCurrentContact(state, action) {
            state.currentContact = action.payload;
        },
        toggleFavoriteStateCurrentContact(state) {
            state.currentContact.isFavorite = !state.currentContact.isFavorite;
            state.currentContact.isContact = !state.currentContact.isContact;
        },
        addToFavoriteList(state, action) {
            state.userFavoriteContactList.push(action.payload);
            state.userContactList = state.userContactList.filter(item => item !== action.payload);
        },
        removeFromFavoriteList(state, action) {
            state.userContactList.push(action.payload);
            state.userFavoriteContactList = state.userFavoriteContactList.filter(item => item !== action.payload);
        },
        addToContactList(state, action) {
            state.userContactList.push(action.payload);
            state.currentContact.isContact = true;
        },
        removeFromContactList(state, action) {
            state.userContactList = state.userContactList.filter(item => item !== action.payload);
            state.currentContact.isContact = false;
            state.currentContact.isFavorite = false;
        },
        addToBlockList(state, action) {
            state.userBlockedContactList.push(action.payload);
            state.currentContact.isBlocked = true;
        },
        removeFromBlockList(state, action) {
            state.userBlockedContactList = state.userBlockedContactList.filter(item => item !== action.payload);
            state.currentContact.isBlocked = false;
        },
    }
});

export default userSlice;
export const userAction = userSlice.actions;