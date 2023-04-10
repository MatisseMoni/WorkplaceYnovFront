import { createSlice } from "@reduxjs/toolkit";

const groupeSlice = createSlice({
    name: "groupe",
    initialState: {groupes: []},
    reducers: {
        setGroupes: (state, action) => {
            state.groupes = action.payload;
        }
    }
});

export const { setGroupes } = groupeSlice.actions;

export default groupeSlice.reducer;