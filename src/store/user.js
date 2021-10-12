import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {realtimeDatabaseUrl} from "../AditionalConstAndFunction/aditionalConstAndFunction";

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

export const refreshUserInfoFromServer = createAsyncThunk(
    'user/refreshUserInfoFromServer',
    async function (_,{dispatch, rejectWithValue}) {
        try {
            fetch(realtimeDatabaseUrl + 'users-info/' + localStorage.id + '.json')
                .then(res => {
                    if (!res.ok) {
                        throw new Error('Server error');
                    } else {
                        return res.json();
                    }
                })
                .then(data => {
                    dispatch(userAction.updateUserInfo(data));
                })
        } catch (error) {
            return rejectWithValue;
        }
    }
)

export const setImgUrlOnServer = createAsyncThunk(
    'userInfo/setImgUrlOnServer',
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
    userInformation: {
        id: localStorage.id,
        email: localStorage.email,
        name: localStorage.email,
        phone: null,
        dob: null,
        personalInfo: null,
        imgUrl: null,
    }
}
const userSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: {
        [updateUserInfoOnServer.rejected]: (state) => {
            state.status = 'server error';
        },
        [setImgUrlOnServer.rejected]: (state) => {
            state.status = 'server error';
        },
        [refreshUserInfoFromServer.rejected]: (state) => {
            state.status = 'server error';
        }
    },
    reducers: {
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