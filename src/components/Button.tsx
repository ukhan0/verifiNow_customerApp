import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import images from '../constants/images';

const Button = ({title, style, textStyle, onClick, icon, tintColor, loading}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={onClick}
      style={[
        {
          backgroundColor: '#575DFB',
          alignItems: 'center',
          height: 56,
          justifyContent: 'center',
          borderRadius: 16,
          flexDirection: 'row',
        },
        style,
      ]}>
      {icon && (
        <Image
          resizeMode="contain"
          source={images.call}
          style={[
            {width: 14, height: 14, marginRight: 7},
            {tintColor: tintColor},
          ]}
        />
      )}
      {loading ? (
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size="small" color="#4CD964" />
        </View>
      ) : (
        <Text
          style={[
            {
              fontSize: 16,
              fontFamily: 'Roboto-Medium',
              color: '#fff',
            },
            textStyle,
          ]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
