import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import Parse from 'parse';
import React, { useState } from 'react';

function SignUpDialog({ open, handleClose }) {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const submit = () =>
    Parse.User.logIn(username, password, {
      usePost: true,
    })
      .catch(() => {
        return new Parse.User({ username, password }).signUp();
      })
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
              onClick={() => submit()}>
              ثبت
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export default SignUpDialog;
