"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';

interface PuzzleProps {
  imageUrl: string;
  numberOfPieces: number;
}

interface Piece {
  id: number;
  position: { row: number; col: number };
  currentPosition: { row: number; col: number };
}

const Puzzle: React.FC<PuzzleProps> = ({ imageUrl, numberOfPieces }) => {
  const gridSize = Math.sqrt(numberOfPieces);
  const [pieces, setPieces] = useState<Piece[]>([]);
  const puzzleRef = useRef<HTMLDivElement>(null);
  const [puzzleDimensions, setPuzzleDimensions] = useState({ width: 0, height: 0 });
  const [imageLoaded, setImageLoaded] = useState(false);

  const shufflePieces = () => {
    setPieces(prevPieces => {
      const shuffledPieces = [...prevPieces];
      for (let i = shuffledPieces.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledPieces[i].currentPosition, shuffledPieces[j].currentPosition] = 
        [shuffledPieces[j].currentPosition, shuffledPieces[i].currentPosition];
      }
      return shuffledPieces;
    });
  };

  const initializePieces = () => {
    const initialPieces: Piece[] = [];
    for (let i = 0; i < numberOfPieces; i++) {
      const row = Math.floor(i / gridSize);
      const col = i % gridSize;
      initialPieces.push({
        id: i,
        position: { row, col },
        currentPosition: { row, col },
      });
    }
    setPieces(initialPieces);
  };
  
  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      if (puzzleRef.current) {
        const containerWidth = puzzleRef.current.clientWidth;
        const scale = containerWidth / img.width;
        setPuzzleDimensions({
          width: containerWidth,
          height: img.height * scale
        });
        setImageLoaded(true);
      }
    };
    img.onerror = (err) => {
      console.error("Error al cargar la imagen del rompecabezas:", imageUrl, err);
    };

    const handleResize = () => {
        if (puzzleRef.current && imageLoaded) {
            const containerWidth = puzzleRef.current.clientWidth;
            if(puzzleDimensions.width > 0){
                 setPuzzleDimensions(prev => ({
                     width: containerWidth,
                     height: containerWidth * (prev.height/prev.width)
                 }));
            }
        }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);

  }, [imageUrl, imageLoaded, puzzleDimensions.width, puzzleDimensions.height]);

  useEffect(() => {
    if (imageLoaded) {
      initializePieces();
    }
  }, [imageLoaded, numberOfPieces, gridSize]);
  

  const pieceWidth = puzzleDimensions.width / gridSize;
  const pieceHeight = puzzleDimensions.height / gridSize;

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>, pieceId: number) => {
    const pieceElement = e.currentTarget;

    if (!puzzleRef.current) return;

    const puzzleRect = puzzleRef.current.getBoundingClientRect();
    const shiftX = e.clientX - pieceElement.getBoundingClientRect().left;
    const shiftY = e.clientY - pieceElement.getBoundingClientRect().top;
    
    pieceElement.style.position = 'absolute';
    pieceElement.style.zIndex = '1000';

    const moveAt = (pageX: number, pageY: number) => {
      let newLeft = pageX - shiftX - puzzleRect.left;
      let newTop = pageY - shiftY - puzzleRect.top;

      newLeft = Math.max(0, Math.min(newLeft, puzzleRect.width - pieceWidth));
      newTop = Math.max(0, Math.min(newTop, puzzleRect.height - pieceHeight));

      pieceElement.style.left = newLeft + 'px';
      pieceElement.style.top = newTop + 'px';
    };

    const onMouseMove = (event: MouseEvent) => {
      moveAt(event.pageX, event.pageY);
    };

    document.addEventListener('mousemove', onMouseMove);

    pieceElement.onmouseup = () => {
      document.removeEventListener('mousemove', onMouseMove);
      pieceElement.onmouseup = null;

      const currentLeft = parseFloat(pieceElement.style.left || '0');
      const currentTop = parseFloat(pieceElement.style.top || '0');

      const snapCol = Math.round(currentLeft / pieceWidth);
      const snapRow = Math.round(currentTop / pieceHeight);
      
      const validSnapCol = Math.max(0, Math.min(snapCol, gridSize - 1));
      const validSnapRow = Math.max(0, Math.min(snapRow, gridSize - 1));

      setPieces(prevPieces => {
        const updatedPieces = [...prevPieces];
        const currentPieceIndex = updatedPieces.findIndex(p => p.id === pieceId);
        
        if (currentPieceIndex !== -1) {
            const targetPieceIndex = updatedPieces.findIndex(p => 
                p.currentPosition.row === validSnapRow && p.currentPosition.col === validSnapCol
            );

            if (targetPieceIndex !== -1 && targetPieceIndex !== currentPieceIndex) {
                 // Swap the pieces' current positions
                const tempPosition = updatedPieces[currentPieceIndex].currentPosition;
                updatedPieces[currentPieceIndex].currentPosition = updatedPieces[targetPieceIndex].currentPosition;
                updatedPieces[targetPieceIndex].currentPosition = tempPosition;
            } else {
                 // If the target spot is empty, just move it. This logic might need refinement
                 // depending on whether empty spots are allowed or only swaps.
                 // For a classic sliding puzzle, you'd only swap with an adjacent empty tile.
                 // For a jigsaw, this swap logic is more appropriate.
                updatedPieces[currentPieceIndex].currentPosition = { row: validSnapRow, col: validSnapCol };
            }
        }
        return updatedPieces;
      });
      
      pieceElement.style.position = 'absolute';
      pieceElement.style.zIndex = 'auto';
    };

    pieceElement.ondragstart = () => false;
  };

  return (
    <div className="flex flex-col items-center space-y-4">
        <div
        ref={puzzleRef}
        className="relative w-full"
        style={{
            height: puzzleDimensions.height || 'auto',
            border: '2px solid #ccc',
            overflow: 'hidden',
        }}
        >
        {pieces.map((piece) => {
            const backgroundPositionX = -piece.position.col * pieceWidth;
            const backgroundPositionY = -piece.position.row * pieceHeight;

            return (
            <div
                key={piece.id}
                className="puzzle-piece absolute"
                data-piece-id={piece.id}
                style={{
                width: pieceWidth,
                height: pieceHeight,
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: `${puzzleDimensions.width}px ${puzzleDimensions.height}px`,
                backgroundPosition: `${backgroundPositionX}px ${backgroundPositionY}px`,
                cursor: 'grab',
                left: piece.currentPosition.col * pieceWidth,
                top: piece.currentPosition.row * pieceHeight,
                transition: 'left 0.2s ease-out, top 0.2s ease-out',
                border: '1px solid #fff'
                }}
                onMouseDown={(e) => handleMouseDown(e, piece.id)}
            />
            );
        })}
        </div>
        <Button onClick={shufflePieces} className="bg-primary hover:bg-primary/90">
            Barajar
        </Button>
    </div>
  );
};

export default Puzzle;
