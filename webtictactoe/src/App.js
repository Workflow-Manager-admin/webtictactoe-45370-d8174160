import React, { useState } from "react";
import "./App.css";

// PUBLIC_INTERFACE
function Square({ value, onClick, highlight }) {
  /** Minimal single TicTacToe cell (button) */
  return (
    <button
      className={`ttt-square${highlight ? " highlight" : ""}`}
      onClick={onClick}
      aria-label={value ? `Cell with ${value}` : "Empty cell"}
      tabIndex={0}
    >
      {value}
    </button>
  );
}

// PUBLIC_INTERFACE
function GameBoard({ squares, onSquareClick, winningLine }) {
  /** 3x3 grid. Pass highlight for winning squares. */
  function isHighlight(i) {
    return winningLine && winningLine.includes(i);
  }
  return (
    <div className="ttt-board">
      {Array.from({ length: 9 }).map((_, i) => (
        <Square
          key={i}
          value={squares[i]}
          onClick={() => onSquareClick(i)}
          highlight={isHighlight(i)}
        />
      ))}
    </div>
  );
}

// Determine winner or draw
function calculateWinner(squares) {
  // All win lines
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
    [0, 4, 8], [2, 4, 6],            // diagonals
  ];
  for (let line of lines) {
    const [a, b, c] = line;
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    )
      return { winner: squares[a], line };
  }
  if (squares.every(Boolean)) return { winner: null, line: null, isDraw: true };
  return null;
}

// PUBLIC_INTERFACE
function GameStatus({ xIsNext, winner, isDraw }) {
  // Header for game status
  let status = "";
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (isDraw) {
    status = "Draw!";
  } else {
    status = `Next: ${xIsNext ? "X" : "O"}`;
  }
  return (
    <header className="ttt-status">
      {status}
    </header>
  );
}

// PUBLIC_INTERFACE
function App() {
  // State: squares, player, winner
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const outcome = calculateWinner(squares);
  const winner = outcome?.winner;
  const winningLine = outcome?.line;
  const isDraw = outcome?.isDraw;

  // Handle move only if blank and game ongoing
  function handleSquareClick(i) {
    if (squares[i] || winner || isDraw) return;
    const next = squares.slice();
    next[i] = xIsNext ? "X" : "O";
    setSquares(next);
    setXIsNext((prev) => !prev);
  }

  // PUBLIC_INTERFACE
  function handleRestart() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  return (
    <div className="ttt-app">
      <div className="ttt-main">
        <GameStatus xIsNext={xIsNext} winner={winner} isDraw={isDraw} />
        <GameBoard
          squares={squares}
          onSquareClick={handleSquareClick}
          winningLine={winningLine}
        />
        {(winner || isDraw) && (
          <button className="ttt-restart-btn" onClick={handleRestart}>
            New Game
          </button>
        )}
      </div>
      <footer className="ttt-footer">
        <span className="ttt-brand">
          <span role="img" aria-label="tic-tac-toe" style={{ fontWeight: "bold" }}>
            ✖️🟡
          </span>{" "}
          WebTicTacToe
        </span>
      </footer>
    </div>
  );
}

export default App;