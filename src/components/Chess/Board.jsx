import chess from 'chess.js';
import Chessboard from 'chessboardjsx';
import PropTypes from 'prop-types';
import React, { Component, useEffect, useRef, useState } from 'react';
export default function WithMoveValidation() {
  const [fen, setFen] = useState('start');
  const [dropSquareStyle, setDropSquareStyle] = useState({});
  const [squareStyles, setSquareStyles] = useState({});
  const [pieceSquare, setPieceSquare] = useState('');
  const [square, setSquare] = useState('');
  const [history, setHistory] = useState([]);

  const game = useRef(new chess());

  const removeHighlightSquare = () => {
    setSquareStyles(squareStyling({ pieceSquare, history }));
  };

  // show possible moves
  const highlightSquare = (sourceSquare, squaresToHighlight) => {
    const highlightStyles = [sourceSquare, ...squaresToHighlight].reduce(
      (a, c) => {
        return {
          ...a,
          ...{
            [c]: {
              background:
                'radial-gradient(circle, #fffc00 36%, transparent 40%)',
              borderRadius: '50%',
            },
          },
          ...squareStyling({ history, pieceSquare }),
        };
      },
      {}
    );
    setSquareStyles({ ...squareStyles, ...highlightStyles });
  };

  const onDrop = ({ sourceSquare, targetSquare }) => {
    // see if the move is legal
    let move = game.current.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q', // always promote to a queen for example simplicity
    });

    // illegal move
    if (move === null) return;
    setFen(game.current.fen());
    setSquareStyles(squareStyling({ pieceSquare, history }));
    setHistory(game.current.history({ verbose: true }));
  };

  const onMouseOverSquare = (square) => {
    // get list of possible moves for this square
    let moves = game.current.moves({
      square: square,
      verbose: true,
    });

    // exit if there are no moves available for this square
    if (moves.length === 0) return;

    let squaresToHighlight = [];
    for (var i = 0; i < moves.length; i++) {
      squaresToHighlight.push(moves[i].to);
    }

    highlightSquare(square, squaresToHighlight);
  };

  const onMouseOutSquare = (square) => removeHighlightSquare(square);

  // central squares get diff dropSquareStyles
  const onDragOverSquare = (square) => {
    setDropSquareStyle(
      square === 'e4' || square === 'd4' || square === 'e5' || square === 'd5'
        ? { backgroundColor: 'cornFlowerBlue' }
        : { boxShadow: 'inset 0 0 1px 4px rgb(255, 255, 0)' }
    );
  };

  const onSquareClick = (square) => {
    setSquareStyles(squareStyling({ pieceSquare: square, history }));
    setPieceSquare(square);

    let move = game.current.move({
      from: pieceSquare,
      to: square,
      promotion: 'q', // always promote to a queen for example simplicity
    });

    // illegal move
    if (move === null) return;

    setFen(game.current.fen());
    setHistory(game.current.history({ verbose: true }));
    setPieceSquare('');
  };

  const onSquareRightClick = (square) =>
    setSquareStyles({ [square]: { backgroundColor: 'deepPink' } });

  return (
    <Chessboard
      width={320}
      position={fen}
      onDrop={onDrop}
      onMouseOverSquare={onMouseOverSquare}
      onMouseOutSquare={onMouseOutSquare}
      boardStyle={{
        borderRadius: '5px',
        boxShadow: `0 5px 15px rgba(0, 0, 0, 0.5)`,
      }}
      squareStyles={squareStyles}
      dropSquareStyle={dropSquareStyle}
      onDragOverSquare={onDragOverSquare}
      onSquareClick={onSquareClick}
      onSquareRightClick={onSquareRightClick}
    />
  );
}

const squareStyling = ({ pieceSquare, history }) => {
  const sourceSquare = history.length && history[history.length - 1].from;
  const targetSquare = history.length && history[history.length - 1].to;

  return {
    [pieceSquare]: { backgroundColor: 'rgba(255, 255, 0, 0.4)' },
    ...(history.length && {
      [sourceSquare]: {
        backgroundColor: 'rgba(255, 255, 0, 0.4)',
      },
    }),
    ...(history.length && {
      [targetSquare]: {
        backgroundColor: 'rgba(255, 255, 0, 0.4)',
      },
    }),
  };
};
