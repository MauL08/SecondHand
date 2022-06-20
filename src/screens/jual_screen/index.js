import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { COLORS } from '../../assets/colors';
import { Icons } from '../../assets/icons';
import * as yup from 'yup';
import { Formik } from 'formik';
import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigation } from '@react-navigation/native';
import { ms } from 'react-native-size-matters';

const JualScreen = () => {
  const navigation = useNavigation();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Electronic', value: 'electronic' },
    { label: 'Hobbi', value: 'hobbi' },
    { label: 'Olahraga', value: 'olahraga' },
    { label: 'Kendaraan', value: 'kendaraan' },
    { label: 'Aksesoris', value: 'aksesoris' },
    { label: 'Kesehatan', value: 'kesehatan' },
    { label: 'Food', value: 'food' },
  ]);
  const FormValidationSchema = yup.object().shape({
    name: yup.string().required('Masukkan nama produk'),
    harga: yup.string().required('Masukkan harga produk'),
    kategori: yup.string().required('Pilih kategori'),
    deskripsi: yup.string().required('Masukkan deskripsi'),
  });

  return (
    <Formik
      initialValues={{ name: '', harga: '', kategori: '', deskripsi: '' }}
      validateOnMount={true}
      validationSchema={FormValidationSchema}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        touched,
        errors,
      }) => (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.container}>
          <View style={styles.top}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={Icons.ArrowLeft} style={styles.icon} />
            </TouchableOpacity>
            <Text style={styles.title}>Lengkapi Detail Produk</Text>
          </View>

          <View>
            <Text style={styles.label}>Nama Produk</Text>
            <TextInput
              style={styles.input}
              placeholder="Nama Produk"
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
            />
            {errors.name && touched.name && (
              <Text style={styles.errors}>{errors.name}</Text>
            )}

            <Text style={styles.label}>Harga Produk</Text>
            <TextInput
              style={styles.input}
              placeholder="Rp 0,00"
              onChangeText={handleChange('harga')}
              onBlur={handleBlur('harga')}
              value={values.harga}
            />
            {errors.harga && touched.harga && (
              <Text style={styles.errors}>{errors.harga}</Text>
            )}

            <Text style={styles.label}>Kategori</Text>
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
              placeholder="Pilih Kategori"
            />

            <Text style={styles.label}>Deskripsi</Text>
            <TextInput
              style={styles.inputBig}
              placeholder="Contoh: Jalan Ikan Hiu 33"
              onChangeText={handleChange('deskripsi')}
              onBlur={handleBlur('deskripsi')}
              value={values.deskripsi}
            />
            {errors.deskripsi && touched.deskripsi && (
              <Text style={styles.errors}>{errors.deskripsi}</Text>
            )}

            <Text style={styles.label}>Foto Produk</Text>
            <TouchableOpacity style={styles.fotoProduk}>
              <Image
                source={Icons.Plus}
                style={[styles.icon, { tintColor: COLORS.neutral2 }]}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.buttonPreview}>
              <Text style={[styles.txtButton, { color: COLORS.black }]}>
                Preview
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.txtButton}>Terbitkan</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </Formik>
  );
};

export default JualScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.neutral1,
    padding: ms(16),
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: ms(24),
  },
  icon: {
    height: ms(24),
    width: ms(24),
    tintColor: COLORS.neutral5,
  },
  title: {
    flex: 1,
    fontFamily: 'Poppins-Regular',
    fontSize: ms(14),
    color: COLORS.neutral5,
    textAlign: 'center',
    fontWeight: '500',
    lineHeight: ms(20),
  },
  label: {
    fontFamily: 'Poppins-Regular',
    fontSize: ms(12),
    color: COLORS.neutral5,
    fontWeight: '400',
    lineHeight: ms(18),
    marginBottom: ms(4),
    marginTop: ms(16),
  },
  input: {
    borderWidth: 1,
    borderRadius: ms(16),
    borderColor: COLORS.neutral2,
    paddingLeft: ms(16),
    fontFamily: 'Poppins-Regular',
    fontSize: ms(14),
    fontWeight: '400',
    lineHeight: ms(20),
  },
  dropdownText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: COLORS.neutral3,
  },
  inputBig: {
    borderWidth: 1,
    borderRadius: ms(16),
    borderColor: COLORS.neutral2,
    paddingLeft: ms(16),
    fontFamily: 'Poppins-Regular',
    height: ms(80),
  },
  fotoProduk: {
    width: ms(96),
    height: ms(96),
    borderRadius: ms(12),
    borderWidth: ms(1),
    borderStyle: 'dashed',
    borderColor: COLORS.neutral2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errors: {
    fontSize: ms(12),
    color: COLORS.alertDanger,
    fontFamily: 'Poppins-Regular',
  },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  button: {
    backgroundColor: COLORS.primaryPurple4,
    borderRadius: ms(16),
    marginTop: ms(24),
    marginBottom: ms(24),
    width: '48%',
  },
  buttonPreview: {
    backgroundColor: COLORS.neutral1,
    borderRadius: ms(16),
    borderWidth: ms(1),
    borderColor: COLORS.primaryPurple4,
    marginTop: ms(24),
    marginBottom: ms(24),
    width: '48%',
  },
  txtButton: {
    fontFamily: 'Poppins-Regular',
    color: COLORS.neutral1,
    textAlign: 'center',
    marginVertical: 14,
    fontSize: ms(14),
    fontWeight: '400',
  },
});
