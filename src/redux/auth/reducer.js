import {LOGIN, LOGIN_FAILED, LOGIN_SUCCESS, LOG_OUT} from './types';

const INITIAL_STATE = {
  loading: false,
  customerInfo: {},
};

export default (state = INITIAL_STATE, action) => {
  const {type, payload} = action;
  switch (type) {
    case LOGIN:
      return {...state, loading: true};
    case LOGIN_SUCCESS:
      return {...state, customerInfo: payload, loading: false};
    case LOGIN_FAILED:
      return {...state, loading: false};

    case LOG_OUT:
      return INITIAL_STATE;

    default:
      return {...state};
  }
};
