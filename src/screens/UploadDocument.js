import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  LogBox,
  StatusBar,
  NativeModules,
  NativeEventEmitter,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import images from '../constants/images';
import Header from '../components/Header';
import Button from '../components/Button';

const {JumioMobileSDK} = NativeModules;

LogBox.ignoreLogs(["new NativeEventEmitter"]);

// Callbacks - (Data is displayed as a warning for demo purposes)
const emitterJumio = new NativeEventEmitter(JumioMobileSDK);
emitterJumio.addListener('EventResult', EventResult =>
  console.warn('EventResult: ' + JSON.stringify(EventResult)),
);
emitterJumio.addListener('EventError', EventError =>
  console.warn('EventError: ' + JSON.stringify(EventError)),
);

const UploadDocument = () => {
  const navigation = useNavigation();

  // Jumio SDK
  const startJumio = () => {
    JumioMobileSDK.initialize(
      'eyJhbGciOiJIUzUxMiIsInppcCI6IkdaSVAifQ.H4sIAAAAAAAAAJXOTQoCMQwF4Lt0baBp0z93MlRwocKoa0kz6QkEBfHudryBmyze-3jkbfS1e5itwRixBHLkHZLZGBY5LCPPRbjjEsFSYaDMFlgxQE6tqy3S2OaV_7Ak55SpQV7SwLK6gAqRMDTXx-068LPrP1xm7UNPt8v1fKzzfa77OtfTVNfuN-Rt7OMbDyHGDITooTVWSMl5sVrESjGfL1JDX6jsAAAA.HtFepNqaB5xi8EjqkUH_ZDuC6FuDgLX8fTzdPL7R_zSTJAsmoZZ7wXBjmD55j69HKoY2AAgt1yRPxTU5f9umdw',
      'US',
    );
    JumioMobileSDK.start();
    // navigation.navigate('VoiceScreen');
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#F5F5F5',
      }}>
      <Header />
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsHorizontalScrollIndicator={false}>
        <View
          style={{
            marginHorizontal: 20,
            marginTop: StatusBar.currentHeight + 80,
          }}>
          <Text
            style={{
              fontSize: 20,
              fontFamily: 'Roboto-Bold',
              color: '#000',
            }}>
            Upload Document
          </Text>
          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 40}}>
            <Image
              resizeMode="contain"
              source={images.capture}
              style={{width: 25, height: 22}}
            />
            <Text
              style={{
                fontSize: 20,
                fontFamily: 'Roboto-Regular',
                color: '#000',
                marginLeft: 16,
              }}>
              Capture Identification Card
            </Text>
          </View>
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'Roboto-Light',
              color: '#000',
              alignSelf: 'center',
              textAlign: 'center',
              marginTop: 10,
              width: '90%',
            }}>
            Make sure you have the correct ID. let’s capture the front face of
            your identity Document.
          </Text>
          <View
            style={{
              marginTop: 36,
              width: 304,
              height: 304,
              backgroundColor: 'rgba(217, 217, 217, 0.35)',
              alignSelf: 'center',
              borderRadius: 304,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              resizeMode="contain"
              source={images.documentScan}
              style={{width: 245, height: 135}}
            />
          </View>
          <Button
            title="Capture"
            onClick={() => navigation.navigate('WebViewScreen')}
            style={{marginVertical: 80, backgroundColor: '#E60000'}}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default UploadDocument;
