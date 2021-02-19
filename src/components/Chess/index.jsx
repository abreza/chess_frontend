import { CircularProgress, Grid } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';

import { move } from '../../parse/game.js';
import Board from './Board.jsx';

function Chess({ game }) {
  return (
    <Grid container alignItems="center" justify="center">
      <Grid item>
        {game ? (
          <Board
            moves={game.get('moves')}
            user1={game.get('user1')}
            user2={game.get('user2')}
            updateMoves={(mv) => move(mv, game.id)}
          />
        ) : (
          <CircularProgress />
        )}
      </Grid>
    </Grid>
  );
}

export default connect()(Chess);
