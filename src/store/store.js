import {configureStore} from "@reduxjs/toolkit";

import uiSlice from "./ui";
import authSlice from "./auth";
import userSlice from "./user";
import messageSlice from "./messages";
import contactsSlice from "./contacts";

const store = configureStore({
    reducer: {
        ui: uiSlice.reducer,
        auth: authSlice.reducer,
        user: userSlice.reducer,
        contacts: contactsSlice.reducer,
        message: messageSlice.reducer,
    }
})

export default store;