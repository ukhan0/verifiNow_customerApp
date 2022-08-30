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
import {useDispatch, useSelector} from 'react-redux';

import images from '../constants/images';
import Header from '../components/Header';
import Button from '../components/Button';
import {SERVER_URL} from '../utils/baseUrl';
import {login, loginfailed, loginSuccess} from '../redux/auth/actions';

const Login = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loading = useSelector(state => state.auth.loading);

  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const loginApi = async () => {
    try {
      dispatch(login());
      const response = await fetch(SERVER_URL + '/customers/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const resp = await response.json();
      if (resp?.data) {
        dispatch(loginSuccess(resp?.data));
      } else {
        Snackbar.show({
          text: resp?.message,
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: '#575DFB',
        });
      }
    } catch (error) {
      console.log('Login Error =>', error);
    } finally {
      dispatch(loginfailed());
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#F5F5F5',
      }}>
      <Header />
      <ScrollView
        keyboardShouldPersistTaps="always"
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
                value={email}
                onChangeText={name => setEmail(name)}
                style={{
                  flexGrow: 1,
                  padding: 0,
                  marginLeft: 15,
                  marginRight: email ? 50 : 0,
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
              loading={loading}
              onClick={() => {
                if (email && password) {
                  if (!validateEmail(email)) {
                    Snackbar.show({
                      text: 'Email input is wrong! Use abc@xyz.com pattern',
                      duration: Snackbar.LENGTH_SHORT,
                      backgroundColor: '#575DFB',
                    });
                  } else {
                    loginApi();
                  }
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
