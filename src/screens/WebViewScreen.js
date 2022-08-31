import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import {WebView} from 'react-native-webview';
import {useNavigation} from '@react-navigation/native';
import { useSelector } from 'react-redux';

import Header from '../components/Header';

const ActivityIndicatorElement = () => {
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <ActivityIndicator size="large" />
    </View>
  );
};

const WebViewScreen = () => {
  const navigation = useNavigation();
  const jumioOnBoardingLink = useSelector(state => state.auth.customerInfo?.jumio?.web?.href);

  const navigationState = nextState => {
    if (nextState.url.includes('customerJumioSuccess')) {
      navigation.navigate('VoiceScreen');
    } else if (nextState.url.includes('customerJumioFail')) {
      navigation.navigate('VoiceScreen');
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#F5F5F5',
      }}>
      <Header />
      <WebView
        style={{flex: 1}}
        startInLoadingState={true}
        renderLoading={ActivityIndicatorElement}
        onNavigationStateChange={navigationState}
        source={{
          uri: jumioOnBoardingLink,
        }}
      />
    </View>
  );
};

export default WebViewScreen;
