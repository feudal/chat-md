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

const formatEmail = (email) => {
    if (email) {
        email = email.replace(/\./g, '-')
        email = email.replace('@', '-aron-')
        return email;
    }
}

const findSecondFragment = (data, email) => {
    let secondFragmentUrl;
    for (const key in data) for (const key2 in data[key]) {
        if (key2.includes(formatEmail(email)) && key2.includes(formatEmail(localStorage.email))) {
            secondFragmentUrl = '/' + key + '/' + key2 + '.json';
        }
    }
    return secondFragmentUrl;
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

export const initiateMessaging = createAsyncThunk(
    'user/initiateMessaging',
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

export const updateUserInfoOnServer = createAsyncThunk(
    'user/updateUserOnServer',
    async function (userInfo, {dispatch, rejectWithValue}) {
        try {
            fetch(realtimeDatabaseUrl + 'users-info/' + localStorage.id + '.json', {
                method: 'PATCH',
                body: JSON.stringify({
                        dob: userInfo.dob,
                        name: userInfo.name,
                        phone: userInfo.phone,
                        personalInfo: userInfo.personalInfo,
                    }
                )
            }).then(response => {
                if (!response.ok) {
                    throw new Error('Server error');
                } else {
                    dispatch(userAction.updateUserInfo({
                        dob: userInfo.dob,
                        name: userInfo.name,
                        phone: userInfo.phone,
                        personalInfo: userInfo.personalInfo,
                    }))
                }
            })
        } catch (error) {
            return rejectWithValue;
        }
    }
)
export const setImgUrlOnServer = createAsyncThunk(
    'user/setImgUrlOnServer',
    async function (url, {dispatch, rejectWithValue}) {
        try {
            fetch(realtimeDatabaseUrl + 'users-info/' + localStorage.id + '.json', {
                method: 'PATCH',
                body: JSON.stringify({
                    imgUrl: url,
                })
            }).then(res => {
                if (!res.ok) {
                    throw new Error('Server error');
                } else {
                    dispatch(userAction.setImgUrl(url));
                }
            })
        } catch (error) {
            return rejectWithValue(error);
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
        personalInfo: null,
        imgUrl: null,
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
        },
        [blockContact.rejected]: (state) => {
            state.status = 'server error';
        },
        [unblockContact.rejected]: (state) => {
            state.status = 'server error';
        },
        [updateUserInfoOnServer.rejected]: (state) => {
            state.status = 'server error';
        },
        [setImgUrlOnServer.rejected]: (state) => {
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
        updateUserInfo(state, action) {
            state.userInformation.name = action.payload.name;
            state.userInformation.phone = action.payload.phone;
            state.userInformation.dob = action.payload.dob;
            state.userInformation.personalInfo = action.payload.personalInfo;
        },
        setImgUrl(state, action) {
            state.userInformation.imgUrl = action.payload;
        }

    }
});

export default userSlice;
export const userAction = userSlice.actions;