import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React, { useState } from 'react';
import { COLORS } from '../../assets/colors';
import { Icons } from '../../assets/icons';
import * as yup from 'yup';
import { Formik } from 'formik';
import { moderateScale, ms } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { postRegister } from '../../data/slices/userSlice';
import ScreenStatusBar from '../../widgets/screen_status_bar_widget';

const Register = () => {
  const [showPassword, setShowPassword] = useState(true);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { isLoading } = useSelector(state => state.global);

  const RegisterValidationSchema = yup.object().shape({
    name: yup.string().required('Nama dibutuhkan'),
    email: yup
      .string()
      .email('Harap masukkan email yang valid')
      .required('Email dibutuhkan'),
    password: yup
      .string()
      .min(6, ({ min }) => `Password setidaknya ${min} karakter`)
      .required('Password dibutuhkan'),
  });

  const onRegister = (name, email, password) => {
    dispatch(
      postRegister({
        full_name: name,
        email,
        password,
        phone_number: 1,
        address: 'unknown',
        image: 'unknown',
        city: 'unknown',
      }),
    );
  };

  return (
    <Formik
      initialValues={{ name: '', email: '', password: '' }}
      validateOnMount={true}
      validationSchema={RegisterValidationSchema}>
      {({ handleChange, handleBlur, values, touched, errors, isValid }) => (
        <View style={styles.container}>
          <ScreenStatusBar />
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={Icons.ArrowLeft} style={styles.iconBack} />
          </TouchableOpacity>
          <Text style={styles.textTitle}>Daftar</Text>
          <View>
            <Text style={styles.label}>Nama</Text>
            <TextInput
              style={styles.input}
              placeholder="Nama Lengkap"
              placeholderTextColor="grey"
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
            />
            {errors.name && touched.name && (
              <Text style={styles.errors}>{errors.name}</Text>
            )}
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Contoh: johndee@gmail.com"
              placeholderTextColor="grey"
              keyboardType="email-address"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
            {errors.email && touched.email && (
              <Text style={styles.errors}>{errors.email}</Text>
            )}
            <Text style={styles.label}>Buat Password</Text>
            <View style={styles.inputFrame}>
              <TextInput
                style={styles.input}
                placeholder="Buat Password"
                placeholderTextColor="grey"
                secureTextEntry={showPassword}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
              <TouchableOpacity
                onPress={() => {
                  setShowPassword(val => !val);
                }}>
                <Image
                  source={showPassword ? Icons.Eye : Icons.EyeOff}
                  style={styles.eye}
                />
              </TouchableOpacity>
            </View>
            {errors.password && touched.password && (
              <Text style={styles.errors}>{errors.password}</Text>
            )}
          </View>
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
            onPress={() =>
              onRegister(values.name, values.email, values.password)
            }>
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.txtButton}>Daftar</Text>
            )}
          </TouchableOpacity>
          <View style={styles.bottom}>
            <Text style={styles.bot1}>Sudah punya akun? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.bot2}>Masuk di sini</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Formik>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.neutral1,
    paddingHorizontal: moderateScale(16),
  },
  iconBack: {
    height: 24,
    width: 24,
    tintColor: COLORS.neutral5,
    marginTop: 25,
  },
  textTitle: {
    fontFamily: 'Poppins-Bold',
    color: COLORS.neutral5,
    fontSize: 24,
    marginTop: 43,
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderRadius: 16,
    borderColor: COLORS.neutral2,
    paddingHorizontal: 16,
    fontFamily: 'Poppins-Regular',
  },
  label: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: COLORS.neutral5,
    marginBottom: 4,
    marginTop: 16,
  },
  button: {
    borderRadius: moderateScale(16),
    marginTop: moderateScale(20),
    backgroundColor: COLORS.primaryPurple4,
    height: moderateScale(48),
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtButton: {
    fontSize: moderateScale(14),
    lineHeight: moderateScale(20),
    fontFamily: 'Poppins-Regular',
    color: COLORS.neutral1,
    fontWeight: '500',
    textAlign: 'center',
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    top: 590,
    left: 0,
    right: 0,
  },
  bot1: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: COLORS.neutral5,
  },
  bot2: {
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    color: COLORS.primaryPurple4,
  },
  errors: {
    fontSize: 12,
    color: COLORS.alertDanger,
    fontFamily: 'Poppins-Medium',
  },
  eye: {
    width: ms(24),
    height: ms(24),
    marginRight: ms(16),
    tintColor: COLORS.neutral3,
    flexGrow: 0,
    marginTop: ms(-38),
    marginLeft: ms(308),
  },
});
