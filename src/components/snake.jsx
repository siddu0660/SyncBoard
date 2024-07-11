import React, { useState, useEffect, useCallback } from "react";
import { NavLink, useLocation, useOutletContext } from "react-router-dom";

const GRID_SIZE = 18;
const CELL_SIZE = 18;
const INITIAL_SNAKE = [{ x: 9, y: 9 }];
const INITIAL_DIRECTION = { x: 1, y: 0 };
const INITIAL_FOOD = { x: 15, y: 15 };

function SnakeGame() {
  const { isDarkMode } = useOutletContext();
  const location = useLocation();
  const { gameName } = location.state || {
    gameName: "Snake Game",
  };

  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [food, setFood] = useState(INITIAL_FOOD);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const textColor = isDarkMode ? "text-gray-800" : "text-gray-100";
  const bgColor = isDarkMode ? "bg-gray-200" : "bg-gray-700";
  const gridColor = isDarkMode ? "border-gray-300" : "border-gray-600";
  const snakeColor = isDarkMode ? "bg-green-600" : "bg-green-400";
  const foodColor = isDarkMode ? "bg-red-600" : "bg-red-400";

  const moveSnake = useCallback(() => {
    if (gameOver) return;

    setSnake((prevSnake) => {
      const newHead = {
        x: (prevSnake[0].x + direction.x + GRID_SIZE) % GRID_SIZE,
        y: (prevSnake[0].y + direction.y + GRID_SIZE) % GRID_SIZE,
      };

      if (newHead.x === food.x && newHead.y === food.y) {
        setScore((prevScore) => prevScore + 1);
        setFood({
          x: Math.floor(Math.random() * GRID_SIZE),
          y: Math.floor(Math.random() * GRID_SIZE),
        });
        return [newHead, ...prevSnake];
      }

      if (
        prevSnake.some(
          (segment) => segment.x === newHead.x && segment.y === newHead.y
        )
      ) {
        setGameOver(true);
        return prevSnake;
      }

      return [newHead, ...prevSnake.slice(0, -1)];
    });
  }, [direction, food, gameOver]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      switch (e.key) {
        case "ArrowUp":
          setDirection({ x: 0, y: -1 });
          break;
        case "ArrowDown":
          setDirection({ x: 0, y: 1 });
          break;
        case "ArrowLeft":
          setDirection({ x: -1, y: 0 });
          break;
        case "ArrowRight":
          setDirection({ x: 1, y: 0 });
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    const gameLoop = setInterval(moveSnake, 100);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      clearInterval(gameLoop);
    };
  }, [moveSnake]);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood(INITIAL_FOOD);
    setGameOver(false);
    setScore(0);
  };

  const renderGrid = () => {
    const grid = [];
    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        const isSnake = snake.some(
          (segment) => segment.x === x && segment.y === y
        );
        const isFood = food.x === x && food.y === y;
        grid.push(
          <div
            key={`${x}-${y}`}
            className={`absolute ${gridColor} border ${
              isSnake ? snakeColor : ""
            } ${isFood ? foodColor : ""}`}
            style={{
              left: x * CELL_SIZE,
              top: y * CELL_SIZE,
              width: CELL_SIZE,
              height: CELL_SIZE,
            }}
          />
        );
      }
    }
    return grid;
  };

  return (
    <div className={`flex flex-col items-center ${textColor}`}>
      <h2 className="text-3xl font-bold mb-4">{gameName}</h2>
      <div
        className={`${bgColor} relative`}
        style={{
          width: GRID_SIZE * CELL_SIZE,
          height: GRID_SIZE * CELL_SIZE,
        }}
      >
        {renderGrid()}
      </div>
      <div className="text-xl my-4">Score: {score}</div>
      {gameOver && <div className="text-xl mb-4">Game Over!</div>}
      <button
        className={`px-4 py-2 ${bgColor} rounded ${textColor} hover:bg-gray-600`}
        onClick={resetGame}
      >
        {gameOver ? "Play Again" : "Reset Game"}
      </button>
      <NavLink to="/games">
        <button className="px-4 py-2 mt-4 bg-red-500 text-white rounded hover:bg-red-600">
          Back to Games
        </button>
      </NavLink>
    </div>
  );
}

export default SnakeGame;
