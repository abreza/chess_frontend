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
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';

import ActiveGames from '../components/Dialog/ActiveGames';
import SignUpDialog from '../components/Dialog/SignUpDialog';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
  },
}));

function Homepage() {
  const classes = useStyles();

  const [openSignUp, setOpenSignUp] = useState(false);

  const [activeGameMode, setActiveGameMode] = useState(false);

  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  const history = useHistory();

  const currentUser = Parse.User.current();

  const createNewGame = async () => {
    if (!Parse.User.current()) {
      await new Parse.User({
        username: `p${Date.now()}${Math.floor(Math.random() * 100)}`,
      }).signUp();
    }
    const Game = Parse.Object.extend('Game');
    const game = new Game();
    game.set('user1', Parse.User.current());
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
            <Grid container justify="space-between">
              {currentUser ? (
                <>
                  <Grid item>سلام {currentUser.get('username')}</Grid>
                  <Grid item>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={async () => {
                        await Parse.User.logOut();
                        forceUpdate();
                      }}>
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
            </Grid>
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
      <SignUpDialog
        open={openSignUp}
        handleClose={() => setOpenSignUp(false)}
      />
      <ActiveGames
        open={!!activeGameMode}
        handleClose={() => setActiveGameMode('')}
        mode={activeGameMode}
      />
    </Container>
  );
}

export default connect()(Homepage);
