import React, {useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  ScrollView,
  Linking,
  TouchableOpacity,
} from 'react-native';
import {useDispatch} from 'react-redux';

import images from '../constants/images';
import Button from '../components/Button';
import Header from '../components/Header';
import {logout} from '../redux/auth/actions';

const CustomerSupport = () => {
  const dispatch = useDispatch();

  const [showCallButtons, setShowCallButtons] = useState(false);

  return (
    <View style={{flex: 1, backgroundColor: '#F5F5F5'}}>
      <Header />
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          onPress={() => dispatch(logout())}
          style={{
            position: 'absolute',
            top: 50,
            right: 20,
          }}>
          <Image source={images.logout} style={{width: 23, height: 23}} />
        </TouchableOpacity>
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
            Maria John
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
        <View
          style={{
            flexGrow: 1,
            marginHorizontal: 20,
            marginVertical: 50,
            opacity: showCallButtons ? 0.5 : 1,
          }}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'Roboto-Medium',
              color: '#000',
            }}>
            Call History
          </Text>

          <View style={{marginTop: 40}}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'Roboto-Light',
                color: '#000',
              }}>
              Time : 3pm
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'Roboto-Light',
                color: '#000',
              }}>
              Date : 02/02/2022
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'Roboto-Light',
                color: '#000',
              }}>
              Audio Verification
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
              title="Call +92034567890"
              tintColor="#969696"
              textStyle={{color: '#575DFB'}}
              onClick={() => {
                Linking.openURL(`tel:+923452903810`);
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
      </ScrollView>
    </View>
  );
};

export default CustomerSupport;
