import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { moderateScale } from 'react-native-size-matters';
import { COLORS } from '../../assets/colors';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, setLogout } from '../../data/slices/userSlice';
import ScreenStatusBar from '../../widgets/screen_status_bar_widget';
import LoadingWidget from '../../widgets/loading_widget';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.neutral1,
    paddingHorizontal: moderateScale(16),
  },
  title: {
    fontSize: moderateScale(24),
    lineHeight: moderateScale(36),
    paddingVertical: moderateScale(16),
    fontFamily: 'Poppins-Bold',
    color: COLORS.neutral5,
  },
  imageProfileContainer: {
    padding: moderateScale(36),
    backgroundColor: COLORS.primaryPurple2,
    width: moderateScale(96),
    height: moderateScale(96),
    borderRadius: moderateScale(12),
    marginVertical: moderateScale(25),
    justifyContent: 'center',
    alignSelf: 'center',
  },
  imageUserContainer: {
    backgroundColor: COLORS.primaryPurple1,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: moderateScale(12),
    marginVertical: moderateScale(25),
  },
  icon: {
    width: moderateScale(24),
    height: moderateScale(24),
    flexGrow: 0,
  },
  image: {
    height: moderateScale(120),
    width: moderateScale(120),
    borderRadius: moderateScale(10),
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
    fontFamily: 'Poppins-Regular',
  },
});

function ProfileScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { access_token, userDetail } = useSelector(state => state.user);
  const { isLoading } = useSelector(state => state.global);

  useEffect(() => {
    dispatch(getUser(access_token));
  }, [access_token, dispatch]);

  if (isLoading) {
    return <LoadingWidget />;
  } else {
    return (
      <View style={styles.container}>
        <ScreenStatusBar />
        <Text style={styles.title}>Akun Saya</Text>
        {userDetail?.image_url === null ? (
          <View style={styles.imageProfileContainer}>
            <Image
              style={[styles.icon, { tintColor: COLORS.primaryPurple4 }]}
              source={require('../../assets/icons/icon_camera.png')}
            />
          </View>
        ) : (
          <View style={styles.imageUserContainer}>
            <Image
              style={styles.image}
              source={{ uri: userDetail?.image_url }}
            />
          </View>
        )}
        <TouchableOpacity
          style={styles.menuContainer}
          onPress={() => {
            dispatch(getUser(access_token));
            navigation.navigate('LengkapiAkun');
          }}>
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

        <TouchableOpacity
          style={styles.menuContainer}
          onPress={() => {
            dispatch(setLogout());
            navigation.navigate('Login');
          }}>
          <Image
            style={styles.icon}
            source={require('../../assets/icons/icon_log-out.png')}
          />
          <Text style={styles.regularText}>Keluar</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default ProfileScreen;
