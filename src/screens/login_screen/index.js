import React from 'react';
import { StyleSheet, View, TextInput, Text, Image } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Formik } from 'formik';
import { COLORS } from '../../assets/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.neutral1,
    paddingHorizontal: moderateScale(16),
  },
  icon: {
    width: moderateScale(24),
    height: moderateScale(24),
    marginVertical: moderateScale(14),
    flexGrow: 0,
  },
  title: {
    fontSize: moderateScale(24),
    color: COLORS.black,
    fontWeight: '700',
    lineHeight: moderateScale(36),
    paddingVertical: moderateScale(24),
  },
  inputFrame: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    height: moderateScale(70),
    backgroundColor: COLORS.neutral1,
    marginBottom: moderateScale(16),
  },
  inputTitle: {
    fontSize: moderateScale(12),
    color: COLORS.black,
    fontWeight: '400',
    lineHeight: moderateScale(18),
  },
  inputText: {
    paddingVertical: moderateScale(14),
    paddingHorizontal: moderateScale(16),
    width: moderateScale(338),
    marginTop: moderateScale(4),
    height: moderateScale(48),
    backgroundColor: COLORS.neutral1,
    borderRadius: moderateScale(16),
    borderWidth: moderateScale(1),
    borderColor: COLORS.neutral2,
    fontSize: moderateScale(14),
    color: COLORS.neutral3,
    fontWeight: '400',
    lineHeight: moderateScale(20),
  },
  button: {
    borderRadius: moderateScale(16),
    paddingVertical: moderateScale(14),
    paddingHorizontal: moderateScale(16),
    marginTop: moderateScale(4),
    backgroundColor: COLORS.primaryPurple4,
    height: moderateScale(48),
  },
  regularText: {
    fontSize: moderateScale(14),
    color: COLORS.neutral5,
    fontWeight: '400',
    lineHeight: moderateScale(20),
  },
});

function LoginScreen() {
  return (
    <Formik initialValues={{ email: '', password: '' }}>
      {({ values, handleChange, handleSubmit }) => (
        <View style={styles.container}>
          <TouchableOpacity>
            <Image
              style={styles.icon}
              source={require('../../assets/icons/icon_arrow-left.png')}
            />
          </TouchableOpacity>

          <Text style={styles.title}>Masuk</Text>

          <View style={styles.inputFrame}>
            <Text style={styles.inputTitle}>Email</Text>
            <TextInput
              style={styles.inputText}
              placeholder="Contoh: johndee@gmail.com"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              value={values.email}
              onChangeText={handleChange('email')}
            />
          </View>

          <View style={styles.inputFrame}>
            <Text style={styles.inputTitle}>Password</Text>
            <TextInput
              style={styles.inputText}
              placeholder="Masukkan password"
              autoCapitalize="none"
              autoCorrect={false}
              value={values.password}
              onChangeText={handleChange('password')}
              secureTextEntry
            />
            <Image
              style={[
                styles.icon,
                {
                  marginTop: moderateScale(-38),
                  marginLeft: moderateScale(308),
                },
              ]}
              source={require('../../assets/icons/icon_eye.png')}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text
              style={[
                styles.regularText,
                {
                  color: COLORS.neutral1,
                  fontWeight: '500',
                  textAlign: 'center',
                },
              ]}>
              Masuk
            </Text>
          </TouchableOpacity>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
              marginTop: moderateScale(202),
              marginLeft: moderateScale(61),
            }}>
            <Text style={styles.regularText}>Belum punya akun? </Text>
            <TouchableOpacity>
              <Text
                style={[styles.regularText, { color: COLORS.primaryPurple4 }]}>
                Daftar di sini
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Formik>
  );
}
export default LoginScreen;
