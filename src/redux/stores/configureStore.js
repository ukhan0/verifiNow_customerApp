import {createStore} from 'redux';
import {persistStore} from 'redux-persist';

import rootReducer from './../index';
import Reactotron from '../../../ReactotronConfig';

export const store = createStore(
  rootReducer,
  Reactotron.createEnhancer()
);
export const persistor = persistStore(store);
