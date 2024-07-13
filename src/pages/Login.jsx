import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ModeToggle from "../components/themeButton";
import DarkLogo from "../assets/Dark_logo-removebg-preview.png";
import LightLogo from "../assets/Light_Logo-removebg-preview.png";
import SignIn from "../components/signIn";
import SignUp from "../components/signUp";

function Login({ setStatus}) {
  const [showSignIn, setShowSignIn] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const dimension = showSignIn ? "w-96 h-96" : "w-80 h-80";
  const navigate = useNavigate();

  useEffect(() => {
    const isDark = document.body.classList.contains("dark");
    setIsDarkMode(isDark);
  }, []);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.body.classList.add("transition-delay");
      document.body.classList.remove("dark");
      document.body.classList.remove("transition-delay");
      setIsDarkMode(false);
    } else {
      setIsDarkMode(true);
      document.body.classList.add("dark");
    }
  };

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen 
      transition-colors duration-300 ease-in-out
      ${
        isDarkMode
          ? "bg-[url('./assets/Dark_BG.png')]"
          : "bg-[url('./assets/Light_BG.png')]"
      }`}
    >
      <div className="absolute top-4 right-4">
        <ModeToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      </div>
      <img
        src={`${isDarkMode ? DarkLogo : LightLogo}`}
        alt="Logo"
        className={`${dimension} mx-auto bg-blend-multiply`}
      />
      {showSignIn ? (
        <SignIn
          isDarkMode={isDarkMode}
          setStatus={setStatus}
          navigate={navigate}
          setShowSignIn={setShowSignIn}
        />
      ) : (
        <SignUp
          isDarkMode={isDarkMode}
          setShowSignIn={setShowSignIn}
          setStatus={setStatus}
          navigate={navigate}
        />
      )}
    </div>
  );
}

export default Login;
