import {
  LOGIN,
  LOG_OUT,
  USER_EXIST,
  FACE_MATCH,
  SELFIE_INFO,
  BACK_ID_INFO,
  LOGIN_FAILED,
  FRONT_ID_INFO,
  CUSTOMER_UUID,
  LOGIN_SUCCESS,
  CUSTOMER_TOKEN,
  AUDIO_ON_BOARDING,
  INCODE_ON_BOARDING,
  CUSTOMER_INTERVIEW_ID,
  GET_CUSTOMER_HISTORY,
} from './types';

const INITIAL_STATE = {
  loading: false,
  customerInfo: {},
  backIDInfo: null,
  selfieInfo: null,
  userExist: false,
  frontIDInfo: null,
  customerUUID: null,
  customerToken: null,
  faceMatchInfo: null,
  audio_onboarding: null,
  incode_onboarding: null,
  customerInterviewId: null,
  verificationHistory: null,
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
      return {...state, audio_onboarding: payload};

    case INCODE_ON_BOARDING:
      return {...state, incode_onboarding: payload};

    case CUSTOMER_TOKEN:
      return {...state, customerToken: payload};

    case CUSTOMER_INTERVIEW_ID:
      return {...state, customerInterviewId: payload};

    case CUSTOMER_UUID:
      return {...state, customerUUID: payload};

    case SELFIE_INFO:
      return {...state, selfieInfo: payload};

    case FRONT_ID_INFO:
      return {...state, frontIDInfo: payload};

    case BACK_ID_INFO:
      return {...state, backIDInfo: payload};

    case FACE_MATCH:
      return {...state, faceMatchInfo: payload};

    case GET_CUSTOMER_HISTORY:
      return {...state, verificationHistory: payload};

    case USER_EXIST:
      return {...state, userExist: payload};

    case LOG_OUT:
      return INITIAL_STATE;

    default:
      return state;
  }
};
