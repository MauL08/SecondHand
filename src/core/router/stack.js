import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { LengkapiAkun, LoginScreen, RegisterScreen } from '../../screens';
import MainTabs from './bottom_navigator';

const Stack = createNativeStackNavigator();

const Router = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Main" component={MainTabs} />
      <Stack.Screen name="LengkapiAkun" component={LengkapiAkun} />
    </Stack.Navigator>
  );
};

export default Router;
