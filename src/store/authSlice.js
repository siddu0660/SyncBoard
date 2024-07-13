import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        status: false,
        uid: "",
        name: "",
        username: "",
        email: "",
        gender: "",
        image: "",
    },
    reducers: {
        setStatus: (state, action) => {
            state.status = action.payload;
        },
        setUid: (state, action) => {
            state.uid = action.payload;
        },
        setName: (state, action) => {
            state.name = action.payload;
        },
        setUsername: (state, action) => {
            state.username = action.payload;
        },
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        setGender: (state, action) => {
            state.gender = action.payload;
        },
        setImage: (state, action) => {
            state.image = action.payload;
        },
    },
});

export const { setStatus , setUid , setName , setUsername , setEmail , setGender , setImage } = authSlice.actions;
export default authSlice.reducer;
