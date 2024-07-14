import React, { useState } from "react";
import {auth , database} from "./firebase"
import {createUserWithEmailAndPassword , onAuthStateChanged} from "firebase/auth"
import { ref, set } from "firebase/database";

function SignUp({ isDarkMode, navigate , setShowSignIn }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            unsubscribe();
            resolve(user);
          }
        });
      });

      const currentUser = auth.currentUser;

      if (currentUser) {
        await set(ref(database, "users/" + currentUser.uid), {
          name: name,
          username: username,
          email: email,
          gender: gender,
        });
        alert("User created successfully");
        setShowSignIn(true);
      } else {
        throw new Error("User not found after authentication");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      id="signUp"
      className="flex flex-col space-y-4"
    >
      <label className="relative flex-1 group">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className={`w-full px-4 pt-6 pb-2 outline-none border rounded-lg text-base
          transition-colors duration-300 ease-in-out
          ${
            !isDarkMode
              ? "bg-[#333] text-white border-[rgba(105,105,105,0.397)]"
              : "bg-white text-black border-gray-300"
          }
          focus:border-[#00bfff] focus:border-2 focus:ring-2`}
          placeholder=" "
        />
        <span
          className={`absolute left-4 top-1 transition-colors duration-300 ease-in-out
          ${!isDarkMode ? "text-[rgba(255,255,255,0.5)]" : "text-gray-500"}`}
        >
          Name
        </span>
      </label>
      <label className="relative flex-1 group">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className={`w-full px-4 pt-6 pb-2 outline-none border rounded-lg text-base
          transition-colors duration-300 ease-in-out
          ${
            !isDarkMode
              ? "bg-[#333] text-white border-[rgba(105,105,105,0.397)]"
              : "bg-white text-black border-gray-300"
          }
          focus:border-[#00bfff] focus:border-2 focus:ring-2`}
          placeholder=" "
        />
        <span
          className={`absolute left-4 top-1 transition-colors duration-300 ease-in-out
          ${!isDarkMode ? "text-[rgba(255,255,255,0.5)]" : "text-gray-500"}`}
        >
          Username
        </span>
      </label>
      <label className="relative flex-1 group">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={`w-full px-4 pt-6 pb-2 outline-none border rounded-lg text-base
          transition-colors duration-300 ease-in-out
          ${
            !isDarkMode
              ? "bg-[#333] text-white border-[rgba(105,105,105,0.397)]"
              : "bg-white text-black border-gray-300"
          }
          focus:border-[#00bfff] focus:border-2 focus:ring-2`}
          placeholder=" "
        />
        <span
          className={`absolute left-4 top-1 transition-colors duration-300 ease-in-out
          ${!isDarkMode ? "text-[rgba(255,255,255,0.5)]" : "text-gray-500"}`}
        >
          Email
        </span>
      </label>
      <label className="relative flex-1">
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className={`w-full px-4 pt-6 pb-2 outline-none border rounded-lg text-base
          transition-colors duration-300 ease-in-out
          ${
            !isDarkMode
              ? "bg-[#333] text-white border-[rgba(105,105,105,0.397)]"
              : "bg-white text-black border-gray-300"
          }
          focus:border-[#00bfff] focus:border-2 focus:ring-2`}
          placeholder=" "
        />
        <span
          className={`absolute left-4 top-1 transition-colors duration-300 ease-in-out
          ${!isDarkMode ? "text-[rgba(255,255,255,0.5)]" : "text-gray-500"}`}
        >
          Password
        </span>
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className={`absolute right-4 top-1/2 transform -translate-y-1/2
          transition-colors duration-300 ease-in-out
          ${!isDarkMode ? "text-[#00bfff]" : "text-gray-500"}`}
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </label>
      <label className="relative flex-1 group">
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          required
          className={`w-full px-4 pt-6 pb-2 outline-none border rounded-lg text-base
          transition-colors duration-300 ease-in-out
          ${
            !isDarkMode
              ? "bg-[#333] text-white border-[rgba(105,105,105,0.397)]"
              : "bg-white text-black border-gray-300"
          }
          focus:border-[#00bfff] focus:border-2 focus:ring-2`}
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <span
          className={`absolute left-4 top-1 transition-colors duration-300 ease-in-out
          ${!isDarkMode ? "text-[rgba(255,255,255,0.5)]" : "text-gray-500"}`}
        >
          Gender
        </span>
      </label>
      <button
        type="submit"
        className="bg-[#00bfff] text-white py-2 px-4 rounded-lg transition-colors duration-300 ease-in-out hover:bg-[#0095cc]"
      >
        Sign Up
      </button>
      <button
        onClick={() => setShowSignIn(true)}
        className={`mt-4 hover:underline ${isDarkMode ? "text-white" : "text-black"}`}
      >
        Already have an account? Sign In
      </button>
    </form>
  );
}

export default SignUp;
