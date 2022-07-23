import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  DetailProductScreen,
  LengkapiInfoAkunScreen,
  LoginScreen,
  RegisterScreen,
  InfoPenawarScreen,
  TerbitkanScreen,
  EditProdukScreen,
  HistoryScreen,
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
      <Stack.Screen name="DetailProduct" component={DetailProductScreen} />
      <Stack.Screen name="InfoPenawar" component={InfoPenawarScreen} />
      <Stack.Screen name="Terbitkan" component={TerbitkanScreen} />
      <Stack.Screen name="EditProduk" component={EditProdukScreen} />
      <Stack.Screen name="History" component={HistoryScreen} />
    </Stack.Navigator>
  );
};

export default Router;
