import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  DetailProductScreen,
  FilterScreen,
  LengkapiInfoAkunScreen,
  LoginScreen,
  RegisterScreen,
  InfoPenawarScreen,
  TerbitkanScreen,
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
      <Stack.Screen name="Filter" component={FilterScreen} />
      <Stack.Screen name="DetailProduct" component={DetailProductScreen} />
      <Stack.Screen name="InfoPenawar" component={InfoPenawarScreen} />
      <Stack.Screen name="Terbitkan" component={TerbitkanScreen} />
    </Stack.Navigator>
  );
};

export default Router;
