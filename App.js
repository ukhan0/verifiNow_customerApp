import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//Redux
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import { store, persistor } from './src/redux/stores/configureStore';
import {isAudioAuthenticate, isUserLoggedIn} from './src/redux/auth/selectors';

//Screens
import Login from './src/screens/Login';
import ThankYou from './src/screens/ThankYou';
import VoiceScreen from './src/screens/VoiceScreen';
import WebViewScreen from './src/screens/WebViewScreen';
import UploadDocument from './src/screens/UploadDocument';
import CustomerSupport from './src/screens/CustomerSupport';

const Stack = createNativeStackNavigator();

const AppContainer = () => {
  const accessToken = isUserLoggedIn();
  const audioAuthenticate = isAudioAuthenticate();
  console.log('audioAuthenticate', audioAuthenticate);

  if (accessToken && !audioAuthenticate) {
    return (
      <>
        <Stack.Navigator initialRouteName="UploadDocument">
          <Stack.Screen
            name="UploadDocument"
            component={UploadDocument}
            options={{animationEnabled: false, headerShown: false}}
          />
          <Stack.Screen
            name="WebViewScreen"
            component={WebViewScreen}
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
  } else if (accessToken && audioAuthenticate) {
    return (
      <>
        <Stack.Navigator initialRouteName="ThankYou">
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
