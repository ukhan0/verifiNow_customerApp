import React, {useEffect, useState} from 'react';
import {View, ActivityIndicator, Text, StatusBar} from 'react-native';
import {useSelector} from 'react-redux';
import IncodeSdk from 'react-native-incode-sdk';
import {useNavigation} from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';

import {isUserLoggedIn} from '../redux/auth/selectors';
import {fcmTokenApi} from '../redux/auth/apis';

const IncodeOnboarding = () => {
  const navigation = useNavigation();

  const accessToken = isUserLoggedIn();
  const userId = useSelector(state => state.auth?.customerInfo?.id.toString());

  const [showLoading, setShowLoading] = useState(true);
  const [customerToken, setCustomerToken] = useState('');
  const [customerUUID, setCustomerUUID] = useState('');

  // useEffect(() => {
  //   async () => {
  //     const fcmToken = await messaging().getToken();
  //     if (accessToken) {
  //       fcmTokenApi(fcmToken, accessToken);
  //     }
  //   };
  // }, [accessToken]);

  useEffect(() => {
    initializeAndRunOnboarding();
  }, []);

  const initializeAndRunOnboarding = async () => {
    IncodeSdk.initialize({
      testMode: false,
      apiConfig: {
        key: 'c244aed4cccdcfa6c3d33420d47259cb0363b5b8',
        url: 'https://demo-api.incodesmile.com',
      },
    })
      .then(_ => {
        startOnboarding();
      })
      .catch(e => console.error('Incode SDK failed init', e));
  };

  const startOnboarding = () => {
    IncodeSdk.startOnboarding({
      flowConfig: [
        {module: 'IdScan'},
        {module: 'SelfieScan'},
        {module: 'FaceMatch'},
        {module: 'Approve'},
      ],
      sessionConfig: {
        configurationId: '6321a1afb33ee5aa18babfe1',
        externalId: userId,
      },
    })
      .then(result => {
        if (result.status === 'userCancelled') {
          setShowLoading(true);
          startOnboarding();
        }
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    const unsubscribers = setupListeners();
    return () => {
      unsubscribers.forEach(unsubscriber => unsubscriber());
    };
  }, []);

  const setupListeners = () => {
    IncodeSdk.onSessionCreated(session => {
      setShowLoading(false);
      console.log(
        'Onboarding session created, interviewId: ' + session.interviewId,
      );
    });

    const complete = IncodeSdk.onStepCompleted;
    return [
      complete({
        module: 'IdScanFront',
        listener: e => {
          console.log('ID scan front:', e.result);
          if (e.result.status !== 'ok') {
            console.log('yoo man =>');
            setupListeners();
          }
        },
      }),
      complete({
        module: 'IdScanBack',
        listener: e => {
          console.log('ID scan back: ', e.result);
        },
      }),
      complete({
        module: 'ProcessId',
        listener: e => {
          console.log('ProcessId result: ', e.result.extendedOcrData);
        },
      }),
      complete({
        module: 'SelfieScan',
        listener: e => {
          console.log('Selfie scan complete', e.result);
        },
      }),

      complete({
        module: 'FaceMatch',
        listener: e => {
          console.log('Face match complete', e.result);
        },
      }),
      complete({
        module: 'Approve',
        listener: e => {
          console.log('Approve token: ', e.result);
          setCustomerToken(e.result.customerToken);
          setCustomerUUID(e.result.id);
        },
      }),
    ];
  };

  if (showLoading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff',
        }}>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        <ActivityIndicator size={45} color="#e60000" />
        <Text
          style={{
            fontSize: 16,
            fontFamily: 'Roboto-Bold',
            color: '#000',
            alignSelf: 'center',
            textAlign: 'center',
            marginTop: 10,
          }}>
          Loading Please Wait...
        </Text>
      </View>
    );
  }
};

export default IncodeOnboarding;
