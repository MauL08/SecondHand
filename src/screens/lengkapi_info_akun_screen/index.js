import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  PermissionsAndroid,
  RefreshControl,
} from 'react-native';
import React, { useState } from 'react';
import { COLORS } from '../../assets/colors';
import { Icons } from '../../assets/icons';
import * as yup from 'yup';
import { Formik } from 'formik';
import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigation } from '@react-navigation/native';
import { ms } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, updateUser } from '../../data/slices/userSlice';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import LoadingWidget from '../../widgets/loading_widget';
import ScreenStatusBar from '../../widgets/screen_status_bar_widget';
import Toast from 'react-native-toast-message';

const LengkapiInfoAkunScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { access_token, userDetail, userUpdateResponse } = useSelector(
    state => state.user,
  );
  const { isLoading } = useSelector(state => state.global);

  const [cameraPermission, setCameraPermission] = useState(true);
  const [file, setFile] = useState('');
  const [userImage, setUserImage] = useState(userDetail.image_url);

  const onRefresh = () => {
    setFile('');
    dispatch(getUser(access_token));
  };

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Surabaya', value: 'Surabaya' },
    { label: 'Jakarta', value: 'Jakarta' },
  ]);
  const FormValidationSchema = yup.object().shape({
    name: yup.string().required('Masukkan Nama'),
    kota: yup.string().required('Pilih Kota'),
    alamat: yup.string().required('Masukkan Alamat'),
    nomor: yup.string().required('Masukkan Nomor'),
  });

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

  const showDoneToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Update Profil Sukses!',
      text2: 'Silahkan refresh halaman ini untuk melihat perubahan',
    });
  };

  const showFailedToast = () => {
    Toast.show({
      type: 'error',
      text1: 'Update Profil Gagal!',
      text2: 'Silahkan cek kembali dan coba lagi',
    });
  };

  const onUpdateProfile = (imageFile, name, city, address, phone) => {
    const formData = new FormData();

    formData.append('full_name', name);
    formData.append('phone_number', phone);
    formData.append('address', address);
    formData.append('city', city);

    imageFile === ''
      ? formData.append('image', '')
      : formData.append('image', {
          uri: imageFile.uri,
          name: imageFile.fileName,
          type: imageFile.type,
        });

    dispatch(
      updateUser({
        token: access_token,
        data: formData,
      }),
    );

    userUpdateResponse <= 201 ? showDoneToast() : showFailedToast();

    imageFile !== '' && setUserImage(imageFile.uri);
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
          setUserImage(null);
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
          setUserImage(null);
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
          name: userDetail.full_name,
          alamat: userDetail.address === 'unknown' ? '' : userDetail.address,
          nomor: userDetail.phone_number === 1 ? '' : userDetail.phone_number,
        }}
        validateOnMount={true}
        validationSchema={FormValidationSchema}>
        {({
          handleChange,
          handleBlur,
          setFieldValue,
          values,
          touched,
          errors,
          isValid,
        }) => (
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl onRefresh={onRefresh} />}
            style={styles.container}>
            <ScreenStatusBar />
            <View style={styles.top}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image source={Icons.ArrowLeft} style={styles.iconBack} />
              </TouchableOpacity>
              <Text style={styles.title}>Lengkapi Info Akun</Text>
            </View>
            {userImage === null ? (
              file.uri === '' ? (
                <TouchableOpacity
                  style={styles.cameraBG}
                  onPress={() => onUploadImage()}>
                  <Image source={Icons.Camera} style={styles.iconCamera} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.cameraBG}
                  onPress={() => onUploadImage()}>
                  <Image
                    source={{ uri: file.uri }}
                    style={styles.imageCamera}
                  />
                </TouchableOpacity>
              )
            ) : (
              <TouchableOpacity
                style={styles.cameraBG}
                onPress={() => onUploadImage()}>
                <Image source={{ uri: userImage }} style={styles.imageCamera} />
              </TouchableOpacity>
            )}
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
                onChangeValue={itemValue => setFieldValue('kota', itemValue)}
                placeholderStyle={styles.placeholderDropdown}
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
              <View style={styles.numberPhoneInputContainer}>
                <Text style={styles.prefix}>+62</Text>
                <TextInput
                  style={{ width: ms(180) }}
                  onChangeText={handleChange('nomor')}
                  onBlur={handleBlur('nomor')}
                  value={values.nomor}
                />
              </View>
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
              onPress={() => {
                onUpdateProfile(
                  file,
                  values.name,
                  value,
                  values.alamat,
                  values.nomor,
                );
                setFile('');
              }}>
              <Text style={styles.txtButton}>Simpan</Text>
            </TouchableOpacity>
          </ScrollView>
        )}
      </Formik>
    );
  }
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
  imageCamera: {
    height: ms(120),
    width: ms(120),
    borderRadius: ms(10),
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
    color: COLORS.neutral5,
  },
  inputContainer: {
    marginHorizontal: ms(16),
  },
  placeholderDropdown: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: COLORS.neutral3,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: COLORS.neutral1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberPhoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: ms(16),
    borderColor: COLORS.neutral2,
    paddingHorizontal: ms(8),
    fontFamily: 'Poppins-Regular',
  },
  prefix: {
    paddingHorizontal: 10,
    fontWeight: 'bold',
    color: 'black',
  },
});
