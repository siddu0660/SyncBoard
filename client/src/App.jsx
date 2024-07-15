import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme , setIntroDone } from "./store/themeSlice";
import { setStatus } from "./store/authSlice";
import Sidebar from "./components/sidebar";
import Content from "./components/content";
import Chat from "./pages/Chat";
import Games from "./pages/Games";
import Sudoku from "./components/sudoku";
import SnakeGame from "./components/snake";
import TicTacToe from "./components/tictactoe";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Objectives from "./pages/Objectives";
import Profile from "./pages/Profile";
import Rooms from "./pages/Rooms";
import Settings from "./pages/Settings";
import Whiteboard from "./pages/Whiteboard";
import AnimatedText from "./components/animatedText";
import { FaSun, FaMoon } from "react-icons/fa";
import "./index.css";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const uid = useSelector((state) => state.auth.uid);
  const introDone = useSelector((state) => state.theme.isIntroDone);
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const status = useSelector((state) => state.auth.status);

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  const handleSetStatus = (newStatus) => {
    dispatch(setStatus(newStatus));
  };

  const handleTextComplete = async () => {
    dispatch(setIntroDone());
  };

  return (
    <div className="select-none">
      {!introDone && <AnimatedText onComplete={handleTextComplete} client:load />}
      {!status && introDone && <Login setStatus={handleSetStatus} />}
      {status && (
        <div
          className={`flex h-screen ${
            isDarkMode
              ? "bg-[url('./assets/Dark_BG.png')] text-[#ffffff]"
              : "bg-[url('./assets/Light_BG.png')] text-gray-800"
          }`}
        >
          <Sidebar isDarkMode={isDarkMode} setStatus={handleSetStatus} />
          <Content isDarkMode={isDarkMode}>
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.key}>
                <Route path="/" element={<Home isDarkMode={isDarkMode} />} />
                <Route
                  path="/chat"
                  element={<Chat isDarkMode={isDarkMode} />}
                />
                <Route
                  path="/whiteboard"
                  element={<Whiteboard isDarkMode={isDarkMode} />}
                />
                <Route
                  path="/objectives"
                  element={<Objectives isDarkMode={isDarkMode} />}
                />
                <Route
                  path="/games"
                  element={<Games isDarkMode={isDarkMode} />}
                >
                  <Route path="tictactoe" element={<TicTacToe />} />
                  <Route path="snake" element={<SnakeGame />} />
                  <Route path="sudoku" element={<Sudoku />} />
                </Route>
                <Route
                  path="/rooms"
                  element={<Rooms isDarkMode={isDarkMode} />}
                />
                <Route
                  path="/profile"
                  element={<Profile isDarkMode={isDarkMode} />}
                />
                <Route
                  path="/settings"
                  element={<Settings isDarkMode={isDarkMode} />}
                />
                <Route
                  path="/auth"
                  element={<Login isDarkMode={isDarkMode}/>}
                />
                <Route path="*" element={<Error isDarkMode={isDarkMode} />} />
              </Routes>
            </AnimatePresence>
          </Content>
          <button
            onClick={handleToggleTheme}
            className={`absolute top-4 right-4 p-2 rounded-full ${
              isDarkMode
                ? "bg-gray-100 text-yellow-900"
                : "bg-[#3d403d] text-white"
            }`}
          >
            {isDarkMode ? <FaSun size={24} /> : <FaMoon size={24} />}
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
