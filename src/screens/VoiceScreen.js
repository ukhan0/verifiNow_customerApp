import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  Platform,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';

import images from '../constants/images';
import Header from '../components/Header';
import Button from '../components/Button';

const VoiceScreen = () => {
  const [startRecording, setStartRecording] = useState(true);
  const [stopRecording, setStopRecording] = useState(false);
  const [listenRecording, setListenRecording] = useState(false);

  const audioRecorderPlayer = new AudioRecorderPlayer();
  const navigation = useNavigation();

  const onStartRecord = async () => {
    const result = await audioRecorderPlayer.startRecorder();
    audioRecorderPlayer.addRecordBackListener(e => {
      // setState({
      //   recordSecs: e.currentPosition,
      //   recordTime: audioRecorderPlayer.mmssss(
      //     Math.floor(e.currentPosition),
      //   ),
      // });
      // return;
    });
    console.log(result);
  };

  const onStopRecord = async () => {
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    // setState({
    //   recordSecs: 0,
    // });
    console.log(result);
  };

  const onStartPlay = async () => {
    console.log('onStartPlay');
    const msg = await audioRecorderPlayer.startPlayer();
    console.log(msg);
    audioRecorderPlayer.addPlayBackListener(e => {
      // setState({
      //   currentPositionSec: e.currentPosition,
      //   currentDurationSec: e.duration,
      //   playTime: audioRecorderPlayer.mmssss(
      //     Math.floor(e.currentPosition),
      //   ),
      //   duration: audioRecorderPlayer.mmssss(Math.floor(e.duration)),
      // });
      return;
    });
  };

  const onPausePlay = async () => {
    await audioRecorderPlayer.pausePlayer();
  };

  const onStopPlay = async () => {
    console.log('onStopPlay');
    audioRecorderPlayer.stopPlayer();
    audioRecorderPlayer.removePlayBackListener();
  };

  const permissionFunction = useCallback(async () => {
    if (Platform.OS === 'android') {
      try {
        const grants = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ]);

        console.log('write external stroage', grants);

        if (
          grants['android.permission.RECORD_AUDIO'] ===
          PermissionsAndroid.RESULTS.GRANTED
        ) {
          console.log('Permissions granted');
        } else {
          console.log('All required permissions not granted');
          return;
        }
      } catch (err) {
        console.warn(err);
        return;
      }
    }
  });

  useEffect(() => {
    permissionFunction();
  }, [permissionFunction]);

  return (
    <View style={{flex: 1, backgroundColor: '#F5F5F5'}}>
      <Header />
      <View
        style={{
          flex: 1,
          marginTop: StatusBar.currentHeight + 30,
          marginHorizontal: 20,
        }}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}>
          <TouchableOpacity>
            <Image
              resizeMode="contain"
              source={images.cross}
              style={{width: 16, height: 16}}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 20,
              fontFamily: 'Roboto-Medium',
              color: '#000',
              marginLeft: 10,
              marginTop: 50,
            }}>
            Record your voice
          </Text>
          <View
            style={{
              flexGrow: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: 20,
                fontFamily: 'Roboto-Regular',
                color: '#000',
                textAlign: 'center',
                marginHorizontal: 40,
              }}>
              “Hi, my name is Maria.I am Customer of American Express.”
            </Text>
            {startRecording ? (
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                  setStopRecording(true);
                  setStartRecording(false);
                  // onStartRecord()
                }}
                style={{
                  width: 160,
                  height: 160,
                  backgroundColor: '#E60000',
                  borderRadius: 160,
                  borderWidth: 5,
                  borderColor: '#000',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginVertical: 60,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: 'Roboto-Medium',
                    color: '#fff',
                  }}>
                  Record
                </Text>
              </TouchableOpacity>
            ) : stopRecording ? (
              <View style={{alignItems: 'center'}}>
                <Image
                  resizeMode="contain"
                  source={images.recording}
                  style={{width: 160, height: 160, marginTop: 60}}
                />
                <Button
                  title="Stop"
                  onClick={() => {
                    setStopRecording(false);
                    setListenRecording(true);
                    // onStopRecord();
                  }}
                  style={{
                    width: 120,
                    backgroundColor: '#E60000',
                    marginVertical: 40,
                  }}
                />
              </View>
            ) : listenRecording ? (
              <>
                <Image
                  resizeMode="contain"
                  source={images.recording}
                  style={{width: 160, height: 160, marginTop: 60}}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 40,
                  }}>
                  <TouchableOpacity
                  // onPress={() => onStartPlay()}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: 'Roboto-Medium',
                        color: '#E60000',
                      }}>
                      Listen
                    </Text>
                  </TouchableOpacity>
                  <View
                    style={{
                      height: 40,
                      width: 1,
                      backgroundColor: '#C8C8C8',
                      marginHorizontal: 35,
                    }}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      setListenRecording(false);
                      setStartRecording(true);
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: 'Roboto-Medium',
                        color: '#000',
                      }}>
                      Re-record
                    </Text>
                  </TouchableOpacity>
                </View>
                <Button
                  title="Submit"
                  onClick={() => navigation.navigate('ThankYou')}
                  style={{
                    width: 255,
                    backgroundColor: '#575DFB',
                    marginTop: 70,
                    marginBottom: 30,
                  }}
                />
              </>
            ) : null}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default VoiceScreen;
