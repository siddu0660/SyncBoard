import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
    name: "theme",
    initialState: {
        isDarkMode: false,
        isIntroDone: false,
        isLoading:false,
    },
    reducers: {
        toggleTheme: (state) => {
        state.isDarkMode = !state.isDarkMode;
        },
        setIntroDone: (state) => {
        state.isIntroDone = true;
        },
        setLoader: (state) => {
            state.isLoading = !(state.isLoading);
        },
    },
});

export const { toggleTheme , setIntroDone , setLoader } = themeSlice.actions;
export default themeSlice.reducer;
