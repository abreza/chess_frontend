import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useContext, useState } from 'react';

import AuthContext from '../../contexts/Auth/AuthContext';

function SignUpDialog({ open, handleClose }) {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const { loginOrSignUp } = useContext(AuthContext);

  const submit = () =>
    loginOrSignUp(username, password)
      .then(() => {
        handleClose();
      })
      .catch((error) => {
        if (error.code === 202) {
          alert('نام کاربری و گذرواژه مطابقت ندارند!');
        }
      });

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        <Typography variant="h3" align="center" gutterBottom>
          ورود / ثبت‌نام
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2} direction="column">
          <Grid item>
            <TextField
              label="نام کاربری"
              variant="outlined"
              fullWidth
              inputProps={{ className: 'ltr-input' }}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              label="گذرواژه"
              variant="outlined"
              type="password"
              fullWidth
              inputProps={{ className: 'ltr-input' }}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={submit}>
              ثبت
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export default SignUpDialog;
