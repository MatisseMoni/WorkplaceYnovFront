import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./reducers/user";
import authSlice from "./reducers/auth";
import groupeSlice from "./reducers/groupe";

export default configureStore({
    reducer: {
        user: userSlice,
        auth: authSlice,
        groupe: groupeSlice
    }
});