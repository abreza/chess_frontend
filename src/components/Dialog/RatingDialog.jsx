import { ListItemSecondaryAction } from '@material-ui/core';
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
import React, { useEffect, useState } from 'react';

import { getAllPlayers } from '../../parse/players';
import MouseOverPopover from '../popover/Hover';

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
  header: {
    backgroundColor: blue[100],
  },
  badge: {
    width: 30,
  },
});

const IMAGES = {
  THREE_CONSECUTIVE_WINS: {
    img: process.env.PUBLIC_URL + 'winner.svg',
    text: 'پیروزی ۳ بار پشت هم!',
  },
  FIVE_SCORE: {
    img: process.env.PUBLIC_URL + 'badge.svg',
    text: 'کسب ۵ امتیاز!',
  },
};

function RatingDialog({ onClose, open }) {
  const classes = useStyles();

  const [players, setPlayers] = useState([]);

  const [anchorEl, setAnchorEl] = useState();
  const [text, setText] = useState('');

  useEffect(async () => {
    if (open) {
      setPlayers(await getAllPlayers());
    }
  }, [open]);

  const handlePopoverOpen = (event, text) => {
    setAnchorEl(event.currentTarget);
    setText(text);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  return (
    <Dialog onClose={onClose} open={open} maxWidth="xs" fullWidth>
      <DialogTitle>رتبه بندی</DialogTitle>
      <List>
        <ListItem className={classes.header}>
          <ListItemAvatar></ListItemAvatar>
          <ListItemText primary="کاربر" secondary="امتیاز" />
          <ListItemSecondaryAction>نشان</ListItemSecondaryAction>
        </ListItem>
        {players
          .sort((a, b) => b.get('score') - a.get('score'))
          .map((player) => (
            <ListItem key={player.id}>
              <ListItemAvatar>
                <Avatar className={classes.avatar}>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={player.get('username')}
                secondary={'امتیاز ' + (player.get('score') || 0)}
              />
              <ListItemSecondaryAction>
                {player.get('badges')?.length > 0
                  ? player
                      .get('badges')
                      .map((badge) => (
                        <img
                          onMouseEnter={(event) =>
                            handlePopoverOpen(event, IMAGES[badge].text)
                          }
                          onMouseLeave={handlePopoverClose}
                          key={badge}
                          src={IMAGES[badge].img}
                          alt={badge}
                          className={classes.badge}
                        />
                      ))
                  : 'ندارد'}
              </ListItemSecondaryAction>
            </ListItem>
          ))}
      </List>
      <MouseOverPopover
        anchorEl={anchorEl}
        handlePopoverClose={handlePopoverClose}
        text={text}
      />
    </Dialog>
  );
}

export default RatingDialog;
