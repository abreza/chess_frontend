import { applyMiddleware, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import DevTools from '../../containers/DevTools.jsx';
import api from '../middleware/api/api';
import rootReducer from '../reducers';

let enhancer;
if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
  enhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(
    applyMiddleware(thunk, api, createLogger())
  );
} else {
  enhancer = compose(
    applyMiddleware(thunk, api, createLogger()),
    DevTools.instrument()
  );
}

const configureStore = (preloadedState) => {
  const store = createStore(
    rootReducer,
    { Intl: { locale: 'fa' }, ...preloadedState },
    enhancer
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      store.replaceReducer(rootReducer);
    });
  }

  return store;
};

export default configureStore;
