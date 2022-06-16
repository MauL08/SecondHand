import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { moderateScale } from 'react-native-size-matters';
import { COLORS } from '../../assets/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.neutral1,
    paddingHorizontal: moderateScale(16),
  },
  title: {
    fontSize: moderateScale(24),
    color: COLORS.black,
    fontWeight: '700',
    lineHeight: moderateScale(36),
    paddingVertical: moderateScale(16),
  },
  imageProfileContainer: {
    marginVertical: moderateScale(8),
    padding: moderateScale(36),
    backgroundColor: COLORS.primaryPurple2,
    width: moderateScale(96),
    height: moderateScale(96),
    borderRadius: moderateScale(12),
    borderColor: COLORS.primaryPurple1,
    alignSelf: 'center',
  },
  icon: {
    width: moderateScale(24),
    height: moderateScale(24),
    flexGrow: 0,
  },
  menuContainer: {
    height: moderateScale(41),
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: moderateScale(16),
    borderBottomWidth: moderateScale(1),
    borderBottomColor: COLORS.neutral01,
  },
  regularText: {
    fontSize: moderateScale(14),
    color: COLORS.neutral5,
    fontWeight: '500',
    lineHeight: moderateScale(20),
    marginLeft: moderateScale(16),
  },
});

function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Akun Saya</Text>
      <View style={styles.imageProfileContainer}>
        <Image
          style={styles.icon}
          source={require('../../assets/icons/icon_camera.png')}
        />
      </View>

      <TouchableOpacity style={styles.menuContainer}>
        <Image
          style={styles.icon}
          source={require('../../assets/icons/icon_edit-3.png')}
        />
        <Text style={styles.regularText}>Ubah Akun</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuContainer}>
        <Image
          style={styles.icon}
          source={require('../../assets/icons/icon_settings.png')}
        />
        <Text style={styles.regularText}>Pengaturan Akun</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuContainer}>
        <Image
          style={styles.icon}
          source={require('../../assets/icons/icon_log-out.png')}
        />
        <Text style={styles.regularText}>Keluar</Text>
      </TouchableOpacity>
    </View>
  );
}

export default ProfileScreen;
