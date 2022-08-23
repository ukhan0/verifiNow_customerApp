import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Image,
  StatusBar,
} from 'react-native';
import Snackbar from 'react-native-snackbar';
import {useNavigation} from '@react-navigation/native';

import images from '../constants/images';
import Header from '../components/Header';
import Button from '../components/Button';

const Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#F5F5F5',
      }}>
      <Header />
      <ScrollView
        keyboardShouldPersistTaps='always'
        contentContainerStyle={{flexGrow: 1}}
        showsHorizontalScrollIndicator={false}>
        <Image
          resizeMode="contain"
          source={images.logo}
          style={{
            width: 188,
            height: 68,
            alignSelf: 'center',
            marginTop: StatusBar.currentHeight + 80,
          }}
        />
        <View style={{marginHorizontal: 20, marginVertical: 50}}>
          <View>
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'Roboto-Regular',
                color: '#000',
              }}>
              Name
            </Text>
            <View
              style={{
                height: 56,
                borderColor: '#000',
                borderWidth: 1.5,
                borderRadius: 16,
                marginTop: 6,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Image
                resizeMode="contain"
                source={images.name}
                style={{
                  width: 16,
                  height: 18,
                  tintColor: '#000',
                  marginLeft: 20,
                }}
              />
              <TextInput
                placeholder="Ex. Saul Ramirez"
                placeholderTextColor="#C8C8C8"
                value={userName}
                onChange={name => setUserName(name)}
                style={{
                  flexGrow: 1,
                  padding: 0,
                  marginLeft: 15,
                  marginRight: userName ? 50 : 0,
                  fontFamily: 'Roboto-Regular',
                  fontSize: 16,
                }}
              />
            </View>
          </View>
          <View style={{marginTop: 30}}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'Roboto-Regular',
                color: '#000',
              }}>
              Password
            </Text>
            <View
              style={{
                height: 56,
                borderColor: '#000',
                borderWidth: 1.5,
                borderRadius: 16,
                marginTop: 6,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Image
                resizeMode="contain"
                source={images.password}
                style={{
                  width: 16,
                  height: 18,
                  tintColor: '#000',
                  marginLeft: 20,
                }}
              />
              <TextInput
                placeholder="**********"
                placeholderTextColor="#C8C8C8"
                secureTextEntry={true}
                value={password}
                onChangeText={password => setPassword(password)}
                style={{
                  flexGrow: 1,
                  padding: 0,
                  marginHorizontal: 15,
                  marginRight: password ? 50 : 0,
                  fontFamily: 'Roboto-Regular',
                  fontSize: 16,
                }}
              />
            </View>
          </View>
          {/* <TouchableOpacity>
            <Text
              style={{
                fontSize: 13,
                fontFamily: 'Roboto-Regular',
                color: '#575DFB',
                marginVertical: 35,
              }}>
              Forget Password?
            </Text>
          </TouchableOpacity> */}
          <View style={{marginTop: 40}}>
            <Button
              onClick={() => {
                if (userName && password) {
                  navigation.navigate('UploadDocument');
                } else {
                  Snackbar.show({
                    text: 'Please fill all fields',
                    duration: Snackbar.LENGTH_SHORT,
                    backgroundColor: '#575DFB',
                  });
                }
              }}
              title="Login"
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Login;
