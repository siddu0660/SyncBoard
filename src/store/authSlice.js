import { createSlice } from "@reduxjs/toolkit";
import { ref, set , get} from "firebase/database";
import { database} from "../components/firebase";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: false,
    uid: "",
    name: "",
    username: "",
    email: "",
    gender: "",
    image: "1",
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
    setUserProfile: (state, action) => {
      const { name, username, email, gender, image } = action.payload;
      state.name = name;
      state.username = username;
      state.email = email;
      state.gender = gender;
      state.image = image;
    },
  },
});

export const fetchUserProfile = (uid) => async (dispatch) => {
  try {
    const userRef = ref(database, "users/" + uid );
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      const userData = snapshot.val();
      dispatch(setUserProfile(userData));
    } else {
      console.log("No user data available.");
    }
  } catch (error) {
    console.error("Error fetching user profile:", error);
  }
};

export const updateUserProfile = (userData, uid) => async (dispatch) => {
  try {
    const userRef = ref(database, "users/" + uid);

    await set(userRef, userData);
    dispatch(setImage(userData.image));
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
  setUserProfile,
} = authSlice.actions;
export default authSlice.reducer;
