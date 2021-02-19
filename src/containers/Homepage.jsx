import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  makeStyles,
  Paper,
} from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';

import ActiveGames from '../components/Dialog/ActiveGames';
import RatingDialog from '../components/Dialog/RatingDialog';
import LoggedInArea from '../components/SpecificPages/Hompage/LoggedInArea';
import MainHeader from '../components/SpecificPages/Hompage/MainHeader';
import AuthContext from '../parse/AuthContext';
import { createGame } from '../parse/game';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
  },
}));

function Homepage() {
  const classes = useStyles();

  const [activeGameMode, setActiveGameMode] = useState(false);
  const [openRating, setOpenRating] = useState(false);

  const history = useHistory();

  const { getUser, signUpAsRandomUser } = useContext(AuthContext);

  const user = getUser();

  const createNewGame = async () => {
    if (!user) {
      await signUpAsRandomUser();
    }
    const gameId = await createGame();
    if (gameId) {
      history.push(`/game/${gameId}`);
    }
  };

  return (
    <Container maxWidth="sm">
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
              {user && <LoggedInArea user={user} />}
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => setActiveGameMode('watch')}>
                  رتبه‌بندی بازیکنان
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => setActiveGameMode('watch')}>
                  بازی‌های انجام شده
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      <RatingDialog open={openRating} onClose={() => setOpenRating(false)} />
      <ActiveGames
        open={!!activeGameMode}
        handleClose={() => setActiveGameMode('')}
        mode={activeGameMode}
      />
    </Container>
  );
}

export default Homepage;
