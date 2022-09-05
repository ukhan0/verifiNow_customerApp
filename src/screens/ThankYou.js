import React from 'react';
import {View, Text, StatusBar} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import { useDispatch } from 'react-redux';

import Header from '../components/Header';
import Button from '../components/Button';
import { audioOnBoard } from '../redux/auth/actions';

const ThankYou = (route) => {
  const dispatch = useDispatch();

  const audioResponse = route?.route?.params?.response;

  return (
    <View style={{flex: 1, backgroundColor: '#F5F5F5'}}>
      <Header />
      <View
        style={{
          flexGrow: 1,
          marginHorizontal: 20,
          marginTop: StatusBar.currentHeight + 70,
        }}>
        <Text
          style={{
            fontSize: 32,
            fontFamily: 'Roboto-Light',
            color: '#000',
          }}>
          Thank You
        </Text>
        <Text
          style={{
            fontSize: 20,
            fontFamily: 'Roboto-Bold',
            color: '#000',
            marginTop: 10,
          }}>
          Maria John
        </Text>
        <Text
          style={{
            fontSize: 20,
            fontFamily: 'Roboto-Light',
            color: '#000',
            marginTop: 40,
          }}>
          Your ID has been verified and you can stat using our service.
        </Text>
        <View style={{flex: 1, justifyContent: 'flex-end', marginBottom: 40}}>
          <Button
            onClick={() => dispatch(audioOnBoard(audioResponse))}
            title="Start using our Serivce"
          />
        </View>
      </View>
    </View>
  );
};

export default ThankYou;
