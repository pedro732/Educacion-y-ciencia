import React from 'react';

const Popup = ({ gameStatus, selectedWord, playAgain }) => {
  let finalMessage = '';
  let finalMessageRevealWord = '';

  if (gameStatus === 'win') {
    finalMessage = '¡Felicidades! ¡Ganaste! 😃';
  } else if (gameStatus === 'lose') {
    finalMessage = '¡Perdiste! 😕';
    finalMessageRevealWord = `...la palabra era: ${selectedWord}`;
  }

  return (
    <div className="popup-container" style={gameStatus !== '' ? { display: 'flex' } : {}}>
      <div className="popup">
        <h2>{finalMessage}</h2>
        <h3>{finalMessageRevealWord}</h3>
        <button onClick={playAgain}>Jugar de Nuevo</button>
      </div>
    </div>
  );
};

export default Popup;
