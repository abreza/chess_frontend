import chess from 'chess.js';
import Chessboard from 'chessboardjsx';
import React, { useEffect, useRef, useState } from 'react';

import ChoosePromotionPieceDialog from './ChoosePromotionPieceDialog.jsx';
import Pieces from './Pieces.jsx';

export default function Board({ initPosition }) {
  const [choosePromotionPiece, setChoosePromotionPiece] = useState(null);
  const [fen, setFen] = useState(initPosition || 'start');
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [focusedSquare, setFocusedSquare] = useState(null);
  const [history, setHistory] = useState([]);

  const [squareStyles, setSquareStyles] = useState({});

  const game = useRef(new chess(initPosition));

  useEffect(() => {
    const highlightStyles = {};
    getValidTargets(focusedSquare).forEach(
      (c) =>
        (highlightStyles[c] = {
          background:
            'radial-gradient(circle, #eeec00 36%, #000000 40%, transparent 40%)',
          borderRadius: '50%',
        })
    );

    const selectedHighlightStyles = {};
    getValidTargets(selectedSquare).forEach(
      (c) =>
        (highlightStyles[c] = {
          background:
            'radial-gradient(circle, #eeec00 36%, #000000 40%, transparent 43%)',
          borderRadius: '50%',
        })
    );

    setSquareStyles({
      [selectedSquare]: { backgroundColor: 'rgba(255, 255, 0, 0.6)' },
      ...(history.length && {
        [history[history.length - 1].from]: {
          backgroundColor: 'rgba(255, 255, 0, 0.6)',
        },
        [history[history.length - 1].to]: {
          backgroundColor: 'rgba(255, 255, 0, 0.6)',
        },
      }),
      ...highlightStyles,
      ...selectedHighlightStyles,
    });
  }, [selectedSquare, focusedSquare, history]);

  const move = (options) => {
    if (game.current.move(options) === null) return;

    setFen(game.current.fen());
    setHistory(game.current.history({ verbose: true }));
    setSelectedSquare(null);
  };

  const isPromotion = ({ sourceSquare, targetSquare }) => {
    if (game.current.get(sourceSquare).type !== 'p') return false;
    return targetSquare[1] === '8' || targetSquare[1] === '1';
  };

  const getValidTargets = (square) =>
    game.current.moves({ square, verbose: true }).map((m) => m.to);

  const isValidMove = ({ sourceSquare, targetSquare }) => {
    return getValidTargets(sourceSquare).includes(targetSquare);
  };

  const onMoveRequest = ({ sourceSquare, targetSquare }) => {
    if (!isValidMove({ sourceSquare, targetSquare })) return false;
    if (isPromotion({ sourceSquare, targetSquare })) {
      setChoosePromotionPiece({
        from: sourceSquare,
        to: targetSquare,
        color: game.current.get(sourceSquare).color,
      });
    } else {
      move({ from: sourceSquare, to: targetSquare });
    }
    return true;
  };

  const onMouseOverSquare = (square) => {
    setFocusedSquare(square);
  };

  const onMouseOutSquare = () => setFocusedSquare(null);

  const onSquareClick = (square) => {
    if (selectedSquare) {
      const isValid = onMoveRequest({
        sourceSquare: selectedSquare,
        targetSquare: square,
      });
      if (!isValid) {
        setSelectedSquare(square);
      }
    } else {
      setSelectedSquare(square);
    }
  };

  const promotePiece = (promotion) => {
    const moveOption = { ...choosePromotionPiece, promotion };
    setChoosePromotionPiece(null);
    move(moveOption);
  };

  return (
    <>
      <Chessboard
        width={320}
        position={fen}
        onDrop={onMoveRequest}
        onMouseOverSquare={onMouseOverSquare}
        onMouseOutSquare={onMouseOutSquare}
        boardStyle={{
          borderRadius: '5px',
          boxShadow: `0 5px 15px rgba(0, 0, 0, 0.5)`,
        }}
        squareStyles={squareStyles}
        dropSquareStyle={{ boxShadow: 'inset 0 0 1px 2px rgb(255, 255, 0)' }}
        onSquareClick={onSquareClick}
        pieces={Pieces}
        lightSquareStyle={{ backgroundColor: 'AliceBlue' }}
        darkSquareStyle={{ backgroundColor: 'CornFlowerBlue' }}
      />
      <ChoosePromotionPieceDialog
        open={!!choosePromotionPiece}
        color={choosePromotionPiece?.color}
        handleClose={() => setChoosePromotionPiece(null)}
        onSelect={promotePiece}
      />
    </>
  );
}
