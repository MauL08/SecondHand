import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, { useState, useCallback, useRef, useMemo } from 'react';
import { ms } from 'react-native-size-matters';
import { COLORS } from '../../assets/colors';
import { Icons } from '../../assets/icons';
import ScreenStatusBar from '../../widgets/screen_status_bar_widget';
import { useNavigation } from '@react-navigation/native';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import NumberFormat from 'react-number-format';
import { createBuyerOrder } from '../../data/slices/buyerSlice';
import * as yup from 'yup';
import { Formik } from 'formik';
import LoadingWidget from '../../widgets/loading_widget';
import Toast from 'react-native-toast-message';
const WIDTH = Dimensions.get('window').width;

const DetailProductScreen = () => {
  const navigation = useNavigation();
  const sheetRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [btnActive, setBtnActive] = useState(true);

  const dispatch = useDispatch();
  const { access_token } = useSelector(state => state.user);
  const { detailProduct, orderResponseStatus } = useSelector(
    state => state.buyer,
  );
  const { isLoading } = useSelector(state => state.global);

  const snapPoints = useMemo(() => ['69%', '90%'], []);

  const showDoneToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Penawaran Sukses!',
      text2: 'Harga tawarmu berhasil dikirim ke penjual',
    });
  };

  const showFailedToast = () => {
    Toast.show({
      type: 'error',
      text1: 'Penawaran Gagal!',
      text2: 'Produk gagal ditawar, penawaran produk telah mencapai batas',
    });
  };

  const handleSnapPress = useCallback(index => {
    sheetRef.current?.snapToIndex(index);
    setIsOpen(true);
  }, []);

  const handleSheetChanges = useCallback(index => {
    console.log('handleSheetChanges', index);
  }, []);

  const handleClose = useCallback(index => {
    sheetRef.current?.snapToIndex(index);
    setBtnActive(false);
    setIsOpen(false);
  }, []);

  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        pressBehavior="close"
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    [],
  );

  const onCheckCategories = cat => {
    if (!cat) {
      return '-';
    }
    return cat[0]?.name;
  };

  const validationSchema = yup.object().shape({
    bid_price: yup.string().required('Masukkan harga yang ditawarkan'),
  });

  const RenderBsView = () => (
    <Formik
      initialValues={{ bid_price: '' }}
      validateOnMount={true}
      validationSchema={validationSchema}>
      {({ handleChange, handleBlur, values, touched, errors, isValid }) => (
        <BottomSheetView style={styles.bsContainer}>
          <Text style={styles.cardName}>Masukkan Harga Tawarmu</Text>
          <Text style={styles.txtDesc}>
            Harga tawaranmu akan diketahui penjual, jika penjual cocok kamu akan
            segera dihubungi penjual.
          </Text>
          <View style={styles.bsProduct}>
            <Image
              style={styles.userImg}
              source={{
                uri: detailProduct.image_url,
              }}
            />
            <View style={styles.bsProductText}>
              <Text style={styles.cardName}>{detailProduct.name}</Text>
              <NumberFormat
                value={detailProduct?.base_price}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'Rp'}
                renderText={value => (
                  <Text style={styles.txtPrice}>{value}</Text>
                )}
              />
            </View>
          </View>
          <Text style={styles.label}>Harga Tawar</Text>
          <TextInput
            style={styles.input}
            placeholder="Rp 0,00"
            onChangeText={handleChange('bid_price')}
            onBlur={handleBlur('bid_price')}
            value={values.bid_price}
          />
          {errors.bid_price && touched.bid_price && (
            <Text style={styles.errors}>{errors.bid_price}</Text>
          )}
          <TouchableOpacity
            style={[
              styles.btnKirim,
              {
                backgroundColor: isValid
                  ? COLORS.primaryPurple4
                  : COLORS.neutral2,
              },
            ]}
            disabled={!isValid}
            onPress={() => {
              dispatch(
                createBuyerOrder({
                  data: {
                    product_id: detailProduct.id,
                    bid_price: Number(values.bid_price),
                  },
                  token: access_token,
                }),
              );
              orderResponseStatus <= 201 ? showDoneToast() : showFailedToast();
              handleClose(-1);
            }}>
            <Text style={styles.txtBtn}>Kirim</Text>
          </TouchableOpacity>
        </BottomSheetView>
      )}
    </Formik>
  );

  if (isLoading) {
    return <LoadingWidget />;
  } else {
    return (
      <GestureHandlerRootView style={styles.container}>
        <ScreenStatusBar />
        <SafeAreaView style={styles.container}>
          <View style={styles.wrap}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.btnBack}>
              <Image source={Icons.ArrowLeft} style={styles.iconBack} />
            </TouchableOpacity>
            <Image
              key={detailProduct?.id}
              resizeMode="stretch"
              style={styles.wrap}
              source={{ uri: detailProduct?.image_url }}
            />
          </View>
          <ScrollView
            style={styles.scrollCointainer}
            showsVerticalScrollIndicator={false}>
            <View style={styles.productContainer}>
              <Text style={styles.cardName}>{detailProduct?.name}</Text>
              <Text style={styles.txtSecondary}>
                {onCheckCategories(detailProduct.Categories)}
              </Text>
              <NumberFormat
                value={detailProduct?.base_price}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'Rp'}
                renderText={value => (
                  <Text style={styles.txtPrice}>{value}</Text>
                )}
              />
            </View>
            <View style={styles.cardUser}>
              <Image
                source={{ uri: detailProduct?.User?.image_url }}
                style={styles.userImg}
              />
              <View style={styles.userContainer}>
                <Text style={styles.cardName}>
                  {detailProduct?.User?.full_name}
                </Text>
                <Text style={styles.txtSecondary}>
                  {detailProduct?.User?.city}
                </Text>
              </View>
            </View>
            <View style={styles.cardDesc}>
              <Text style={styles.cardName}>Deskripsi</Text>
              <Text style={styles.txtDesc}>{detailProduct?.description}</Text>
            </View>
          </ScrollView>
          <TouchableOpacity
            style={[
              styles.btnTerbitkan,
              {
                backgroundColor: btnActive
                  ? COLORS.primaryPurple4
                  : COLORS.neutral2,
              },
            ]}
            onPress={
              btnActive
                ? () => {
                    // if (access_token === '') {
                    //   navigation.navigate('Login');
                    // } else {
                    //   handleSnapPress(0);
                    // }
                    handleSnapPress(0);
                  }
                : null
            }>
            <Text style={styles.txtBtn}>
              {btnActive
                ? 'Saya Tertarik dan ingin Nego'
                : 'Menunggu respon penjual'}
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
        {isOpen ? (
          <BottomSheet
            ref={sheetRef}
            snapPoints={snapPoints}
            handleIndicatorStyle={styles.handleIndicatorStyle}
            enablePanDownToClose={true}
            backdropComponent={renderBackdrop}
            onChange={handleSheetChanges}
            onClose={() => setIsOpen(false)}>
            <RenderBsView />
          </BottomSheet>
        ) : null}
      </GestureHandlerRootView>
    );
  }
};

export default DetailProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.neutral1,
  },
  wrap: {
    width: WIDTH,
    height: ms(300),
    zIndex: -1,
  },
  wrapDot: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: ms(42),
  },
  dotActive: {
    margin: ms(3),
    color: COLORS.neutral1,
  },
  dot: {
    margin: ms(3),
    color: COLORS.neutral3,
  },
  iconBack: {
    height: ms(24),
    width: ms(24),
    tintColor: COLORS.neutral5,
  },
  btnBack: {
    position: 'absolute',
    backgroundColor: COLORS.neutral1,
    borderRadius: ms(20),
    marginLeft: ms(16),
    marginTop: ms(16),
  },
  productContainer: {
    backgroundColor: COLORS.neutral1,
    marginHorizontal: ms(16),
    paddingVertical: ms(16),
    paddingLeft: ms(24),
    borderRadius: ms(16),
    marginBottom: ms(16),
    borderColor: COLORS.neutral2,
    borderWidth: ms(1),
  },
  cardName: {
    fontFamily: 'Poppins-Medium',
    fontSize: ms(14),
    color: COLORS.neutral5,
  },
  txtSecondary: {
    fontFamily: 'Poppins-Regular',
    fontSize: ms(10),
    color: COLORS.neutral3,
  },
  txtPrice: {
    fontFamily: 'Poppins-Regular',
    fontSize: ms(14),
    color: COLORS.neutral5,
  },
  cardUser: {
    flexDirection: 'row',
    backgroundColor: COLORS.neutral1,
    marginHorizontal: ms(16),
    paddingVertical: ms(16),
    paddingLeft: ms(16),
    borderRadius: ms(16),
    marginBottom: ms(16),
    borderColor: COLORS.neutral2,
    borderWidth: ms(1),
  },
  userImg: {
    width: ms(48),
    height: ms(48),
    borderRadius: ms(12),
  },
  userContainer: {
    justifyContent: 'center',
    marginLeft: ms(16),
  },
  txtDesc: {
    fontFamily: 'Poppins-Regular',
    fontSize: ms(14),
    color: COLORS.neutral3,
    marginTop: ms(10),
  },
  cardDesc: {
    backgroundColor: COLORS.neutral1,
    marginHorizontal: ms(16),
    padding: ms(16),
    borderRadius: ms(16),
    marginBottom: ms(16),
    borderColor: COLORS.neutral2,
    borderWidth: ms(1),
  },
  scrollCointainer: {
    flex: 1,
    marginTop: ms(-32),
  },
  btnTerbitkan: {
    flex: 1,
    width: '91.5%',
    position: 'absolute',
    backgroundColor: COLORS.primaryPurple4,
    alignSelf: 'center',
    borderRadius: ms(16),
    bottom: ms(24),
  },
  txtBtn: {
    color: COLORS.neutral1,
    fontFamily: 'Poppins-Medium',
    fontSize: ms(14),
    textAlign: 'center',
    marginVertical: ms(14),
  },
  bsContainer: {
    paddingHorizontal: ms(32),
    paddingTop: ms(8),
    flex: 1,
  },
  bsProduct: {
    flexDirection: 'row',
    borderRadius: ms(16),
    borderColor: COLORS.neutral2,
    borderWidth: ms(1),
    padding: ms(16),
    marginTop: ms(16),
  },
  bsProductText: {
    flexDirection: 'column',
    marginLeft: ms(16),
    justifyContent: 'center',
  },
  input: {
    borderWidth: ms(1),
    borderRadius: ms(16),
    borderColor: COLORS.neutral2,
    paddingHorizontal: ms(16),
    fontFamily: 'Poppins-Regular',
  },
  label: {
    fontFamily: 'Poppins-Regular',
    fontSize: ms(12),
    color: COLORS.neutral5,
    marginBottom: ms(4),
    marginTop: ms(16),
  },
  btnKirim: {
    backgroundColor: COLORS.primaryPurple4,
    marginTop: ms(24),
    borderRadius: ms(16),
  },
  handleIndicatorStyle: {
    backgroundColor: '#C4C4C4',
    borderRadius: ms(20),
    width: ms(60),
    height: ms(6),
    marginTop: ms(8),
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: COLORS.neutral1,
    justifyContent: 'center',
  },
  errors: {
    fontSize: ms(12),
    color: COLORS.alertDanger,
    fontFamily: 'Poppins-Medium',
  },
});
