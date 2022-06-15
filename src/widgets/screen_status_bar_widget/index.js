import { StatusBar, useColorScheme } from 'react-native';
import React from 'react';

const ScreenStatusBar = () => {
  const theme = useColorScheme();

  return theme === 'dark' ? (
    <StatusBar barStyle="light-content" backgroundColor="black" />
  ) : (
    <StatusBar barStyle="dark-content" backgroundColor="white" />
  );
};

export default ScreenStatusBar;
