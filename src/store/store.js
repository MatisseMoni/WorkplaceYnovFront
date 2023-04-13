import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./reducers/user";
import authSlice from "./reducers/auth";
import groupeSlice from "./reducers/groupe";
import loadingSlice from "./reducers/loading";

export default configureStore({
    reducer: {
        user: userSlice,
        auth: authSlice,
        groupe: groupeSlice,
        loading: loadingSlice,
    }
});