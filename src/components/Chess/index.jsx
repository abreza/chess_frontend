import { Grid } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';

import Board from './Board.jsx';

function Chess() {
  return (
    <Grid
      container
      alignItems="center"
      justify="center"
      style={{ height: '100vh' }}>
      <Grid item>
        <Board />
      </Grid>
    </Grid>
  );
}

export default connect()(Chess);
