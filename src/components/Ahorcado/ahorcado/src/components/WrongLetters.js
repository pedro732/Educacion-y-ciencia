import React from 'react';

const WrongLetters = ({ wrongLetters }) => {
  return (
    <div className="wrong-letters-container">
      {wrongLetters.length > 0 && (
        <p>
          Incorrectas:&nbsp;
          {wrongLetters.map((letter, i) => (
            <span key={`${letter}-${i}`}>
              {i > 0 ? ', ' : ''}
              {letter}
            </span>
          ))}
        </p>
      )}
    </div>
  );
};
export default WrongLetters;