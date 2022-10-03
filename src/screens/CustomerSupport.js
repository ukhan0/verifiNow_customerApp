import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  ScrollView,
  Linking,
  AppState,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment/moment';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import images from '../constants/images';
import Button from '../components/Button';
import Header from '../components/Header';
import LogoutModal from '../components/LogoutModal';
import {getCustomerHistory} from '../redux/auth/apis';

const CustomerSupport = () => {
  const [customerHistory, setCustomerHistory] = useState(null);
  const [showCallButtons, setShowCallButtons] = useState(false);

  const modalRef = useRef();
  const navigation = useNavigation();
  const userInfo = useSelector(state => state.auth?.customerInfo);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      (async () => {
        const data = await getCustomerHistory(userInfo?.id);
        setCustomerHistory(data ? data : []);
      })();
    });
    return unsubscribe;
  }, [userInfo, navigation]);

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
            opacity: showCallButtons ? 0.5 : 1,
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
          {!showCallButtons && (
            <>
              <Button
                icon={true}
                onClick={() => setShowCallButtons(true)}
                title="Call Customer support"
                style={{
                  width: 220,
                  backgroundColor: '#4CD964',
                  marginVertical: 20,
                }}
              />
            </>
          )}
        </View>
        {showCallButtons && (
          <View
            style={{
              flexGrow: 1,
              justifyContent: 'flex-end',
              marginHorizontal: 20,
              marginBottom: 30,
            }}>
            <Button
              icon={true}
              title="Call +1 (424) 577-4760"
              tintColor="#969696"
              textStyle={{color: '#575DFB'}}
              onClick={() => {
                Linking.openURL(`tel:+14245774760`);
              }}
              style={{
                borderWidth: 1,
                borderColor: '#B4B4B8',
                backgroundColor: '#fff',
              }}
            />
            <Button
              title="Cancel"
              onClick={() => setShowCallButtons(false)}
              textStyle={{color: '#575DFB'}}
              style={{
                marginTop: 15,
                borderWidth: 1,
                borderColor: '#B4B4B8',
                backgroundColor: '#fff',
              }}
            />
          </View>
        )}
        
        {customerHistory?.length && (
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'Roboto-Medium',
              color: '#000',
              marginLeft: 20,
              marginTop: 50,
              marginBottom: 20
            }}>
            Call History
          </Text>
        )}

        {customerHistory?.length &&
          customerHistory.map((info, index) => {
            const calenderDate = moment(info?.created_at).format('MM/DD/YYYY');
            const time = moment(info?.created_at).format('ha');

            return (
              <View
                key={index}
                style={{
                  flexGrow: 1,
                  marginHorizontal: 20,
                  opacity: showCallButtons ? 0.5 : 1,
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
                      marginTop: 5
                    }}>
                    Date : {calenderDate}
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: 'Roboto-Light',
                      color: '#000',
                      marginTop: 5
                    }}>
                    {info?.type} {info?.status == '0' ? 'FAILED' : 'PASSED' }
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
          })}
        
      </ScrollView>
    </View>
  );
};

export default CustomerSupport;
