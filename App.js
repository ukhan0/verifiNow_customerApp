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
import {
  isAudioAuthenticate,
  isIncodeAuthenticate,
  isUserLoggedIn,
} from './src/redux/auth/selectors';

//Screens
import Login from './src/screens/Login';
import ThankYou from './src/screens/ThankYou';
import VoiceScreen from './src/screens/VoiceScreen';
import CustomerSupport from './src/screens/CustomerSupport';
import IncodeOnboarding from './src/screens/IncodeOnboarding';
import {selfieVerificationApi} from './src/redux/auth/apis';

const Stack = createNativeStackNavigator();

const AppContainer = () => {
  const accessToken = isUserLoggedIn();
  const audioAuthenticate = isAudioAuthenticate();
  const incodeAuthenticate = isIncodeAuthenticate();

  if (accessToken) {
    if (!incodeAuthenticate) {
      return (
        <>
          <Stack.Navigator initialRouteName="IncodeOnboarding">
            <Stack.Screen
              name="IncodeOnboarding"
              component={IncodeOnboarding}
              options={{animationEnabled: false, headerShown: false}}
            />
          </Stack.Navigator>
        </>
      );
    } else if (incodeAuthenticate && !audioAuthenticate) {
      return (
        <>
          <Stack.Navigator initialRouteName="VoiceScreen">
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

  useEffect(() => {
    const customerVerification = async uuid => {
      await IncodeSdk.initialize({
        testMode: false,
        apiConfig: {
          url: 'https://demo-api.incodesmile.com',
          key: 'c244aed4cccdcfa6c3d33420d47259cb0363b5b8',
        },
      });

      IncodeSdk.startFaceLogin({
        showTutorials: true,
        faceMaskCheck: false, // Specify true if you would like to prevent login for users that wear face mask
        customerUUID: uuid,
      })
        .then(faceLoginResult => {
          if (faceLoginResult) {
            selfieVerificationApi(faceLoginResult);
          }
        })
        .catch(e => {
          console.log('catch error =>', e);
          console.error(e.code + ' - ' + e.message);
        });
    };

    PushNotification.configure({
      onRegister: function (token) {
        console.log('TOKEN:', token);
        PushNotification.createChannel(
          {
            channelId: 'fcm_fallback_notification_channel',
            channelName: 'fcm_fallback_notification_channel',
          },
          created => console.log(`createChannel returned '${created}'`),
        );
      },

      onNotification: function (notification) {
        if (notification.userInteraction && notification.data?.uuid) {
          customerVerification(notification.data?.uuid);
        }
      },

      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      popInitialNotification: true,

      requestPermissions: true,
    });
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
};

export default App;
