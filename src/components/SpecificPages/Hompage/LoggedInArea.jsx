import { Button, Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import {
  getAcceptSubscription,
  getRequestSubscription,
} from '../../../parse/request';
import PlayersDialog from '../../Dialog/PlayersDialog';
import RequestDialog from '../../Dialog/RequestDialog';

const LoggedInArea = ({ user }) => {
  const [request, setRequest] = useState();

  const [openPlayers, setOpenPlayers] = useState(false);

  const history = useHistory();

  useEffect(async () => {
    if (user) {
      const subscription = await getRequestSubscription();
      const acceptSubscription = await getAcceptSubscription();
      subscription.on('create', setRequest);
      acceptSubscription.on('create', (game) =>
        history.push(`/game/${game.id}`)
      );
      return () => {
        subscription.unsubscribe();
        getAcceptSubscription.unsubscribe();
      };
    }
  }, [user]);

  return (
    <>
      <Grid item>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => setOpenPlayers(true)}>
          انتخاب حریف
        </Button>
      </Grid>
      <PlayersDialog open={openPlayers} onClose={() => setOpenPlayers(false)} />
      <RequestDialog request={request} onClose={() => setRequest(false)} />
    </>
  );
};

export default LoggedInArea;
