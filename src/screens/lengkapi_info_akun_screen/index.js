import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { COLORS } from '../../assets/colors';
import { Icons } from '../../assets/icons';
import * as yup from 'yup';
import { Formik } from 'formik';

const LengkapiAkun = () => {
  const FormValidationSchema = yup.object().shape({
    name: yup.string().required('Nama dibutuhkan'),
    kota: yup.string().required('Kota dibutuhkan'),
    alamat: yup.string().required('Alamat dibutuhkan'),
    nomor: yup.string().required('Nomor dibutuhkan'),
  });
  return (
    <Formik
      initialValues={{ name: '', kota: '', alamat: '', nomor: '' }}
      validateOnMount={true}
      validationSchema={FormValidationSchema}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        touched,
        errors,
        isValid,
      }) => (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.container}>
          <View style={styles.top}>
            <TouchableOpacity>
              <Image source={Icons.ArrowLeft} style={styles.iconBack} />
            </TouchableOpacity>
            <Text style={styles.title}>Lengkapi Info Akun</Text>
          </View>
          <TouchableOpacity style={styles.cameraBG}>
            <Image source={Icons.Camera} style={styles.iconCamera} />
          </TouchableOpacity>
          <View>
            <Text style={styles.label}>Nama*</Text>
            <TextInput
              style={styles.input}
              placeholder="Nama"
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
            />
            {errors.name && touched.name && (
              <Text style={styles.errors}>{errors.name}</Text>
            )}
            <Text style={styles.label}>Kota*</Text>
            <TextInput
              style={styles.input}
              placeholder="Pilih Kota"
              onChangeText={handleChange('kota')}
              onBlur={handleBlur('kota')}
              value={values.kota}
            />
            {errors.kota && touched.kota && (
              <Text style={styles.errors}>{errors.kota}</Text>
            )}
            <Text style={styles.label}>Alamat*</Text>
            <TextInput
              style={styles.inputBig}
              placeholder="Alamat"
              onChangeText={handleChange('alamat')}
              onBlur={handleBlur('alamat')}
              value={values.alamat}
            />
            {errors.alamat && touched.alamat && (
              <Text style={styles.errors}>{errors.alamat}</Text>
            )}
            <Text style={styles.label}>No Handphone*</Text>
            <TextInput
              style={styles.input}
              placeholder="contoh: +628123456789"
              onChangeText={handleChange('nomor')}
              onBlur={handleBlur('nomor')}
              value={values.nomor}
            />
            {errors.nomor && touched.nomor && (
              <Text style={styles.errors}>{errors.nomor}</Text>
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
            <Text style={styles.txtButton}>Simpan</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </Formik>
  );
};

export default LengkapiAkun;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
  },
  iconBack: {
    height: 24,
    width: 24,
    tintColor: COLORS.neutral5,
  },
  top: {
    flexDirection: 'row',
    marginTop: 25,
  },
  title: {
    flex: 1,
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: COLORS.neutral5,
    textAlign: 'center',
    marginRight: 24,
  },
  iconCamera: {
    tintColor: COLORS.primaryPurple4,
    height: 24,
    width: 24,
    marginVertical: 39,
    marginHorizontal: 37,
  },
  cameraBG: {
    backgroundColor: COLORS.primaryPurple1,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 12,
    marginTop: 40,
  },
  input: {
    borderWidth: 1,
    borderRadius: 16,
    borderColor: COLORS.neutral2,
    paddingHorizontal: 16,
    fontFamily: 'Poppins-Regular',
  },
  inputBig: {
    borderWidth: 1,
    borderRadius: 16,
    borderColor: COLORS.neutral2,
    paddingHorizontal: 16,
    fontFamily: 'Poppins-Regular',
    height: 80,
  },
  label: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: COLORS.neutral5,
    marginBottom: 4,
    marginTop: 16,
  },
  errors: {
    fontSize: 12,
    color: COLORS.alertDanger,
    fontFamily: 'Poppins-Medium',
  },
  button: {
    backgroundColor: COLORS.primaryPurple4,
    borderRadius: 16,
    marginTop: 24,
    marginBottom: 24,
  },
  txtButton: {
    fontFamily: 'Poppins-Medium',
    color: COLORS.neutral1,
    textAlign: 'center',
    marginVertical: 14,
  },
});
