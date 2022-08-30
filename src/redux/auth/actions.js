import {LOGIN, LOGIN_FAILED, LOGIN_SUCCESS, LOG_OUT} from './types';

export const login = (email, password) => {
  return {
    type: LOGIN,
    payload: {email: email, pass: password},
  };
};

export const loginSuccess = customerInfo => {
  return {
    type: LOGIN_SUCCESS,
    payload: customerInfo,
  };
};

export const loginfailed = () => {
  return {
    type: LOGIN_FAILED,
  };
};

export const logout = () => {
  return {
    type: LOG_OUT,
  };
};
