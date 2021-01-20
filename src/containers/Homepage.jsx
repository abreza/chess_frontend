import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  makeStyles,
  Paper,
} from '@material-ui/core';
import Parse from 'parse';
import React, { useContext, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';

import ActiveGames from '../components/Dialog/ActiveGames';
import SignUpDialog from '../components/Dialog/SignUpDialog';
import AuthContext from '../contexts/Auth/AuthContext';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
  },
}));

const MainHeader = () => {
  const [openSignUp, setOpenSignUp] = useState(false);
  const { logout, getUser } = useContext(AuthContext);
  const user = getUser();

  return (
    <Grid container justify="space-between">
      {user ? (
        <>
          <Grid item>سلام {user.get('username')}</Grid>
          <Grid item>
            <Button variant="outlined" color="primary" onClick={logout}>
              خروج
            </Button>
          </Grid>
        </>
      ) : (
        <Grid item>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setOpenSignUp(true)}>
            ورود / ثبت‌نام
          </Button>
        </Grid>
      )}
      <SignUpDialog
        open={openSignUp}
        handleClose={() => setOpenSignUp(false)}
      />
    </Grid>
  );
};


const Game = Parse.Object.extend('Game');

function Homepage() {
  const classes = useStyles();

  const [activeGameMode, setActiveGameMode] = useState(false);

  const history = useHistory();

  const { getUser, signUpAsRandomUser } = useContext(AuthContext);

  const createNewGame = async () => {
    if (!getUser()) {
      signUpAsRandomUser();
    }
    const game = new Game();
    game.set('user1', getUser());
    game.save().then((game) => history.push(`/game/${game.id}`));
  };

  return (
    <Container maxWidth="sm" fullWidth>
      <Grid
        container
        justify="center"
        alignItems="center"
        style={{ minHeight: '100vh' }}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <MainHeader />
            <Box my={3}>
              <Divider />
            </Box>
            <Grid container justify="center" direction="column" spacing={3}>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={createNewGame}>
                  ساخت بازی جدید
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => setActiveGameMode('play')}>
                  اضافه شدن به بازی
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => setActiveGameMode('watch')}>
                  تماشای بازی
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      <ActiveGames
        open={!!activeGameMode}
        handleClose={() => setActiveGameMode('')}
        mode={activeGameMode}
      />
    </Container>
  );
}

export default connect()(Homepage);
