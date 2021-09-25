import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    userInformation: {
        id: localStorage.id,
        email: null,
        fullName: null,
        phone: null,
        dob: null,
    },
    currentContact: {
        name: 'User info',
        email: null,
        isFavorite: false,
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
            state.userFavoriteContactList = state.userFavoriteContactList.push(action.payload);
        },
        removeFromFavoriteList(state, action) {
            // state.userFavoriteContactList = state.userFavoriteContactList.filter(item => item.id !== action.payload)
        },
        addToBlockList(state, action) {
            state.userBlockedContactList = state.userBlockedContactList.push(action.payload);
        },
        removeFromBlockList(state, action) {

        },
    }
});

export default userSlice;
export const userAction = userSlice.actions;