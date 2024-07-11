import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        status: false,
    },
    reducers: {
        setStatus: (state, action) => {
        state.status = action.payload;
        },
    },
});

export const { setStatus } = authSlice.actions;
export default authSlice.reducer;
