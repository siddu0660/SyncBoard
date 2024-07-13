import { createSlice } from "@reduxjs/toolkit";
import { database } from "../components/firebase";
import { ref, set } from "firebase/database";

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

export const updateUserProfile =
  (userData, uid) => async (dispatch, getState) => {
    try {
      const userRef = ref(database, "users/", uid);

      await set(userRef, userData);
      dispatch(setName(userData.name));
      dispatch(setUsername(userData.username));
      dispatch(setEmail(userData.email));
      dispatch(setGender(userData.gender));
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };

export const {
  setStatus,
  setUid,
  setName,
  setUsername,
  setEmail,
  setGender,
  setImage,
} = authSlice.actions;
export default authSlice.reducer;
