import {LOGIN, LOGIN_FAILED, LOGIN_SUCCESS, LOG_OUT, AUDIO_ON_BOARDING} from './types';

const INITIAL_STATE = {
  loading: false,
  customerInfo: {},
  on_boarding: null
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

    case AUDIO_ON_BOARDING:
      return {...state, on_boarding: payload}

    case LOG_OUT:
      return INITIAL_STATE;

    default:
      return state;
  }
};
