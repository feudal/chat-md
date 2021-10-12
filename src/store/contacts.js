import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {
    findKeyWithEmailFromData,
    realtimeDatabaseUrl
} from "../AditionalConstAndFunction/aditionalConstAndFunction";

const fetchUrl = realtimeDatabaseUrl + '/contacts-of-the-users/' + localStorage.id + '/contacts.json'

export const removeFromFavorite = createAsyncThunk(
    'contacts/removeFromFavorite',
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
                        dispatch(contactsAction.removeFromFavoriteList(email));
                        dispatch(contactsAction.toggleFavoriteStateCurrentContact());
                    }
                    return response.json()
                })
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

export const addToFavorite = createAsyncThunk(
    'contacts/addToFavorite',
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
                        dispatch(contactsAction.addToFavoriteList(email));
                        dispatch(contactsAction.toggleFavoriteStateCurrentContact());
                    }
                    return response.json()
                })

        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

export const addToContact = createAsyncThunk(
    'contacts/addToContact',
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
                        dispatch(contactsAction.addToContactList(email));
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
    'contacts/removeFromContact',
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
                        dispatch(contactsAction.removeFromFavoriteList(email));
                        dispatch(contactsAction.removeFromContactList(email));
                    }
                    return response.json()
                })
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

export const blockContact = createAsyncThunk(
    'contacts/blockContact',
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
                        dispatch(contactsAction.addToBlockList(email));
                        dispatch(contactsAction.removeFromFavoriteList(email));
                        dispatch(contactsAction.removeFromContactList(email));
                    }
                    return response.json()
                })

        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

export const unblockContact = createAsyncThunk(
    'contacts/unblockContact',
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
                        dispatch(contactsAction.removeFromBlockList(email));
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

const contactsSlice = createSlice({
    name: 'contacts',
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
        },
        [blockContact.rejected]: (state) => {
            state.status = 'server error';
        },
        [unblockContact.rejected]: (state) => {
            state.status = 'server error';
        },
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

export default contactsSlice;
export const contactsAction = contactsSlice.actions;