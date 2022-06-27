import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { Formik } from 'formik';
import * as yup from 'yup';
import { COLORS } from '../../assets/colors';
import { useNavigation } from '@react-navigation/native';
import { Icons } from '../../assets/icons';
import { useDispatch, useSelector } from 'react-redux';
import { postLogin } from '../../data/slices/userSlice';

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
  },
  title: {
    fontFamily: 'Poppins-Bold',
    color: COLORS.neutral5,
    fontSize: moderateScale(24),
    lineHeight: moderateScale(36),
    paddingVertical: moderateScale(24),
  },
  label: {
    fontSize: moderateScale(12),
    color: COLORS.black,
    fontWeight: '400',
    lineHeight: moderateScale(18),
    fontFamily: 'Poppins-Regular',
  },
  input1: {
    paddingLeft: moderateScale(16),
    marginTop: moderateScale(4),
    borderWidth: 1,
    borderColor: COLORS.neutral2,
    borderRadius: moderateScale(16),
    fontSize: moderateScale(14),
    color: COLORS.neutral5,
    fontWeight: '400',
    lineHeight: moderateScale(20),
    fontFamily: 'Poppins-Regular',
  },
  input2: {
    paddingLeft: moderateScale(16),
    fontSize: moderateScale(14),
    color: COLORS.neutral5,
    fontWeight: '400',
    lineHeight: moderateScale(20),
    fontFamily: 'Poppins-Regular',
    width: '75%',
  },
  input2Container: {
    marginTop: moderateScale(4),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: COLORS.neutral2,
    borderRadius: moderateScale(16),
  },
  iconEye: {
    width: moderateScale(24),
    height: moderateScale(24),
    marginRight: moderateScale(16),
    tintColor: COLORS.neutral3,
  },
  button: {
    borderRadius: moderateScale(16),
    marginTop: moderateScale(20),
    backgroundColor: COLORS.primaryPurple4,
    height: moderateScale(48),
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: moderateScale(14),
    lineHeight: moderateScale(20),
    fontFamily: 'Poppins-Regular',
    color: COLORS.neutral1,
    fontWeight: '500',
    textAlign: 'center',
  },
  regularText: {
    fontSize: moderateScale(14),
    color: COLORS.neutral5,
    fontWeight: '400',
    lineHeight: moderateScale(20),
    fontFamily: 'Poppins-Regular',
  },
  errors: {
    fontSize: moderateScale(12),
    color: COLORS.alertDanger,
    fontFamily: 'Poppins-Regular',
  },
  bottomText: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: moderateScale(202),
  },
  bottomText1: {
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    color: COLORS.primaryPurple4,
  },
});

function LoginScreen() {
  const [showPassword, setShowPassword] = useState(true);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { isLoading } = useSelector(state => state.global);

  const LoginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Harap masukkan email yang valid')
      .required('Email dibutuhkan'),
    password: yup
      .string()
      .min(6, ({ min }) => `Password setidaknya ${min} karakter`)
      .required('Password dibutuhkan'),
  });

  const onLogin = (email, password) => {
    dispatch(
      postLogin({
        email,
        password,
      }),
    );
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validateOnMount={true}
      validationSchema={LoginValidationSchema}>
      {({ values, handleChange, handleBlur, touched, errors, isValid }) => (
        <View style={styles.container}>
          <TouchableOpacity>
            <Image
              style={styles.icon}
              source={require('../../assets/icons/icon_arrow-left.png')}
            />
          </TouchableOpacity>

          <Text style={styles.title}>Masuk</Text>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input1}
            placeholder="Contoh: johndee@gmail.com"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            value={values.email}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
          />
          {errors.email && touched.email && (
            <Text style={styles.errors}>{errors.email}</Text>
          )}

          <Text style={[styles.label, { marginTop: moderateScale(12) }]}>
            Password
          </Text>
          <View style={styles.input2Container}>
            <TextInput
              style={styles.input2}
              placeholder="Masukkan password"
              autoCapitalize="none"
              autoCorrect={false}
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              secureTextEntry={showPassword}
            />
            <TouchableOpacity
              onPress={() => {
                setShowPassword(val => !val);
              }}>
              <Image
                source={showPassword ? Icons.Eye : Icons.EyeOff}
                style={styles.iconEye}
              />
            </TouchableOpacity>
          </View>
          {errors.password && touched.password && (
            <Text style={styles.errors}>{errors.password}</Text>
          )}
          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor: isValid
                  ? COLORS.primaryPurple4
                  : COLORS.neutral2,
              },
            ]}
            disabled={!isValid}
            onPress={() => onLogin(values.email, values.password)}>
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.buttonText}>Masuk</Text>
            )}
          </TouchableOpacity>

          <View style={styles.bottomText}>
            <Text style={styles.regularText}>Belum punya akun? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.bottomText1}>Daftar di sini</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Formik>
  );
}
export default LoginScreen;
