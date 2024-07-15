import React, { useState, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import ModeToggle from "../components/themeButton";
import DarkLogo from "../assets/Dark_logo-removebg-preview.png";
import LightLogo from "../assets/Light_Logo-removebg-preview.png";
import SignIn from "../components/signIn";
import SignUp from "../components/signUp";

function Login({ setStatus }) {
  const [showSignIn, setShowSignIn] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showBackground, setShowBackground] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const dimension = showSignIn ? "w-96 h-96" : "w-80 h-80";
  const navigate = useNavigate();
  const controls = useAnimation();

  useLayoutEffect(() => {
    const isDark = document.body.classList.contains("dark");
    setIsDarkMode(isDark);

    const timer1 = setTimeout(() => setShowBackground(true), 0);
    const timer2 = setTimeout(() => setShowLogo(true), 1500);
    const timer3 = setTimeout(() => setShowLoginForm(true), 3000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const setToggle = () => {
    setShowSignIn(!showSignIn);
  };

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
    <div className="relative overflow-hidden w-screen h-screen">
      {showBackground && (
        <motion.div
          className={`absolute inset-0 ${
            isDarkMode
              ? "bg-[url('./assets/Dark_BG.png')]"
              : "bg-[url('./assets/Light_BG.png')]"
          } bg-cover`}
          initial={{ clipPath: "circle(0% at 0% 0%)" }}
          animate={{ clipPath: "circle(150% at 0% 0%)" }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      )}
      <motion.div
        className="absolute top-0 left-0 w-4 h-4 bg-yellow-400 rounded-full"
        initial={{ x: "-50%", y: "-50%" }}
        animate={controls}
        transition={{ duration: 1 }}
      />
      <AnimatePresence mode="wait">
        {showLogo && (
          <motion.div
            key={showSignIn ? "signin" : "signup"}
            className="transform -translate-x-1/2 -translate-y-1/2"
            initial={{ rotateY: 0 }}
            animate={{ rotateY: 360 }}
            transition={{ duration: 3, type: "spring" }}
          >
            <motion.img
              src={`${isDarkMode ? DarkLogo : LightLogo}`}
              alt="Logo"
              className={`${dimension} mx-auto bg-blend-multiply relative transform -translate-x-1/2 -translate-y-1/2`}
              initial={{ x: "0vh", y: "-100vh" , rotateY: 0}}
              animate={{ x: "0vh", y: "0vh" , rotateY: 360}}
              transition={{ duration: 2, type: "spring" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      {showLoginForm && (
        <>
          <motion.div
            className="absolute top-4 right-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <ModeToggle
              isDarkMode={isDarkMode}
              toggleDarkMode={toggleDarkMode}
            />
          </motion.div>
          <AnimatePresence mode="wait">
            <motion.div
              key={showSignIn ? "signin" : "signup"}
              className="mx-auto flex items-center"
              initial={{ opacity: 0, y: "100vh", width: "0" }}
              animate={{ opacity: 1, y: "0vh", width: "100%" }}
              exit={{ opacity: 0, y: "100vh", width: "0" }}
              transition={{ duration: 0.5 }}
            >
              <div
                className={`max-w-[20rem] mx-auto text-center p-4 rounded-3xl`}
              >
                {showSignIn ? (
                  <SignIn
                    isDarkMode={isDarkMode}
                    setStatus={setStatus}
                    navigate={navigate}
                    setShowSignIn={setToggle}
                  />
                ) : (
                  <SignUp
                    isDarkMode={isDarkMode}
                    setShowSignIn={setToggle}
                    setStatus={setStatus}
                    navigate={navigate}
                  />
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </>
      )}
    </div>
  );
}

export default Login;
