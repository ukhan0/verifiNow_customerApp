import React, {useEffect} from 'react';
import {LogBox, Platform, Alert} from 'react-native';
import Snackbar from 'react-native-snackbar';
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
import { apiKey, apiUrl } from './src/utils/incodeCredentials';

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

  const showNotification = notification => {
    Alert.alert(
      notification?.notification?.title,
      notification?.notification?.body,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () =>
            customerVerification(notification?.notification?.data?.uuid),
        },
      ],
    );
  };

  const customerVerification = async uuid => {
    console.log('uuid =>', uuid);
    await IncodeSdk.initialize({
      testMode: false,
      apiConfig: {
        url: apiUrl,
        key: apiKey,
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
        console.log('catch error =>', e, uuid);
        Snackbar.show({
          text: 'Error while calculating face recognition/liveness confidence',
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: '#575DFB',
        });
      });
  };

  useEffect(() => {
    messaging().onMessage(message => {
      if (Platform.OS === 'ios') {
        showNotification(message);
      }
    });

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
