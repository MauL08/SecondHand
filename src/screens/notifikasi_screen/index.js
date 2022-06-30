import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { COLORS } from '../../assets/colors';
import { ms } from 'react-native-size-matters';

const NotifikasiScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Notifikasi</Text>
    </View>
  );
};

export default NotifikasiScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.neutral1,
    padding: ms(16),
  },
  screenTitle: {
    fontSize: ms(20),
    lineHeight: ms(30),
    fontFamily: 'Poppins-Bold',
    color: COLORS.black,
  },
});
