import React, {Component} from 'react';
import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSet,
  AudioSourceAndroidType,
  PlayBackType,
  RecordBackType,
} from 'react-native-audio-recorder-player';
import {
  View,
  Text,
  Image,
  Platform,
  StatusBar,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';

import images from '../constants/images';
import Header from '../components/Header';
import Button from '../components/Button';

interface State {
  stopRecording: boolean,
  startRecording: boolean,
  listenRecording: boolean,
}

class VoiceScreen extends Component<any, State> {

  private audioRecorderPlayer: AudioRecorderPlayer;

  constructor(props: any) {
    super(props);
    this.state = {
      stopRecording: false,
      startRecording: true,
      listenRecording: false,

    };

    this.audioRecorderPlayer = new AudioRecorderPlayer();
    this.audioRecorderPlayer.setSubscriptionDuration(0.1);
  }

  public render() {

    return (
      <View style={{flex: 1, backgroundColor: '#F5F5F5'}}>
      <Header />
      <View
        style={{
          flex: 1,
          marginTop: StatusBar?.currentHeight + 30,
          marginHorizontal: 20,
        }}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
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
            {this.state.startRecording ? (
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                  this.setState({
                    stopRecording: true,
                    startRecording: false
                  })
                  this.onStartRecord();
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
            ) : this.state.stopRecording ? (
              <View style={{alignItems: 'center'}}>
                <Image
                  resizeMode="contain"
                  source={images.recording}
                  style={{width: 160, height: 160, marginTop: 60}}
                />
                <Button
                  title="Stop"
                  onClick={() => {
                    this.setState({
                      stopRecording: false,
                      listenRecording: true
                    })
                    this.onStopRecord();
                  }}
                  style={{
                    width: 120,
                    backgroundColor: '#E60000',
                    marginVertical: 40,
                  }}
                />
              </View>
            ) : this.state.listenRecording ? (
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
                  <TouchableOpacity onPress={() => this.onStartPlay()}>
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
                      this.setState({
                        listenRecording: false,
                        startRecording: true
                      });
                      this.onStopPlay();
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
                  onClick={() => {
                    this.onStopRecord();
                    this.props.navigation.navigate('ThankYou');
                  }}
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
  }

  private onStartRecord = async () => {
    if (Platform.OS === 'android') {
      try {
        const grants = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ]);

        console.log('write external stroage', grants);

        if (
          grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.READ_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.RECORD_AUDIO'] ===
            PermissionsAndroid.RESULTS.GRANTED
        ) {
          console.log('permissions granted');
        } else {
          console.log('All required permissions not granted');
          return;
        }
      } catch (err) {
        console.warn(err);
        return;
      }
    }

    const audioSet: AudioSet = {
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,
      AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
      AVNumberOfChannelsKeyIOS: 2,
      AVFormatIDKeyIOS: AVEncodingOption.aac,
    };
    //? Default path
    const uri = await this.audioRecorderPlayer.startRecorder(
      undefined,
      audioSet,
    );

    this.audioRecorderPlayer.addRecordBackListener((e: RecordBackType) => {
      console.log('record-back', e);
    });
    console.log(`uri: ${uri}`);
  };

  private onStopRecord = async () => {
    const result = await this.audioRecorderPlayer.stopRecorder();
    this.audioRecorderPlayer.removeRecordBackListener();
    console.log(result);
  };

  private onStartPlay = async () => {
    //? Default path
    const msg = await this.audioRecorderPlayer.startPlayer();
    const volume = await this.audioRecorderPlayer.setVolume(1.0);

    this.audioRecorderPlayer.addPlayBackListener((e: PlayBackType) => {
      console.log(e);
    });
  };

  private onStopPlay = async () => {
    this.audioRecorderPlayer.stopPlayer();
    this.audioRecorderPlayer.removePlayBackListener();
  };
}

export default VoiceScreen;
