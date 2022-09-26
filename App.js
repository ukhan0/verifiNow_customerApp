import React, { useEffect } from 'react';
import { LogBox } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {NavigationContainer} from '@react-navigation/native';
import PushNotification from 'react-native-push-notification';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//Redux
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import {store, persistor} from './src/redux/stores/configureStore';
import {isAudioAuthenticate, isUserLoggedIn} from './src/redux/auth/selectors';

//Screens
import Login from './src/screens/Login';
import ThankYou from './src/screens/ThankYou';
import VoiceScreen from './src/screens/VoiceScreen';
// import WebViewScreen from './src/screens/WebViewScreen';
// import UploadDocument from './src/screens/UploadDocument';
import CustomerSupport from './src/screens/CustomerSupport';

const Stack = createNativeStackNavigator();

const AppContainer = () => {
  const accessToken = isUserLoggedIn();
  const audioAuthenticate = isAudioAuthenticate();

  if (accessToken) {
    if (!audioAuthenticate) {
      return (
        <>
          <Stack.Navigator initialRouteName="VoiceScreen">
            {/* <Stack.Screen
              name="UploadDocument"
              component={UploadDocument}
              options={{animationEnabled: false, headerShown: false}}
            /> */}
            {/* <Stack.Screen
              name="WebViewScreen"
              component={WebViewScreen}
              options={{animationEnabled: false, headerShown: false}}
            /> */}
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
          </Stack.Navigator>
        </>
      );
    } else {
      return (
        <>
          <Stack.Navigator>
            <Stack.Screen
              name="CustomerSupport"
              component={CustomerSupport}
              options={{animationEnabled: false, headerShown: false}}
            />
          </Stack.Navigator>
        </>
      );
    }
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
  LogBox.ignoreLogs(['new NativeEventEmitter']);

  const requestUserPermission = async() => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  const checkFirstNotification = async() => {
    console.log('notification');
    messaging()
    .getInitialNotification()
    .then(remoteMessage => {
        console.log('notification after =>', remoteMessage);
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
        }
      });
  }

  useEffect(() => {
    requestUserPermission();
    checkFirstNotification();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('remote =>', remoteMessage);
      PushNotification.localNotification({
        channelId: 'verifinow',
        title: remoteMessage.notification.title, // (optional)
        message: remoteMessage.notification.body
      });
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    (async () => {
      console.log('FCM token =>', await messaging().getToken());
    })();
  },[])



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
