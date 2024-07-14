import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useOutletContext } from "react-router-dom";

function TicTacToe() {
    const { isDarkMode } = useOutletContext();
    const location = useLocation();
    const { gameName } = location.state || {
        gameName: "Tic Tac Toe",
    };
    const [board, setBoard] = useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);
    const [winner, setWinner] = useState(null);

    const textColor = isDarkMode ? "text-gray-800" : "text-gray-100";
    const bgColor = isDarkMode ? "bg-gray-200" : "bg-gray-700";

    useEffect(() => {
        const calculatedWinner = calculateWinner(board);
        if (calculatedWinner) {
        setWinner(calculatedWinner);
        } else if (board.every((square) => square !== null)) {
        setWinner("Draw");
        }
    }, [board]);

    const handleClick = (i) => {
        if (winner || board[i]) return;
        const newBoard = board.slice();
        newBoard[i] = xIsNext ? "X" : "O";
        setBoard(newBoard);
        setXIsNext(!xIsNext);
    };

    const renderSquare = (i) => (
        <button
        key={i}
        className={`w-20 h-20 ${bgColor} border border-gray-400 text-4xl font-bold ${textColor} focus:outline-none`}
        onClick={() => handleClick(i)}
        >
        {board[i]}
        </button>
    );

    const renderStatus = () => {
        if (winner === "Draw") {
        return "It's a draw!";
        } else if (winner) {
        return `Winner: ${winner}`;
        } else {
            {console.log(isDarkMode)}
        return `Next player: ${xIsNext ? "X" : "O"}`;
        }
    };

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setXIsNext(true);
        setWinner(null);
    };

    return (
        <div className={`flex flex-col items-center ${textColor}`}>
        <h2 className="text-3xl font-bold mb-4">{gameName}</h2>
        <div className="mb-4">
            {[0, 1, 2].map((row) => (
            <div key={row} className="flex">
                {[0, 1, 2].map((col) => renderSquare(row * 3 + col))}
            </div>
            ))}
        </div>
        <div className="text-xl mb-4">{renderStatus()}</div>
        <button
            className={`px-4 py-2 ${bgColor} rounded ${textColor} hover:bg-gray-600`}
            onClick={resetGame}
        >
            Reset Game
        </button>
        <NavLink to="/games">
            <button
            className="px-4 py-2 mt-4 bg-red-500 text-white rounded hover:bg-red-600"
        >
            Back to Games !!!!
        </button>
        </NavLink>
        </div>
    );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default TicTacToe;
