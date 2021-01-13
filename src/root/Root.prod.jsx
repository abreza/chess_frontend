import CssBaseline from "@material-ui/core/CssBaseline";
import React from "react";
import { Route, Switch } from "react-router-dom";

import Homepage from "../containers/Homepage";

const Root = () => {
  return (
    <>
      <CssBaseline />
      <Switch>
        <Route path='/' component={Homepage} />
      </Switch>
    </>
  );
};
export default Root;
