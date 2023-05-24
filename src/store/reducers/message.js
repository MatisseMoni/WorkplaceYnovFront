import { createSlice } from "@reduxjs/toolkit";
import socketIOClient from "socket.io-client";

const messageSlice = createSlice({
    name: "message",
    initialState: { threads: {} },
    reducers: {
        initMessages: (state, action) => {
            if (state.threads[action.payload.thread]) {
                state.threads[action.payload.thread] = action.payload.messages;
            }

            state.threads[action.payload.thread] = action.payload.messages;
        },
        sendMessage: (state, action) => {
            const ENDPOINT = "http://localhost:4001";
            const socket = socketIOClient(ENDPOINT);
            if (!state.threads[action.payload.thread]) {
                state.threads[action.payload.thread] = [];
            }
            state.threads[action.payload.thread].push(action.payload.message);
            socket.emit("send message", action.payload);
        },
        newMessage: (state, action) => {
            if (!state.threads[action.payload.thread]) {
                state.threads[action.payload.thread] = [];
            }
            state.threads[action.payload.thread].push(action.payload.message);
        },

    }
});

export const { initMessages, sendMessage, newMessage,  } = messageSlice.actions;

export default messageSlice.reducer;
