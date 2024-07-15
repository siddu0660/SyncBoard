import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
    name: "theme",
    initialState: {
        isDarkMode: false,
        isIntroDone: false,
    },
    reducers: {
        toggleTheme: (state) => {
        state.isDarkMode = !state.isDarkMode;
        },
        setIntroDone: (state) => {
        state.isIntroDone = true;
        },
    },
});

export const { toggleTheme , setIntroDone} = themeSlice.actions;
export default themeSlice.reducer;
