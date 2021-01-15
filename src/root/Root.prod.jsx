import CssBaseline from '@material-ui/core/CssBaseline';
import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Game from '../containers/Game';
import Homepage from '../containers/Homepage';

const Root = () => {
  return (
    <>
      <CssBaseline />
      <Switch>
        <Route path="/game/:gameId" component={Game} />
        <Route path="/" component={Homepage} />
      </Switch>
    </>
  );
};
export default Root;
