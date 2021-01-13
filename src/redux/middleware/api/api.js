import { normalize } from 'normalizr';

import fetchApi from '../../../utils/fetchApi';
import * as actionTypes from '../../actions/actionTypes';

export const CALL_API = 'callAPI';

const getRequestOptions = ({ fetchOptions, token }) => ({
  ...fetchOptions,
  headers: {
    ...(!fetchOptions.dontContentType && {
      'Content-Type': 'application/json',
    }),
    ...fetchOptions.headers,
    ...(token && { Authorization: token }),
  },
});

const onSuccess = ({
  response,
  schema,
  actionWithoutCallAPI,
  successType,
  next,
}) => {
  response = schema ? normalize(response, schema) : response;
  if (response && response.message) {
    next({
      message: response.message,
      type: actionTypes.SHOW_SUCCESS_MESSAGE,
    });
  }
  return next({
    ...actionWithoutCallAPI,
    response,
    type: successType,
  });
};

const onFailure = ({ error, actionWithoutCallAPI, failureType, next }) => {
  if (error.message === 'TOKEN_EXPIRED') {
    next({
      type: actionTypes.LOGOUT_REQUEST,
    });
    return next({
      type: actionTypes.SHOW_ERROR_MESSAGE,
      error: 'دوباره به سامانه وارد شوید.',
    });
  }

  next({
    ...actionWithoutCallAPI,
    type: failureType,
    error: error.message,
  });

  return next({
    ...actionWithoutCallAPI,
    type: actionTypes.SHOW_ERROR_MESSAGE,
    error: error.message || 'خطایی رخ داده است!',
  });
};

export default ({ getState }) => (next) => (action) => {
  const { callAPI, ...actionWithoutCallAPI } = action;
  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  const { url, types, schema, fetchOptions } = callAPI;
  const [requestType, successType, failureType] = types;
  next({ ...actionWithoutCallAPI, type: requestType });
  const requestOptions = getRequestOptions({
    fetchOptions,
    token: getState().account.token,
  });

  return fetchApi(url, requestOptions)
    .then((response) =>
      onSuccess({
        response,
        schema,
        actionWithoutCallAPI,
        successType,
        next,
      })
    )
    .catch((error) =>
      onFailure({ error, actionWithoutCallAPI, failureType, next })
    );
};
