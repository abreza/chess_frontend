import {
  Button,
  Dialog,
  DialogContent,
  Grid,
  Typography,
} from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import AuthContext from '../../parse/AuthContext';
import { getGames, joinGame } from '../../parse/game';

function ActiveGames({ open, handleClose, mode }) {
  const [games, setGames] = useState([]);

  useEffect(async () => {
    if (open) {
      setGames(await getGames({ mode }));
    }
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

  const join = async (game) => {
    if (!getUser()) {
      await signUpAsRandomUser();
    }
    const gameId = await joinGame({ game });
    history.push(`/game/${gameId}`);
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogContent>
        <Grid container spacing={2} direction="column">
          <Grid item>
            <Typography variant="h3" align="center" gutterBottom>
              لیست بازی‌ها
            </Typography>
          </Grid>
          {games.map((game) => (
            <Grid item key={game.id}>
              {mode === 'play' ? (
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => join(game)}>
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
