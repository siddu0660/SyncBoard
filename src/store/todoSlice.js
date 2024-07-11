import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    list: [],
    searchTerm: "",
  },
  reducers: {
    addTodo: (state, action) => {
      state.list.push(action.payload);
    },
    toggleTodo: (state, action) => {
      const todo = state.list.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed =   !todo.completed;
      }
    },
    deleteTodo: (state, action) => {
      state.list = state.list.filter((todo) => todo.id !== action.payload);
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
});

export const { addTodo, toggleTodo, deleteTodo, setSearchTerm } =
  todoSlice.actions;
export default todoSlice.reducer;
