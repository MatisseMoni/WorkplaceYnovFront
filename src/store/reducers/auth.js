import { createSlice } from "@reduxjs/toolkit";
import socketIOClient from "socket.io-client";



const authSlice = createSlice({
    name: "auth",
    initialState: { isLoggedIn: false, user: null, usersLogged: [] },
    reducers: {
        login: (state, action) => {
            const ENDPOINT = "http://127.0.0.1:4001";
            const socket = socketIOClient(ENDPOINT);
            socket.emit("user login", {username: action.payload.nickname});

            state.isLoggedIn = true;
            state.user = action.payload;
        },
        logout: (state) => {
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