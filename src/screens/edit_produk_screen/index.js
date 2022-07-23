import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  PermissionsAndroid,
  Alert,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { COLORS } from '../../assets/colors';
import { Icons } from '../../assets/icons';
import * as yup from 'yup';
import { Formik } from 'formik';
import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigation } from '@react-navigation/native';
import { ms } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import {
  createSellerProduct,
  getSellerCategory,
  getSellerProduct,
} from '../../data/slices/sellerSlice';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ScreenStatusBar from '../../widgets/screen_status_bar_widget';
import { getUser } from '../../data/slices/userSlice';

const EditProdukScreen = () => {
  const { category } = useSelector(state => state.seller);
  const { access_token } = useSelector(state => state.user);
  const { isLoading } = useSelector(state => state.global);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [usedCat, setUsedCat] = useState([]);
  const [staticLoad, setStaticLoad] = useState(false);

  const [cameraPermission, setCameraPermission] = useState(true);
  const [file, setFile] = useState(null);

  const FormValidationSchema = yup.object().shape({
    name: yup.string().required('Masukkan nama produk'),
    harga: yup.string().required('Masukkan harga produk'),
    kategori: yup.string().required('Pilih kategori'),
    deskripsi: yup.string().required('Masukkan deskripsi'),
    lokasi: yup.string().required('Masukkan lokasi produk'),
  });

  const onRefresh = () => {
    setStaticLoad(true);
    setFile(null);
    setStaticLoad(false);
  };

  useEffect(() => {
    dispatch(getSellerCategory());
    dispatch(getSellerProduct(access_token));
    onDestroyCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, onDestroyCategories]);

  const onDestroyCategories = useCallback(() => {
    setUsedCat(
      category?.map(val => {
        return {
          label: val.name,
          value: val.id,
        };
      }),
    );
  }, [category]);

  const onPostProduct = (name, lokasi, desc, price, catID, imageFile) => {
    if (imageFile === null) {
      Alert.alert('Error', 'Lengkapi Form terlebih dahulu!');
    } else {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('base_price', price);
      formData.append('category_ids', catID);
      formData.append('description', desc);
      formData.append('location', lokasi);
      formData.append('image', {
        uri: imageFile.uri,
        name: imageFile.fileName,
        type: imageFile.type,
      });
      dispatch(
        createSellerProduct({
          token: access_token,
          data: formData,
        }),
      );
      setFile(null);
    }
  };

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setCameraPermission(granted);
      } else {
        setCameraPermission(false);
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const onUploadImage = () => {
    Alert.alert('Choose your Option', '', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Go To Gallery',
        onPress: () => {
          openStorage();
        },
      },
      {
        text: 'Open Camera',
        onPress: () => {
          openCamera();
        },
      },
    ]);
  };

  const openCamera = async () => {
    if (!cameraPermission) {
      requestCameraPermission();
    } else {
      const options = {
        title: 'Open Camera',
        mediaType: 'photo',
        path: 'images',
      };
      launchCamera(options, response => {
        if (response.assets) {
          setFile(response.assets[0]);
        } else {
          setFile(currState => currState);
        }
      });
    }
  };

  const openStorage = async () => {
    if (!cameraPermission) {
      requestCameraPermission();
    } else {
      const options = {
        title: 'Open Gallery',
        mediaType: 'photo',
        path: 'images',
      };
      launchImageLibrary(options, response => {
        if (response.assets) {
          setFile(response.assets[0]);
        } else {
          setFile(currState => currState);
        }
      });
    }
  };

  return (
    <Formik
      initialValues={{
        name: '',
        harga: '',
        kategori: '',
        deskripsi: '',
        lokasi: '',
      }}
      validateOnMount={true}
      validationSchema={FormValidationSchema}>
      {({
        handleChange,
        handleBlur,
        values,
        touched,
        errors,
        isValid,
        setFieldValue,
      }) => (
        <ScrollView
          refreshControl={
            <RefreshControl onRefresh={onRefresh} refreshing={staticLoad} />
          }
          showsVerticalScrollIndicator={false}
          style={styles.container}>
          <ScreenStatusBar />
          <View style={styles.top}>
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
            <Text style={styles.label}>Lokasi</Text>
            <TextInput
              style={styles.input}
              placeholder="Lokasi Produk"
              onChangeText={handleChange('lokasi')}
              onBlur={handleBlur('lokasi')}
              value={values.lokasi}
            />
            {errors.lokasi && touched.lokasi && (
              <Text style={styles.errors}>{errors.lokasi}</Text>
            )}
            <Text style={styles.label}>Kategori</Text>
            <DropDownPicker
              open={open}
              value={value}
              items={usedCat}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setUsedCat}
              listMode="SCROLLVIEW"
              style={styles.input}
              textStyle={styles.dropdownText}
              onChangeValue={itemValue => setFieldValue('kategori', itemValue)}
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
            <TouchableOpacity style={styles.fotoProduk} onPress={onUploadImage}>
              {file === null ? (
                <Image
                  source={Icons.Plus}
                  style={[styles.icon, { tintColor: COLORS.neutral2 }]}
                />
              ) : (
                <Image source={{ uri: file.uri }} style={styles.image} />
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => {
                dispatch(getUser(access_token));
                if (file === null) {
                  Alert.alert('Error', 'Lengkapi Form terlebih dahulu!');
                } else {
                  navigation.navigate('Terbitkan', {
                    image: file,
                    name: values.name,
                    kategori: value,
                    harga: values.harga,
                    deskripsi: values.deskripsi,
                    lokasi: values.lokasi,
                  });
                }
              }}
              style={[
                styles.buttonPreview,
                {
                  borderColor: isValid
                    ? COLORS.primaryPurple4
                    : COLORS.neutral2,
                },
              ]}
              disabled={!isValid}>
              <Text
                style={[
                  styles.txtButton,
                  { color: isValid ? COLORS.black : COLORS.neutral2 },
                ]}>
                Preview
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor: isValid
                    ? COLORS.primaryPurple4
                    : COLORS.neutral2,
                },
              ]}
              onPress={() => {
                onPostProduct(
                  values.name,
                  values.lokasi,
                  values.deskripsi,
                  values.harga,
                  values.kategori,
                  file,
                );
              }}
              disabled={!isValid}>
              {isLoading ? (
                <ActivityIndicator
                  color="white"
                  style={{ marginVertical: ms(14) }}
                />
              ) : (
                <Text style={styles.txtButton}>Terbitkan</Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </Formik>
  );
};

export default EditProdukScreen;

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
  image: {
    height: ms(96),
    width: ms(96),
    borderRadius: ms(10),
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: ms(24),
    marginBottom: ms(24),
  },
  button: {
    borderRadius: ms(16),
    width: '48%',
    height: ms(48),
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonPreview: {
    backgroundColor: COLORS.neutral1,
    borderRadius: ms(16),
    borderWidth: ms(1),
    width: '48%',
    height: ms(48),
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtButton: {
    fontFamily: 'Poppins-Regular',
    color: COLORS.neutral1,
    fontSize: ms(14),
    fontWeight: '400',
  },
});
