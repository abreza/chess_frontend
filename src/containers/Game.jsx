import {
  Container,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import Chess from '../components/Chess/index.jsx';
import { getGame } from '../parse/game.js';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },

  grid: {
    marginTop: theme.spacing(2),
  },
  chess: {
    margin: theme.spacing(2),
  },
  move: {
    border: '1px solid #ccc',
    borderRadius: 4,
    padding: theme.spacing(0.5, 1),
    background: 'black',
    color: 'white',
  },
  moveWhite: {
    background: 'white',
    color: 'black',
  },
  moves: {
    overflowX: 'auto',
    overflowY: 'hidden',
    whiteSpace: 'nowrap',
  },
  state: {
    borderRadius: '10px 10px 3px 3px',
    background: '#eaeaea',
    display: 'inline',
    padding: theme.spacing(2, 1),
  },
}));

function Game({ gameId }) {
  const classes = useStyles();

  const [game, setGame] = useState(null);
  const updateGame = async (game) => {
    setGame(game);
    await game.get('user1')?.fetch();
    await game.get('user2')?.fetch();
  };
  useEffect(async () => {
    const { subscription, init } = await getGame({ gameId });
    subscription.on('update', updateGame);
    setGame(init);
    return () => subscription.unsubscribe();
  }, []);

  return (
    <Container maxWidth="sm">
      <Grid
        container
        justify="center"
        alignItems="center"
        spacing={2}
        className={classes.grid}>
        <Grid item xs={12}>
          <Typography variant="h2" align="center">
            {`کد بازی: ${gameId}`}
          </Typography>
          <Typography variant="h4" align="left" className={classes.state}>
            {game?.get('state') === 'USER1_WON'
              ? '(برنده: سفید)'
              : game?.get('state') === 'USER2_WON'
              ? 'برنده: مشکی'
              : game?.get('state') === 'DRAW'
              ? 'مساوی'
              : game?.get('state') === 'NOT_STARTED'
              ? 'شروع نشده'
              : 'درحال بازی'}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Paper className={clsx(classes.paper, classes.moves)}>
            {game?.get('moves')?.map((move, index) => (
              <div
                style={{ display: 'inline-block', marginRight: 5 }}
                key={index}>
                <Grid
                  container
                  direction="column"
                  className={clsx(
                    classes.move,
                    index % 2 == 0 && classes.moveWhite
                  )}>
                  <Grid item>{move.from}</Grid>
                  <Grid item>{move.to}</Grid>
                </Grid>
              </div>
            ))}
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h3" align="center">
              {game?.get('user2')?.get('username')}
            </Typography>
            <div className={classes.chess}>
              <Chess game={game} />
            </div>
            <Typography variant="h3" align="center">
              {game?.get('user1')?.get('username')}
            </Typography>
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
