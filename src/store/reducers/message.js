import { createSlice } from "@reduxjs/toolkit";
import socket from "../../socket";

const messageSlice = createSlice({
    name: "message",
    initialState: { threads: {} },
    reducers: {
        initMessages: (state, action) => {
            state.threads[action.payload.thread] = action.payload.messages;
        },
        sendMessage: (state, action) => {
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
