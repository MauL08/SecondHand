import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React from 'react';
import { COLORS } from '../../assets/colors';
import { Icons } from '../../assets/icons';
import * as yup from 'yup';
import { Formik } from 'formik';

const Register = () => {
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

  return (
    <Formik
      initialValues={{ name: '', email: '', password: '' }}
      validateOnMount={true}
      validationSchema={RegisterValidationSchema}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        touched,
        errors,
        isValid,
      }) => (
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
            <TextInput
              style={styles.input}
              placeholder="Buat Password"
              secureTextEntry={true}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
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
            onPress={handleSubmit}>
            <Text style={styles.txtButton}>Daftar</Text>
          </TouchableOpacity>
          <View style={styles.bottom}>
            <Text style={styles.bot1}>Sudah punya akun? </Text>
            <TouchableOpacity>
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
});
