import {
  Container,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import Parse from 'parse';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import Chess from '../components/Chess/index.jsx';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
  },
}));

function Game({ gameId }) {
  const classes = useStyles();

  const [game, setGame] = useState(null);
  useEffect(async () => {
    const query = new Parse.Query('Game');
    query.equalTo('objectId', gameId);
    const subscription = await query.subscribe();
    subscription.on('update', setGame);
    setGame(await query.first());
    return () => subscription.unsubscribe();
  }, [gameId]);

  return (
    <Container maxWidth="sm" fullWidth>
      <Grid
        container
        justify="center"
        alignItems="center"
        style={{ minHeight: '100vh' }}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography
              variant="h2"
              gutterBottom
              align="center">{`کد بازی: ${gameId}`}</Typography>
            <Chess game={game} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

const mapStateToProps = (state, ownProps) => ({
  gameId: ownProps.match.params.gameId,
});

export default connect(mapStateToProps)(Game);
