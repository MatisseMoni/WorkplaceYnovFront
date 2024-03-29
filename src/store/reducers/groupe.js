import { createSlice } from "@reduxjs/toolkit";
import socket from "../../socket";

const groupeSlice = createSlice({
    name: "groupe",
    initialState: {groupes: []},
    reducers: {
        setGroupes: (state, action) => {
            const { groupes, user } = action.payload;
            groupes.forEach((groupe) => {
                groupe.isMember = user ? user.subscribedGroups.includes(groupe["@id"]) : false;
                groupe.isOwner = user ? user.ownedGroups.includes(groupe["@id"]) : false;
            });
            state.groupes = groupes;
        },
        sendGroupe: (state, action) => {
            socket.emit("send group", action.payload);
        },
        newGroupe: (state, action) => {
            const { groupe, user } = action.payload;
            groupe.isMember = user ? user.subscribedGroups.includes(groupe["@id"]) : false;
            groupe.isOwner = user ? user.ownedGroups.includes(groupe["@id"]) : false;
            state.groupes.push(groupe);
        },
        removeGroupe: (state, action) => {
            socket.emit("remove group", action.payload);
        },
        deleteGroupe: (state, action) => {
            state.groupes = state.groupes.filter((g) => g['@id'] !== `/api/groups/${action.payload}`);
        }
    }
});

export const { setGroupes, sendGroupe, newGroupe, removeGroupe, deleteGroupe } = groupeSlice.actions;

export default groupeSlice.reducer;