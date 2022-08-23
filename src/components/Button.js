import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

const Button = ({title, style, textStyle, onClick}) => {
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
        },
        style,
      ]}>
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
    </TouchableOpacity>
  );
};

export default Button;
