import { createSlice } from "@reduxjs/toolkit";
import socket from "../../socket";


const authSlice = createSlice({
    name: "auth",
    initialState: { isLoggedIn: false, user: null, usersLogged: [] },
    reducers: {
        login: (state, action) => {
            socket.emit("user login", {user: action.payload});
            state.isLoggedIn = true;
            state.user = action.payload;
        },
        logout: (state) => {
            socket.emit("user logout", {userId: state.user.id});
            state.isLoggedIn = false;
            state.user = null;
        },
        setUsersLogged: (state, action) => {
            state.usersLogged = action.payload;
        }
    }
});

export const { login, logout, setUsersLogged } = authSlice.actions;

export default authSlice.reducer;