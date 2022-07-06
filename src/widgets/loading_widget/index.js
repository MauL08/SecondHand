import { View, StyleSheet, ActivityIndicator } from 'react-native';
import React from 'react';
import { COLORS } from '../../assets/colors';
import ScreenStatusBar from '../../widgets/screen_status_bar_widget';

const LoadingWidget = () => {
  return (
    <View style={styles.loadingContainer}>
      <ScreenStatusBar />
      <ActivityIndicator color={COLORS.primaryPurple4} size="large" />
    </View>
  );
};

export default LoadingWidget;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: COLORS.neutral1,
    justifyContent: 'center',
    // marginTop: ms(80),
  },
});
