import "./assets/styles/App.css";

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import configureStore from "./redux/store/configureStore";

const persistedState = localStorage.getItem("financeState")
  ? JSON.parse(localStorage.getItem("financeState"))
  : {};
const store = configureStore(persistedState);
store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem(
    "financeState",
    JSON.stringify({
      account: { ...state.account, auth_data: {} },
      Intl: state.Intl,
    })
  );
});

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById("root")
);
