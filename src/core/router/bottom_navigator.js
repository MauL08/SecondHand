import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {
  HomeScreen,
  NotifikasiScreen,
  JualScreen,
  DaftarJualScreen,
  ProfileScreen,
} from '../../screens';

const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Notifikasi" component={NotifikasiScreen} />
      <Tab.Screen name="Jual" component={JualScreen} />
      <Tab.Screen name="DaftarJual" component={DaftarJualScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default MainTabs;
