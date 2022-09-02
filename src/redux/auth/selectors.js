import {useSelector} from 'react-redux';

export const isUserLoggedIn = () =>
  useSelector(state => state.auth.customerInfo?.access_token);

export const isAudioAuthenticate = () =>
  useSelector(state => state.auth.customerInfo?.on_boarding);
