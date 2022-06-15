import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Router from './stack';
import { navigationRef } from './navigator';

const RootNavigator = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Router />
    </NavigationContainer>
  );
};

export default RootNavigator;
