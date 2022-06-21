import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, { useState } from 'react';
import { COLORS } from '../../assets/colors';
import { Icons } from '../../assets/icons';
import * as yup from 'yup';
import { Formik } from 'formik';
import { ms } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { postRegister } from '../../data/slices/userSlice';

const Register = () => {
  const [showPassword, setShowPassword] = useState(true);
  const navigation = useNavigation();
  const dispatch = useDispatch();

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
    const data = {
      name,
      email,
      password,
    };
    dispatch(postRegister(data));
  };

  return (
    <Formik
      initialValues={{ name: '', email: '', password: '' }}
      validateOnMount={true}
      validationSchema={RegisterValidationSchema}>
      {({ handleChange, handleBlur, values, touched, errors, isValid }) => (
        <View style={styles.container}>
          <TouchableOpacity>
            <Image source={Icons.ArrowLeft} style={styles.iconBack} />
          </TouchableOpacity>
          <Text style={styles.textTitle}>Daftar</Text>
          <View>
            <Text style={styles.label}>Nama</Text>
            <TextInput
              style={styles.input}
              placeholder="Nama Lengkap"
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
            <Text style={styles.txtButton}>Daftar</Text>
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
    marginHorizontal: 16,
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
    backgroundColor: COLORS.primaryPurple4,
    borderRadius: 16,
    marginTop: 24,
    marginBottom: 116,
  },
  txtButton: {
    fontFamily: 'Poppins-Medium',
    color: COLORS.neutral1,
    textAlign: 'center',
    marginVertical: 14,
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
