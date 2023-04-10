import { createSlice } from "@reduxjs/toolkit";

const groupeSlice = createSlice({
    name: "groupe",
    initialState: {groupes: [], groupesOwned: [], groupesMember: {}},
    reducers: {
        setGroupes: (state, action) => {
            state.groupes = action.payload;
        },
        setGroupesOwned: (state, action) => {
            state.groupesOwned = action.payload;
        },
        setGroupesMember: (state, action) => {
            state.groupesMember = action.payload;
        }
    }
});

export const { setGroupes, setGroupesOwned, setGroupesMember } = groupeSlice.actions;

export default groupeSlice.reducer;