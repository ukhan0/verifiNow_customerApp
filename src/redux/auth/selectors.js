import {useSelector} from 'react-redux';

export const isUserLoggedIn = () =>
  useSelector(state => state.auth.customerInfo?.access_token);
