import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { COLORS } from '../../assets/colors';
import { Icons } from '../../assets/icons';
import * as yup from 'yup';
import { Formik } from 'formik';
import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigation } from '@react-navigation/native';
import { ms } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, updateUser } from '../../data/slices/userSlice';

const LengkapiInfoAkunScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { access_token } = useSelector(state => state.user);
  // const { isLoading } = useSelector(state => state.global);

  useEffect(() => {
    dispatch(getUser(access_token));
  }, [access_token, dispatch]);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Surabaya', value: 'surabaya' },
    { label: 'Jakarta', value: 'jakarta' },
  ]);
  const FormValidationSchema = yup.object().shape({
    name: yup.string().required('Masukkan Nama'),
    kota: yup.string().required('Masukkan Kota'),
    alamat: yup.string().required('Masukkan Alamat'),
    nomor: yup.string().required('Masukkan Nomor'),
  });

  const onUpdateProfile = (name, city, address, phone) => {
    dispatch(
      updateUser({
        token: access_token,
        data: {
          full_name: name,
          phone_number: phone,
          address,
          image_url: '',
          city,
        },
      }),
    );
  };

  return (
    <Formik
      initialValues={{ name: '', alamat: '', nomor: '' }}
      validateOnMount={true}
      validationSchema={FormValidationSchema}>
      {({ handleChange, handleBlur, values, touched, errors, isValid }) => (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.container}>
          <View style={styles.top}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={Icons.ArrowLeft} style={styles.iconBack} />
            </TouchableOpacity>
            <Text style={styles.title}>Lengkapi Info Akun</Text>
          </View>
          <TouchableOpacity style={styles.cameraBG}>
            <Image source={Icons.Camera} style={styles.iconCamera} />
          </TouchableOpacity>
          <View style={styles.inputContainer}>
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
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              listMode="SCROLLVIEW"
              style={styles.input}
              textStyle={styles.dropdownText}
              placeholder="Pilih Kota"
            />
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
            disabled={isValid}
            onPress={() =>
              onUpdateProfile(values.name, value, values.alamat, values.nomor)
            }>
            <Text style={styles.txtButton}>Simpan</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </Formik>
  );
};

export default LengkapiInfoAkunScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.neutral1,
  },
  iconBack: {
    height: ms(24),
    width: ms(24),
    tintColor: COLORS.neutral5,
  },
  top: {
    flexDirection: 'row',
    marginTop: ms(25),
    marginHorizontal: ms(16),
  },
  title: {
    flex: 1,
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: COLORS.neutral5,
    textAlign: 'center',
    marginRight: ms(24),
  },
  iconCamera: {
    tintColor: COLORS.primaryPurple4,
    height: ms(24),
    width: ms(24),
    marginVertical: ms(39),
    marginHorizontal: ms(37),
  },
  cameraBG: {
    backgroundColor: COLORS.primaryPurple1,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: ms(12),
    marginTop: ms(40),
  },
  input: {
    borderWidth: 1,
    borderRadius: ms(16),
    borderColor: COLORS.neutral2,
    paddingHorizontal: ms(16),
    fontFamily: 'Poppins-Regular',
  },
  inputBig: {
    borderWidth: 1,
    borderRadius: ms(16),
    borderColor: COLORS.neutral2,
    paddingHorizontal: ms(16),
    fontFamily: 'Poppins-Regular',
    height: ms(80),
  },
  label: {
    fontFamily: 'Poppins-Regular',
    fontSize: ms(12),
    color: COLORS.neutral5,
    marginBottom: ms(4),
    marginTop: ms(16),
  },
  errors: {
    fontSize: ms(12),
    color: COLORS.alertDanger,
    fontFamily: 'Poppins-Medium',
  },
  button: {
    backgroundColor: COLORS.primaryPurple4,
    borderRadius: ms(16),
    marginVertical: ms(24),
    marginHorizontal: ms(16),
  },
  txtButton: {
    fontFamily: 'Poppins-Medium',
    color: COLORS.neutral1,
    textAlign: 'center',
    marginVertical: 14,
  },
  dropdownText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: COLORS.neutral3,
  },
  inputContainer: {
    marginHorizontal: ms(16),
  },
});
