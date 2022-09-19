import React from 'react';
import {View, StatusBar} from 'react-native';

const Header = ({hidden}) => {
  return (
    <View>
      <StatusBar
        translucent
        backgroundColor="#F5F5F5"
        barStyle="dark-content"
        hidden={hidden}
      />
    </View>
  );
};

export default Header;
