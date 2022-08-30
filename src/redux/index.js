import {combineReducers} from 'redux';
import persistReducer from 'redux-persist/es/persistReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

import authReducer from './auth/reducer';

const persistConfig = {
  key: 'root', 
  storage: AsyncStorage,
  blacklist: [],

};

export default combineReducers({
  auth: persistReducer(persistConfig,authReducer)
});