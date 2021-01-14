import React from 'react';

// eslint-disable-next-line react/display-name
const Piece = (src, alt) => ({ squareWidth, isDragging }) => {
  return (
    <img
      style={{
        width: isDragging ? squareWidth * 1.25 : squareWidth,
        height: isDragging ? squareWidth * 1.25 : squareWidth,
      }}
      src={src}
      alt={alt}
    />
  );
};

export default {
  wP: Piece(process.env.PUBLIC_URL + '/images/wp.png', 'wk'),
  wR: Piece(process.env.PUBLIC_URL + '/images/wr.png', 'wk'),
  wN: Piece(process.env.PUBLIC_URL + '/images/wn.png', 'wk'),
  wB: Piece(process.env.PUBLIC_URL + '/images/wb.png', 'wk'),
  wK: Piece(process.env.PUBLIC_URL + '/images/wk.png', 'wk'),
  wQ: Piece(process.env.PUBLIC_URL + '/images/wq.png', 'wq'),
  bP: Piece(process.env.PUBLIC_URL + '/images/bp.png', 'bk'),
  bR: Piece(process.env.PUBLIC_URL + '/images/br.png', 'bk'),
  bN: Piece(process.env.PUBLIC_URL + '/images/bn.png', 'bk'),
  bB: Piece(process.env.PUBLIC_URL + '/images/bb.png', 'bk'),
  bK: Piece(process.env.PUBLIC_URL + '/images/bk.png', 'bk'),
  bQ: Piece(process.env.PUBLIC_URL + '/images/bq.png', 'bq'),
};
