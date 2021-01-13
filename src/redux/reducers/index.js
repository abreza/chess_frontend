import { IntlReducer as Intl } from "react-redux-multilingual";
import { combineReducers } from "redux";

import notifications from "./notifications";

const allReducers = combineReducers({
  notifications,
  Intl,
});
export default allReducers;
