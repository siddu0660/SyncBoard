import React from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const ModeToggle = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <button
      onClick={toggleDarkMode}
      className={`absolute top-4 right-4 p-2 rounded-full transition-colors duration-300 ease-in-out ${
        isDarkMode ? "bg-gray-100 text-yellow-400" : "bg-[#3d403d] text-white"
      }`}
    >
      {isDarkMode ? <FaSun size={24} /> : <FaMoon size={24} />}
    </button>
  );
};

export default ModeToggle;
