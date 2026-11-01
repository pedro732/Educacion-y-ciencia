import React from 'react';

const Word = ({ selectedWord, correctLetters }) => {
  return (
    <div className="word">
      {selectedWord &&
  selectedWord.split('').map((letter, i) => (
    <span className="letter" key={`${letter}-${i}`}>
      {correctLetters.includes(letter) ? letter : ''}
    </span>
  ))
}
    </div>
  );
};

export default Word;