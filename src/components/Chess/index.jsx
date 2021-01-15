import { CircularProgress, Grid } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';

import Board from './Board.jsx';

function Chess({ game }) {
  return (
    <Grid container alignItems="center" justify="center">
      <Grid item>{game ? <Board game={game} /> : <CircularProgress />}</Grid>
    </Grid>
  );
}

export default connect()(Chess);
