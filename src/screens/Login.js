import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Image,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import images from '../constants/images';
import Header from '../components/Header';
import Button from '../components/Button';

const Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View
      style={{
        flex: 1,
        marginTop: StatusBar.currentHeight + 80,
      }}>
      <Header />
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsHorizontalScrollIndicator={false}>
        <Image
          resizeMode="contain"
          source={images.logo}
          style={{width: 188, height: 68, alignSelf: 'center'}}
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
                keyboardType="visible-password"
                secureTextEntry={true}
                value={password}
                onChange={password => setPassword(password)}
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
            <Button title="Login" />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Login;
