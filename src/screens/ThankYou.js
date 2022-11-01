import React from 'react';
import {View, Text, StatusBar, ScrollView} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';

import Header from '../components/Header';
import Button from '../components/Button';
import {audioOnBoard} from '../redux/auth/actions';

const ThankYou = route => {
  const dispatch = useDispatch();

  const userInfo = useSelector(state => state.auth?.customerInfo);

  const audioResponse = route?.route?.params?.response;

  return (
    <View style={{flex: 1, backgroundColor: '#F5F5F5'}}>
      <Header />
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
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
            {userInfo?.name}
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontFamily: 'Roboto-Light',
              color: '#000',
              marginTop: 40,
            }}>
            Your ID has been verified and you can start using our service.
          </Text>
          <View style={{flexGrow: 1, justifyContent: 'center', marginTop: 30}}>
            <Text
              style={{
                fontSize: 20,
                fontFamily: 'Roboto-Light',
                color: '#000',
                alignSelf: 'center',
                textAlign: 'justify',
              }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat.
            </Text>
          </View>
          <View
            style={{flex: 1, justifyContent: 'flex-end', marginVertical: 40}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Button
                onClick={() => dispatch(audioOnBoard(audioResponse))}
                title="Agree"
                style={{width: '45%', backgroundColor: '#4CD964'}}
              />
              <Button
                // onClick={() => dispatch(audioOnBoard(audioResponse))}
                title="Disagree"
                style={{
                  width: '45%',
                  backgroundColor: '#F5F5F5',
                  borderWidth: 1.5,
                  borderColor: 'rgba(0, 0, 0, 0.4)',
                }}
                textStyle={{color: '#000'}}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ThankYou;
