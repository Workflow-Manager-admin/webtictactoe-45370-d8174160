import React, { useState } from 'react';
import './App.css';
import './ttt.css';

// PUBLIC_INTERFACE
function App() {
  // Game state: 9 squares, each can be 'X', 'O', or null.
  const [squares, setSquares] = useState(Array(9).fill(null));
  // X always starts
  const [xIsNext, setXIsNext] = useState(true);
  // Is the game over?
  const winner = calculateWinner(squares);
  // Determine if draw (no winner and all squares filled)
  const isDraw = !winner && squares.every(Boolean);

  // PUBLIC_INTERFACE
  function handleSquareClick(idx) {
    if (squares[idx] || winner) return; // No action if filled or finished
    const nextSquares = squares.slice();
    nextSquares[idx] = xIsNext ? 'X' : 'O';
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  // PUBLIC_INTERFACE
  function handleRestart() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  // PUBLIC_INTERFACE
  function renderStatus() {
    if (winner) {
      return (
        <span style={{ color: 'var(--ttt-primary)' }}>
          Winner: <b>{winner === 'Draw' ? 'None (Draw)' : winner}</b>
        </span>
      );
    }
    if (isDraw) {
      return <span style={{ color: 'var(--ttt-accent)' }}><b>Draw!</b></span>;
    }
    return (
      <span>
        Next turn:{" "}
        <span style={{ color: xIsNext ? 'var(--ttt-primary)' : 'var(--ttt-secondary)', fontWeight: 600 }}>
          {xIsNext ? 'X' : 'O'}
        </span>
      </span>
    );
  }

  return (
    <div className="ttt-app">
      <header className="ttt-header">
        <span role="img" aria-label="tic-tac-toe" className="ttt-logo">⭕❌</span>
        <h1 className="ttt-title">WebTicTacToe</h1>
      </header>
      <main className="ttt-main">
        <div className="ttt-status">
          {renderStatus()}
        </div>
        <div className="ttt-board">
          {squares.map((val, idx) => (
            <button
              key={idx}
              className={"ttt-square" + (val ? " ttt-filled" : "")}
              onClick={() => handleSquareClick(idx)}
              aria-label={`Tic Tac Toe grid square ${1 + idx}, currently ${val ? val : 'empty'}`}
            >
              {val}
            </button>
          ))}
        </div>
        <div className="ttt-controls">
          <button className="ttt-restart-btn" onClick={handleRestart}>
            Restart Game
          </button>
        </div>
      </main>
      <footer className="ttt-footer">
        <span>
          Minimal React TicTacToe &mdash; <a href="https://github.com/" target="_blank" rel="noopener noreferrer">Source</a>
        </span>
      </footer>
    </div>
  );
}

// PUBLIC_INTERFACE
function calculateWinner(sq) {
  /* Returns 'X', 'O', or null, or 'Draw' if squares are full but no winner */
  const lines = [
    [0,1,2],[3,4,5],[6,7,8], // Rows
    [0,3,6],[1,4,7],[2,5,8], // Cols
    [0,4,8],[2,4,6],         // Diagonals
  ];
  for (let line of lines) {
    const [a, b, c] = line;
    if (sq[a] && sq[a] === sq[b] && sq[b] === sq[c]) {
      return sq[a];
    }
  }
  if (sq.every(Boolean)) {
    return 'Draw';
  }
  return null;
}

export default App;