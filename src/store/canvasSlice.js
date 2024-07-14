import { createSlice } from "@reduxjs/toolkit";

const canvasSlice = createSlice({
    name: "canvas",
    initialState: {
        lines:[
            { tool: "pen", color: "#000000", points: [0, 0] },
        ],
    },
    reducers: {
        setLines: (state, action) => {
            state.lines = action.payload;
        },
    },
})

export const { setLines } = canvasSlice.actions;
export default canvasSlice.reducer;