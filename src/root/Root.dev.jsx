import CssBaseline from "@material-ui/core/CssBaseline";
import React from "react";
import { Route, Switch } from "react-router-dom";

import DevTools from "../containers/DevTools";
import Homepage from "../containers/Homepage";

const Root = () => {
  return (
    <>
      <CssBaseline />
      <Switch>
        <Route path='/' component={Homepage} />
      </Switch>
      <DevTools />
    </>
  );
};
export default Root;
