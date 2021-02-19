import Avatar from '@material-ui/core/Avatar';
import { blue } from '@material-ui/core/colors';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import PersonIcon from '@material-ui/icons/Person';
import React, { useContext, useEffect, useState } from 'react';

import AuthContext from '../../parse/AuthContext.js';
import { getAnotherPlayersUsername } from '../../parse/players';
import { createReport } from '../../parse/request';

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

function PlayersDialog({ onClose, open }) {
  const classes = useStyles();

  const [players, setPlayers] = useState([]);

  const { getUser } = useContext(AuthContext);

  useEffect(async () => {
    if (open) {
      setPlayers(await getAnotherPlayersUsername(getUser()?.id));
    }
  }, [open]);

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>حریف خود را انتخاب کنید.</DialogTitle>
      <List>
        {players.map((player) => (
          <ListItem
            button
            onClick={() => {
              createReport(player.id);
              onClose();
            }}
            key={player.id}>
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={player.get('username')} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

export default PlayersDialog;
