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
  AppState,
} from 'react-native';
import moment from 'moment/moment';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import images from '../constants/images';
import Button from '../components/Button';
import Header from '../components/Header';
import LogoutModal from '../components/LogoutModal';
import {getCustomerHistory} from '../redux/auth/apis';
import { twillioNumber } from '../utils/incodeCredentials';

const CustomerSupport = () => {
  const [showLoading, setShowLoading] = useState(false);

  const modalRef = useRef();
  const navigation = useNavigation();
  const userInfo = useSelector(state => state.auth?.customerInfo);
  const customerHistory = useSelector(state => state.auth?.verificationHistory);

  useEffect(() => {
    AppState.addEventListener('change', handleChange);  
  
    LogBox.ignoreAllLogs();
    const unsubscribe = navigation.addListener('focus', () => {
      (async () => {
        setShowLoading(true);
        await getCustomerHistory(userInfo?.id);
        setShowLoading(false);
      })();
    });
    return () => {
      unsubscribe;
      AppState.removeEventListener('change', handleChange);  
    }
  }, [userInfo, navigation]);
  
  const handleChange = async (newState) => {
    if (newState === "active") {
      setShowLoading(true);
      await getCustomerHistory(userInfo?.id);
      setShowLoading(false);
    }
  }

  return (
    <View style={{flex: 1, backgroundColor: '#F5F5F5'}}>
      <Header />
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          onPress={() => modalRef.current.getAlert()}
          style={{
            position: 'absolute',
            top: 50,
            right: 20,
          }}>
          <Image source={images.logout} style={{width: 23, height: 23}} />
        </TouchableOpacity>
        <LogoutModal ref={modalRef} />
        <View
          style={{
            marginHorizontal: 20,
            marginTop: StatusBar.currentHeight + 70,
            alignItems: 'center',
          }}>
          <Image
            resizeMode="contain"
            source={images.logo}
            style={{width: 188, height: 68}}
          />
          <Text
            style={{
              fontSize: 20,
              fontFamily: 'Roboto-Bold',
              color: '#000',
              marginTop: 18,
            }}>
            {userInfo?.name}
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontFamily: 'Roboto-Light',
              color: '#000',
              marginVertical: 40,
              marginHorizontal: 40,
              textAlign: 'left',
            }}>
            You will receive notification to verify yourself during call with
            our customer support agents.App will ask you to verify yourself by
            taking a selfie.
          </Text>
          <Button
            icon={true}
            onClick={() => Linking.openURL(`tel:${twillioNumber}`)}
            title="Call Customer support"
            style={{
              width: 220,
              backgroundColor: '#4CD964',
              marginVertical: 20,
            }}
          />
        </View>
        <Text
          style={{
            fontSize: 16,
            fontFamily: 'Roboto-Medium',
            color: '#000',
            marginLeft: 20,
            marginTop: 50,
            marginBottom: 20,
          }}>
          Call History
        </Text>

        {showLoading ? (
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator size={30} color="#e60000" />
          </View>
        ) : !showLoading && customerHistory?.length ? (
          <FlatList
            nestedScrollEnabled
            style={{maxHeight: 500}}
            data={customerHistory}
            keyExtractor={(item, index) => index}
            renderItem={(info, index) => {
              const calenderDate = moment(info?.item?.created_at).format(
                'MM/DD/YYYY',
              );
              const time = moment(info?.item?.created_at).format('h:mm a');
              return (
                <View
                  key={index}
                  style={{
                    flexGrow: 1,
                    marginHorizontal: 20,
                  }}>
                  <View style={{marginTop: 20}}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: 'Roboto-Light',
                        color: '#000',
                      }}>
                      Time : {time}
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: 'Roboto-Light',
                        color: '#000',
                        marginTop: 5,
                      }}>
                      Date : {calenderDate}
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: 'Roboto-Light',
                        color: '#000',
                        marginTop: 5,
                      }}>
                      {info?.item?.type} {info?.item?.status == '0' ? 'FAILED' : 'PASSED'}
                    </Text>
                  </View>
                  <View
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: '#757575',
                      marginTop: 25,
                    }}
                  />
                </View>
              );
            }}
          />
        ) : (
          <View>
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'Roboto-Light',
                color: '#000',
                marginVertical: 5,
                alignSelf: 'center',
              }}>
              No History Found
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default CustomerSupport;
