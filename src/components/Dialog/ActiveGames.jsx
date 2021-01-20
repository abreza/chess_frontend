import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from '@material-ui/core';
import Parse from 'parse';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import AuthContext from '../../contexts/Auth/AuthContext';

function ActiveGames({ open, handleClose, mode }) {
  const [games, setGames] = useState([]);

  useEffect(async () => {
    if (!open) return;
    const query = new Parse.Query('Game');
    if (mode === 'play') {
      query.doesNotExist('user2');
    }
    query.include(['user1', 'user2']);
    const subscription = await query.subscribe();
    subscription.on('update', setGames);
    setGames(await query.find());
    return () => subscription.unsubscribe();
  }, [open, mode]);

  const history = useHistory();

  const getUsername = (game, user) =>
    game?.get(user)?.get('username') || '-----------';

  const getGameText = (game) => {
    if (!game) return;
    return (
      <div>
        <div>{game.id}</div>
        <span>
          {getUsername(game, 'user1')} | {getUsername(game, 'user2')}
        </span>
      </div>
    );
  };

  const { getUser, signUpAsRandomUser } = useContext(AuthContext);

  const joinGame = async (game) => {
    if (!getUser()) {
      signUpAsRandomUser();
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
