import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import { acceptRequest } from '../../parse/request';

function RequestDialog({ request, onClose }) {
  const [user1Username, setUser1Username] = useState();

  useEffect(async () => {
    if (request) {
      const user1 = request.get('user1');
      await user1.fetch();
      setUser1Username(user1.get('username'));
    }
  }, [request]);

  const history = useHistory();

  const accept = async () => {
    const gameId = await acceptRequest(request.id);
    if (gameId) {
      history.push(`/game/${gameId}`);
    }
    onClose();
  };

  return (
    <Dialog open={!!request} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogContent>
        {`${user1Username} درخواست بازی به شما داده‌است. آیا تمایل به بازی دارید؟`}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined" color="primary">
          خیر
        </Button>
        <Button onClick={accept} variant="contained" color="primary">
          بله
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default RequestDialog;
