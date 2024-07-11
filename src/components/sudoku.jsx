import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useOutletContext } from "react-router-dom";

const GRID_SIZE = 9;
const BOX_SIZE = 3;

function Sudoku() {
  const {isDarkMode} = useOutletContext();
  const location = useLocation();
  const { gameName } = location.state || {
    gameName: "Sudoku",
  };

  const [board, setBoard] = useState(
    Array(GRID_SIZE)
      .fill()
      .map(() => Array(GRID_SIZE).fill(0))
  );
  const [initialBoard, setInitialBoard] = useState([]);
  const [selectedCell, setSelectedCell] = useState(null);
  const [isComplete, setIsComplete] = useState(false);

  const textColor = isDarkMode ? "text-gray-800" : "text-gray-100";
  const bgColor = isDarkMode ? "bg-gray-200" : "bg-gray-700";
  const cellBgColor = isDarkMode ? "bg-slate-300" : "bg-gray-600";
  const selectedCellColor = isDarkMode ? "bg-blue-200" : "bg-blue-700";
  const initialCellColor = isDarkMode ? "text-gray-700" : "text-gray-300";
  const inputCellColor = isDarkMode ? "text-blue-600" : "text-blue-300";

  useEffect(() => {
    generateNewGame();
  }, []);

  const generateNewGame = () => {
    const newBoard = generateSudoku();
    setBoard(newBoard);
    setInitialBoard(newBoard.map((row) => [...row]));
    setIsComplete(false);
  };

  const generateSudoku = () => {
    const board = Array(GRID_SIZE)
      .fill()
      .map(() => Array(GRID_SIZE).fill(0));

    for (let i = 0; i < 20; i++) {
      let row = Math.floor(Math.random() * GRID_SIZE);
      let col = Math.floor(Math.random() * GRID_SIZE);
      let num = Math.floor(Math.random() * 9) + 1;
      if (isValid(board, row, col, num)) {
        board[row][col] = num;
      }
    }

    return board;
  };

  const isValid = (board, row, col, num) => {
    for (let x = 0; x < GRID_SIZE; x++) {
      if (board[row][x] === num || board[x][col] === num) {
        return false;
      }
    }

    let boxRow = Math.floor(row / BOX_SIZE) * BOX_SIZE;
    let boxCol = Math.floor(col / BOX_SIZE) * BOX_SIZE;
    for (let i = 0; i < BOX_SIZE; i++) {
      for (let j = 0; j < BOX_SIZE; j++) {
        if (board[boxRow + i][boxCol + j] === num) {
          return false;
        }
      }
    }

    return true;
  };

  const handleCellClick = (row, col) => {
    if (initialBoard[row][col] === 0) {
      setSelectedCell({ row, col });
    }
  };

  const handleKeyPress = (e) => {
    if (selectedCell && /^[1-9]$/.test(e.key)) {
      const newBoard = board.map((row) => [...row]);
      newBoard[selectedCell.row][selectedCell.col] = parseInt(e.key);
      setBoard(newBoard);
      checkCompletion(newBoard);
    }
  };

  const checkCompletion = (board) => {
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        if (board[i][j] === 0 || !isValid(board, i, j, board[i][j])) {
          return;
        }
      }
    }
    setIsComplete(true);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [selectedCell]);

  return (
    <div className={`flex flex-col items-center ${textColor}`}>
      <h2 className="text-3xl font-bold mb-4">{gameName}</h2>
      <div className={`grid grid-cols-9 gap-0 ${bgColor} p-2`}>
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`w-8 h-8 flex items-center justify-center cursor-pointer border-white border-[1px]
                                ${cellBgColor} 
                                ${
                                  selectedCell &&
                                  selectedCell.row === rowIndex &&
                                  selectedCell.col === colIndex
                                    ? selectedCellColor
                                    : ""
                                }
                                `}
              onClick={() => handleCellClick(rowIndex, colIndex)}
            >
              {cell !== 0 && (
                <span
                  className={
                    initialBoard[rowIndex][colIndex] !== 0
                      ? initialCellColor
                      : inputCellColor
                  }
                >
                  {cell}
                </span>
              )}
            </div>
          ))
        )}
      </div>
      {isComplete && (
        <div className="text-xl my-4">
          Congratulations! You solved the puzzle!
        </div>
      )}
      <button
        className={`px-4 py-2 mt-4 ${bgColor} rounded ${textColor} hover:bg-gray-600`}
        onClick={generateNewGame}
      >
        New Game
      </button>
      <NavLink to="/games">
        <button className="px-4 py-2 mt-4 bg-red-500 text-white rounded hover:bg-red-600">
          Back to Games
        </button>
      </NavLink>
    </div>
  );
}

export default Sudoku;
