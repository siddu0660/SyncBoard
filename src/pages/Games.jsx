import React from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import Card from "../components/card";
import tictactoe from "../assets/Tic_tac_toe.png";
import snake from "../assets/snake-removebg-preview.png";
import sudoku from "../assets/sudoku.png";

function Games({ isDarkMode }) {
  const location = useLocation();
  const textColor = isDarkMode ? "text-gray-800" : "text-gray-100";
  const isGameActive = location.pathname !== "/games";

  return (
    <div className="p-4">
      <h1 className={`text-center text-3xl font-bold mx-auto ${textColor}`}>
        Games
      </h1>
      <div className="flex flex-row justify-around my-12 ">
        {!isGameActive ? (
          <nav className="flex flex-row">
            <NavLink to="/games/tictactoe">
              <Card
                isDarkMode={isDarkMode}
                image={tictactoe}
                title="Tic Tac Toe"
              />
            </NavLink>
            <NavLink to="/games/snake">
              <Card isDarkMode={isDarkMode} image={snake} title="Snake Game" />
            </NavLink>
            <NavLink to="/games/sudoku">
              <Card isDarkMode={isDarkMode} image={sudoku} title="Sudoku" />
            </NavLink>
          </nav>
        ) : (
          <Outlet context={{ isDarkMode }} />
        )}
      </div>
    </div>
  );
}

export default Games;
