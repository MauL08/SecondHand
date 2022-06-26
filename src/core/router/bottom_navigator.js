import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {
  HomeScreen,
  NotifikasiScreen,
  JualScreen,
  DaftarJualScreen,
  ProfileScreen,
} from '../../screens';
import { COLORS } from '../../assets/colors';
import { Image, StyleSheet, Text } from 'react-native';
import { Icons } from '../../assets/icons';
import { ms } from 'react-native-size-matters';

const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: COLORS.primaryPurple4,
        tabBarIcon: ({ focused }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = Icons.Home;
          } else if (route.name === 'Notifikasi') {
            iconName = Icons.Bell;
          } else if (route.name === 'Jual') {
            iconName = Icons.PlusCirlce;
          } else if (route.name === 'DaftarJual') {
            iconName = Icons.List;
          } else if (route.name === 'Profile') {
            iconName = Icons.User;
          }
          return (
            <Image
              source={iconName}
              style={[
                styles.icon,
                {
                  tintColor: focused ? COLORS.primaryPurple4 : COLORS.neutral3,
                },
              ]}
            />
          );
        },
        tabBarLabel: ({ focused }) => {
          return (
            <Text
              style={[
                styles.label,
                {
                  color: focused ? COLORS.primaryPurple4 : COLORS.neutral3,
                  fontFamily: focused ? 'Poppins-Bold' : 'Poppins-Regular',
                },
              ]}>
              {route.name}
            </Text>
          );
        },
        tabBarStyle: { height: ms(60) },
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Notifikasi" component={NotifikasiScreen} />
      <Tab.Screen name="Jual" component={JualScreen} />
      <Tab.Screen name="DaftarJual" component={DaftarJualScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default MainTabs;

const styles = StyleSheet.create({
  icon: {
    height: ms(24),
    width: ms(24),
    marginTop: ms(10),
  },
  label: {
    fontSize: ms(10),
    marginBottom: ms(5),
  },
});
