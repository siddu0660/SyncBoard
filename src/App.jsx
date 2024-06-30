import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Sidebar from "./components/sidebar";
import Chat from "./pages/Chat";
import Games from "./pages/Games";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Objectives from "./pages/Objectives";
import Profile from "./pages/Profile";
import Rooms from "./pages/Rooms";
import Settings from "./pages/Settings";
import Whiteboard from "./pages/Whiteboard";
import { FaSun, FaMoon } from "react-icons/fa";
import "./index.css";

function App() {
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div
      className={`flex h-screen ${
        isDarkMode
          ? "bg-[#ffefff] text-gray-800"
          : "bg-slate-600 text-white"
      }`}
    >
      <Sidebar isDarkMode={isDarkMode} />
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.key}>
            <Route path="/" element={<Home isDarkMode={isDarkMode} />} />
            <Route path="/chat" element={<Chat isDarkMode={isDarkMode} />} />
            <Route
              path="/whiteboard"
              element={<Whiteboard isDarkMode={isDarkMode} />}
            />
            <Route
              path="/objectives"
              element={<Objectives isDarkMode={isDarkMode} />}
            />
            <Route path="/games" element={<Games isDarkMode={isDarkMode} />} />
            <Route path="/rooms" element={<Rooms isDarkMode={isDarkMode} />} />
            <Route
              path="/profile"
              element={<Profile isDarkMode={isDarkMode} />}
            />
            <Route
              path="/settings"
              element={<Settings isDarkMode={isDarkMode} />}
            />
            <Route path="/auth" element={<Login isDarkMode={isDarkMode} />} />
            <Route path="*" element={<Error isDarkMode={isDarkMode} />} />
          </Routes>
        </AnimatePresence>
      <button
        onClick={toggleTheme}
        className={`absolute top-4 right-4 p-2 rounded-full ${
          isDarkMode
            ? "bg-gray-100 text-yellow-400"
            : "bg-[#3d403d] text-white"
        }`}
      >
        {isDarkMode ? <FaSun size={24} /> : <FaMoon size={24} />}
      </button>
    </div>
  );
}

export default App;
