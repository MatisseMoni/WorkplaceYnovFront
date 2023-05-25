import { createSlice } from "@reduxjs/toolkit";
import socketIOClient from "socket.io-client";

const threadSlice = createSlice({
    name: "thread",
    initialState: { groups: {} },
    reducers: {
        initThreads: (state, action) => {
            state.groups = action.payload.reduce((acc, item) => {
                // Assurez-vous que item.relatedGroup est une chaîne
                if (typeof item.relatedGroup === 'string') {
                    const parts = item.relatedGroup.split('/');
                    if (parts.length > 3) {
                        const id = parts[3];
                        if (!acc[id]) {
                            acc[id] = [];
                        }
                        acc[id].push(item);
                    }
                }
                return acc;
            }, {});
        },
        sendThread: (state, action) => {
            const ENDPOINT = "http://localhost:4001";
            const socket = socketIOClient(ENDPOINT);
            socket.emit("send thread", action.payload);
        },
        newThread: (state, action) => {
            const {group, thread} = action.payload;
            if (!state.groups[group]) {
                state.groups[group] = [];
            }
            state.groups[group].push(thread);
        },
    }
});

export const { initThreads, sendThread, newThread,  } = threadSlice.actions;

export default threadSlice.reducer;
