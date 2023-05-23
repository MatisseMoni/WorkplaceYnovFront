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
            console.log("sendMessage", action.payload);
            console.log("state.threads", state.threads[action.payload.thread]);
            if (!state.threads[action.payload.thread]) {
                state.threads[action.payload.thread] = [];
            }
            state.threads[action.payload.thread].push(action.payload.message);
        },
        newMessage: (state, action) => {
            if (!state.threads[action.payload.thread]) {
                state.threads[action.payload.thread] = [];
            }
            state.threads[action.payload.thread].push(action.payload);
        },
    }
});

export const { initMessages, sendMessage, newMessage,  } = messageSlice.actions;

export default messageSlice.reducer;
