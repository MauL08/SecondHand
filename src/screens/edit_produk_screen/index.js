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
  getSellerCategory,
  getSellerProduct,
  updateSellerDetailProduct,
} from '../../data/slices/sellerSlice';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ScreenStatusBar from '../../widgets/screen_status_bar_widget';
import LoadingWidget from '../../widgets/loading_widget';

const EditProdukScreen = ({ route }) => {
  const { category } = useSelector(state => state.seller);
  const { access_token } = useSelector(state => state.user);
  const { isLoading } = useSelector(state => state.global);
  const { id, name, price, loc, desc, image } = route.params;

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
    onDestroyCategories();
  }, [access_token, dispatch, onDestroyCategories]);

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

  const onPostProduct = (
    prodId,
    postName,
    lokasi,
    postDesc,
    postPrice,
    catID,
    imageFile,
  ) => {
    const formData = new FormData();
    formData.append('name', postName);
    formData.append('base_price', postPrice);
    formData.append('category_ids', catID);
    formData.append('description', postDesc);
    formData.append('location', lokasi);
    imageFile === null
      ? formData.append('image', '')
      : formData.append('image', {
          uri: imageFile.uri,
          name: imageFile.fileName,
          type: imageFile.type,
        });
    dispatch(
      updateSellerDetailProduct({
        id: prodId,
        token: access_token,
        data: formData,
      }),
    );
    dispatch(getSellerProduct(access_token));
    navigation.navigate('DaftarJual');
    setFile(null);
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

  if (isLoading) {
    return <LoadingWidget />;
  } else {
    return (
      <Formik
        initialValues={{
          name: name,
          harga: String(price),
          kategori: '',
          deskripsi: desc,
          lokasi: loc,
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
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}>
                <Image source={Icons.ArrowLeft} style={styles.iconBack} />
              </TouchableOpacity>
              <Text style={styles.title}>Edit Produk</Text>
            </View>
            <View>
              <Text style={styles.label}>Nama Produk</Text>
              <TextInput
                placeholderTextColor="grey"
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
                placeholderTextColor="grey"
                placeholder="Rp 0,00"
                keyboardType="number-pad"
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
                placeholderTextColor="grey"
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
                onChangeValue={itemValue =>
                  setFieldValue('kategori', itemValue)
                }
                placeholder="Pilih Kategori"
              />
              <Text style={styles.label}>Deskripsi</Text>
              <TextInput
                style={styles.inputBig}
                placeholderTextColor="grey"
                placeholder="Taruh deskripsi produk disini"
                onChangeText={handleChange('deskripsi')}
                onBlur={handleBlur('deskripsi')}
                value={values.deskripsi}
              />
              {errors.deskripsi && touched.deskripsi && (
                <Text style={styles.errors}>{errors.deskripsi}</Text>
              )}
              <Text style={styles.label}>Foto Produk</Text>
              <TouchableOpacity
                style={styles.fotoProduk}
                onPress={onUploadImage}>
                {file === null ? (
                  <Image source={{ uri: image }} style={styles.image} />
                ) : (
                  <Image source={{ uri: file.uri }} style={styles.image} />
                )}
              </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
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
                    id,
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
  }
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
    color: 'black',
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
    color: 'black',
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
    alignItems: 'center',
    marginTop: ms(24),
    marginBottom: ms(24),
  },
  button: {
    borderRadius: ms(16),
    width: '48%',
    height: ms(48),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: ms(12),
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
  iconBack: {
    height: ms(24),
    width: ms(24),
    tintColor: COLORS.neutral5,
  },
});
