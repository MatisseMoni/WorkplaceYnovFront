import { createSlice } from "@reduxjs/toolkit";
import socketIOClient from "socket.io-client";



const authSlice = createSlice({
    name: "auth",
    initialState: { isLoggedIn: false, user: null },
    reducers: {
        login: (state, action) => {
            const ENDPOINT = "http://127.0.0.1:4001";
            const socket = socketIOClient(ENDPOINT);
            console.log(action.payload.nickname);
            socket.emit("user login", {username: action.payload.nickname});
            socket.on("new login", (data) => {
                console.log(data);
            });
            state.isLoggedIn = true;
            state.user = action.payload;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.user = null;
        }
    }
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;