import { StatusBar } from 'react-native';
import React from 'react';
import { COLORS } from '../../assets/colors';

const ScreenStatusBar = () => {
  return (
    <StatusBar
      barStyle="light-content"
      backgroundColor={COLORS.primaryPurple4}
    />
  );
};

export default ScreenStatusBar;
