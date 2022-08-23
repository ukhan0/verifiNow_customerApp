import React from "react";
import { View, StatusBar } from "react-native";

const Header = () => {
  return (
    <View>
      <StatusBar translucent backgroundColor='#F5F5F5' barStyle='dark-content' />
    </View>
  )
}

export default Header;