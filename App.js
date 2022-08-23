import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Login from './src/screens/Login';
import UploadDocument from './src/screens/UploadDocument';

const Stack = createNativeStackNavigator();

const AppContainer = () => {
  const accessToken = true;
  if (accessToken) {
    return (
      <>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{animationEnabled: false, headerShown: false}}
          />
          <Stack.Screen
            name="UploadDocument"
            component={UploadDocument}
            options={{animationEnabled: false, headerShown: false}}
          />
        </Stack.Navigator>
      </>
    );
  } else {
    return (
      <>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{animationEnabled: false, headerShown: false}}
          />
        </Stack.Navigator>
      </>
    );
  }
};

function App() {
  return (
    <NavigationContainer>
      <AppContainer />
    </NavigationContainer>
  );
}

export default App;