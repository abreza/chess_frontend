import { Button, Grid } from '@material-ui/core';
import { useContext, useState } from 'react';
import React from 'react';

import AuthContext from '../../../parse/AuthContext';
import SignUpDialog from '../../Dialog/SignUpDialog';

const MainHeader = () => {
  const [openSignUp, setOpenSignUp] = useState(false);
  const { logout, getUser } = useContext(AuthContext);
  const username = getUser()?.username;

  return (
    <Grid container justify="space-between">
      {username ? (
        <>
          <Grid item>سلام {username}</Grid>
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

export default MainHeader;
