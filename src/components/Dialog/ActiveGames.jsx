import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from '@material-ui/core';
import Parse from 'parse';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

function ActiveGames({ open, handleClose, mode }) {
  const [games, setGames] = useState([]);

  useEffect(async () => {
    if (!open) return;
    let query = new Parse.Query('Game');

    if (mode === 'play') {
      query.doesNotExist('user2');
    }

    let subscription = await query.subscribe();
    subscription.on('update', setGames);

    setGames(await query.find());

    return () => subscription.unsubscribe();
  }, [open, mode]);

  const history = useHistory();

  const getGameText = (game) => {
    if (!game) return;
    if (mode === 'play')
      return `${game.id}: ${game?.get('user1')?.get('username')}`;
    return `${game.id}: ${game?.get('user1')?.get('username')} | ${game
      ?.get('user2')
      ?.get('username')}`;
  };

  const joinGame = async (game) => {
    if (!Parse.User.current()) {
      await new Parse.User({
        username: `p${Date.now()}${Math.floor(Math.random() * 100)}`,
      }).signUp();
    }
    game.set('user2', Parse.User.current());
    game.save().then((game) => history.push(`/game/${game.id}`));
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        <Typography variant="h3" align="center" gutterBottom>
          لیست بازی‌ها
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2} direction="column">
          {games.map((game) => (
            <Grid item key={game.id}>
              {mode === 'play' ? (
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => joinGame(game)}>
                  {getGameText(game)}
                </Button>
              ) : (
                <Button
                  component={Link}
                  to={`/game/${game.id}`}
                  variant="contained"
                  color="primary"
                  fullWidth>
                  {getGameText(game)}
                </Button>
              )}
            </Grid>
          ))}
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export default ActiveGames;
