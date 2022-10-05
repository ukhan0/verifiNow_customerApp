import React, {useEffect, useState} from 'react';
import {View, ActivityIndicator, Text, StatusBar} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import IncodeSdk from 'react-native-incode-sdk';
import Snackbar from 'react-native-snackbar';

import {
  setSelfieInfo,
  setBackIDInfo,
  setFrontIDInfo,
  setCustomerUUID,
  setCustomerToken,
  setCustomerInterviewId,
  faceMatchInfo,
} from '../redux/auth/actions';
import {storeIncodeInfoApi} from '../redux/auth/apis';
import { apiKey, apiUrl } from '../utils/incodeCredentials';
import {isIncodeAuthenticate, isUserLoggedIn} from '../redux/auth/selectors';

const IncodeOnboarding = () => {
  const dispatch = useDispatch();

  const accessToken = isUserLoggedIn();
  const incodeAuthenticate = isIncodeAuthenticate();
  const userId = useSelector(state => state.auth?.customerInfo?.id.toString());

  const [showLoading, setShowLoading] = useState(true);

  const storeIncodeData = status => {
    storeIncodeInfoApi(accessToken, status);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!incodeAuthenticate) {
        initializeAndRunOnboarding();
      }
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, [incodeAuthenticate]);

  const initializeAndRunOnboarding = async () => {
    IncodeSdk.initialize({
      testMode: false,
      apiConfig: {
        key: apiKey,
        url: apiUrl,
      },
    })
      .then(_ => {
        startOnboarding();
      })
      .catch(e => console.error('Incode SDK failed init', e));
  };

  const startOnboarding = () => {
    const jsonTheme = JSON.stringify({
      buttons: {
        primary: {
          states: {
            normal: {
              backgroundColor: '#E60000',
            },
            highlighted: {
              backgroundColor: '#E60000',
            },
          },
        },
      },
    });

    IncodeSdk.setTheme({jsonTheme: jsonTheme});

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
      console.log('session created =>', session.interviewId);
      setShowLoading(false);
      dispatch(setCustomerToken(session.token));
      dispatch(setCustomerInterviewId(session.interviewId));
    });

    const complete = IncodeSdk.onStepCompleted;
    return [
      complete({
        module: 'IdScanFront',
        listener: e => {
          dispatch(setFrontIDInfo(e.result));
          console.log('ID scan front:', e.result);
        },
      }),
      complete({
        module: 'IdScanBack',
        listener: e => {
          dispatch(setBackIDInfo(e.result));
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
          dispatch(setSelfieInfo(e.result));
        },
      }),

      complete({
        module: 'FaceMatch',
        listener: e => {
          dispatch(faceMatchInfo(e.result));
          console.log('Face match complete', e.result);
          if (e.result.existingUser) {
            Snackbar.show({
              text: 'User Already Exist',
              duration: Snackbar.LENGTH_SHORT,
              backgroundColor: '#575DFB',
            });
            IncodeSdk.finishOnboardingFlow();
            setShowLoading(true);
            startOnboarding();
          }
        },
      }),
      complete({
        module: 'Approve',
        listener: async e => {
          console.log('Approve Info=>', e.result);
          if (e.result.id) {
            dispatch(setCustomerUUID(e.result.id));
            storeIncodeData('success');
            IncodeSdk.finishOnboardingFlow();
          } else {
            setShowLoading(true);
            startOnboarding();
          }
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
