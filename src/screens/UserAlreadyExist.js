import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  ScrollView,
  Linking,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  LogBox,
} from 'react-native';
import moment from 'moment/moment';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import images from '../constants/images';
import Button from '../components/Button';
import Header from '../components/Header';
import LogoutModal from '../components/LogoutModal';
import {getCustomerHistory} from '../redux/auth/apis';
import {twillioNumber} from '../utils/incodeCredentials';

const UserAlreadyExist = () => {
  const modalRef = useRef();
  const navigation = useNavigation();

  return (
    <View style={{flex: 1, backgroundColor: '#F5F5F5'}}>
      <Header />
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          marginHorizontal: 20,
        }}>
        <TouchableOpacity
          onPress={() => modalRef.current.getAlert()}
          style={{
            position: 'absolute',
            top: 50,
            right: 0,
          }}>
          <Image source={images.logout} style={{width: 23, height: 23}} />
        </TouchableOpacity>
        <LogoutModal ref={modalRef} />
        <Text
          style={{
            fontSize: 18,
            fontFamily: 'Roboto-Regular',
            color: '#000',
            textAlign: 'center',
          }}>
          User Already Exists
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontFamily: 'Roboto-Light',
            color: '#000',
            textAlign: 'center',
            marginTop: 10,
            marginHorizontal: 20
          }}>
          Another user found with the same ID card details. Please contact administrator.
        </Text>
      </View>
    </View>
  );
};

export default UserAlreadyExist;
