import React, {useEffect} from 'react';
import {LogBox} from 'react-native';
import IncodeSdk from 'react-native-incode-sdk';
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
import CustomerSupport from './src/screens/CustomerSupport';
import IncodeOnboarding from './src/screens/IncodeOnboarding';

const Stack = createNativeStackNavigator();

const AppContainer = () => {
  const accessToken = isUserLoggedIn();
  const audioAuthenticate = isAudioAuthenticate();

  if (accessToken) {
    if (!audioAuthenticate) {
      return (
        <>
          <Stack.Navigator initialRouteName="IncodeOnboarding">
            <Stack.Screen
              name="IncodeOnboarding"
              component={IncodeOnboarding}
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

const App = () => {
  LogBox.ignoreLogs(['new NativeEventEmitter']);

  const accessToken = store.getState().auth.customerInfo?.access_token;

  const notifyChannel = () => {
    PushNotification.createChannel(
      {
        channelId: 'verifinow',
        channelName: 'General',
        channelDescription: 'General Channel',
        playSound: true,
        soundName: 'default',
        vibrate: true,
      },
      created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
    );
  };

  useEffect(() => {
    notifyChannel();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      PushNotification.localNotification({
        channelId: 'verifinow',
        title: remoteMessage.notification.title,
        message: remoteMessage.notification.body,
      });
    });

    const customerVerification = async () => {
      await IncodeSdk.initialize({
        testMode: false,
        apiConfig: {
          key: 'c244aed4cccdcfa6c3d33420d47259cb0363b5b8',
          url: 'https://demo-api.incodesmile.com',
        },
      });

      IncodeSdk.startFaceLogin({
        showTutorials: true,
        faceMaskCheck: false, // Specify true if you would like to prevent login for users that wear face mask
        customerUUID: '632834cdb33ee5aa18c4e6a1',
      })
        .then(faceLoginResult => {
          console.log('faceLoginResult =>', faceLoginResult);
        })
        .catch(e => {
          console.error(e.code + ' - ' + e.message);
        });
    };

    messaging().onNotificationOpenedApp(async remoteMessage => {
      customerVerification();
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    (async () => {
      console.log('access token =>', accessToken);
      console.log('FCM token =>', await messaging().getToken());
    })();
  }, []);

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
