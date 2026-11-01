"use client";
import React, { useState } from "react";

function Square({ value, onSquareClick }: { value: string | null, onSquareClick: () => void }) {
  return (
    <button
      className="border border-primary text-card-foreground text-4xl font-bold h-24 w-24 flex items-center justify-center bg-card"
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState<(string | null)[]>(Array(9).fill(null));

  const handleClick = (i: number) => {
    if (squares[i] || calculateWinner(squares)) return;

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  };

  const restartGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  const winner = calculateWinner(squares);
  const status = winner
    ? `Ganador: ${winner}`
    : `Siguiente jugador: ${xIsNext ? "X" : "O"}`;

  return (
    <div className="mt-4 flex flex-col items-center">
      <div className="mb-4 text-xl font-semibold text-foreground">{status}</div>
      <div className="grid grid-cols-3 gap-1 w-max bg-primary">
        {squares.map((square, i) => (
          <Square key={i} value={square} onSquareClick={() => handleClick(i)} />
        ))}
      </div>

      <button className="mt-4 px-4 py-2 bg-destructive text-destructive-foreground rounded-md hover:bg-destructive/90" onClick={restartGame}>
        Reiniciar Juego
      </button>
    </div>
  );
}

function calculateWinner(squares: (string | null)[]) {
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
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}