import React from 'react';
import {View, Text, StatusBar} from 'react-native';

import Header from '../components/Header';
import Button from '../components/Button';

const ThankYou = () => {
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
          <Button title='Start using our Serivce' style={{}} />
        </View>
      </View>
    </View>
  );
};

export default ThankYou;
