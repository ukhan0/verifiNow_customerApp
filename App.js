import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//Redux
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';

import rootReducer from './src/redux/index';
import Reactotron from './ReactotronConfig';
import {isUserLoggedIn} from './src/redux/auth/selectors';

//Screens
import Login from './src/screens/Login';
import ThankYou from './src/screens/ThankYou';
import VoiceScreen from './src/screens/VoiceScreen';
import UploadDocument from './src/screens/UploadDocument';
import CustomerSupport from './src/screens/CustomerSupport';

var store;

store = createStore(rootReducer, Reactotron.createEnhancer());

let persistor = persistStore(store);

const Stack = createNativeStackNavigator();

const AppContainer = () => {
  const accessToken = isUserLoggedIn();

  if (accessToken) {
    return (
      <>
        <Stack.Navigator>
          <Stack.Screen
            name="UploadDocument"
            component={UploadDocument}
            options={{animationEnabled: false, headerShown: false}}
          />
          <Stack.Screen
            name="VoiceScreen"
            component={VoiceScreen}
            options={{animationEnabled: false, headerShown: false}}
          />
          <Stack.Screen
            name="ThankYou"
            component={ThankYou}
            options={{animationEnabled: false, headerShown: false}}
          />
          <Stack.Screen
            name="CustomerSupport"
            component={CustomerSupport}
            options={{animationEnabled: false, headerShown: false}}
          />
        </Stack.Navigator>
      </>
    );
  } else {
    return (
      <>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{animationEnabled: false, headerShown: false}}
          />
        </Stack.Navigator>
      </>
    );
  }
};

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <AppContainer />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;
