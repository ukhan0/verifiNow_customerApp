import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import images from '../constants/images';
import Header from '../components/Header';
import Button from '../components/Button';

const UploadDocument = () => {
  const [termsToggle, setTermsToggle] = useState(false);

  const navigation = useNavigation();
  console.log(termsToggle);
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
            flexGrow: 1,
            marginHorizontal: 20,
            marginTop: StatusBar.currentHeight + 80,
          }}>
          <Text
            style={{
              fontSize: 20,
              fontFamily: 'Roboto-Bold',
              color: '#000',
              textAlign: 'center',
            }}>
            Terms and condition
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontFamily: 'Roboto-Regular',
              color: '#000',
              alignSelf: 'center',
              textAlign: 'justify',
              marginTop: 50,
              marginHorizontal: 20,
            }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat.
          </Text>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => setTermsToggle(!termsToggle)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 32,
              marginLeft: 20,
            }}>
            {termsToggle ? (
              <Image
                source={images.unChecked}
                resizeMode="contain"
                style={{width: 30, height: 30}}
              />
            ) : (
              <Image
                source={images.checked}
                resizeMode="contain"
                style={{width: 30, height: 30}}
              />
            )}
            <Text
              style={{
                fontSize: 18,
                fontFamily: 'Roboto-Light',
                color: '#000',
                marginLeft: 5,
                marginBottom: 3,
              }}>
              Agree the terms of this service
            </Text>
          </TouchableOpacity>
          <View
            style={{
              flexGrow: 1,
              justifyContent: 'flex-end',
              marginVertical: 35,
            }}>
            <Button
              title="Next"
              disable={termsToggle}
              onClick={() => navigation.navigate('IncodeOnboarding')}
              style={{
                backgroundColor: '#E60000',
                opacity: termsToggle ? 0.5 : 1,
              }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default UploadDocument;
