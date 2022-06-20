import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  LengkapiInfoAkunScreen,
  LoginScreen,
  RegisterScreen,
} from '../../screens';
import MainTabs from './bottom_navigator';
import { COLORS } from '../../assets/colors';

const Stack = createNativeStackNavigator();

const Router = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: COLORS.neutral1 },
      }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Main" component={MainTabs} />
      <Stack.Screen name="LengkapiAkun" component={LengkapiInfoAkunScreen} />
    </Stack.Navigator>
  );
};

export default Router;
