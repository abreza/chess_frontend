import { Dialog } from '@material-ui/core';
import React from 'react';

function LoginDialog({ open, handleClose }) {
  return <Dialog open={open} onClose={handleClose}></Dialog>;
}

export default LoginDialog;
