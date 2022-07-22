import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, {
  useState,
  useCallback,
  useRef,
  useMemo,
  useEffect,
} from 'react';
import { COLORS } from '../../assets/colors';
import { Icons } from '../../assets/icons';
import { useNavigation } from '@react-navigation/native';
import { ms } from 'react-native-size-matters';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import {
  getSellerOrderByID,
  updateSellerOrder,
  updateSellerProduct,
} from '../../data/slices/sellerSlice';
import NumberFormat from 'react-number-format';
import LoadingWidget from '../../widgets/loading_widget';

const dateConvert = date => {
  if (!date) {
    return '-';
  }
  const theDate = date.split('T')[0].split('-');
  return `${theDate[2]}-${theDate[1]}-${theDate[0]}`;
};

const ProdukYangDitawarCard = ({ item }) => {
  return (
    <View style={styles.produkCard}>
      <View style={styles.row}>
        <Image
          style={[styles.imageUser, { marginRight: ms(16) }]}
          source={{ uri: item?.Product?.image_url }}
        />

        <View>
          <Text style={styles.regularSubText}>Penawaran produk</Text>
          <Text style={styles.regularText2}>{item?.Product?.name}</Text>
          <NumberFormat
            value={item?.Product?.base_price}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'Rp'}
            renderText={value => (
              <Text style={styles.regularText2}>{value}</Text>
            )}
          />
          <NumberFormat
            value={item?.price}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'Rp'}
            renderText={value => (
              <Text style={styles.regularText2}>Ditawar {value}</Text>
            )}
          />
        </View>
      </View>
      <Text style={styles.regularSubText}>
        {dateConvert(item?.transaction_date)}
      </Text>
    </View>
  );
};

const ProductMatchCard = ({ item }) => {
  return (
    <View style={styles.productMatchContainer}>
      <Text style={styles.titleProductMatch}>Product Match</Text>
      <View style={styles.itemProductMatch}>
        <Image
          style={styles.imageUser}
          source={{ uri: item?.User?.image_url }}
        />
        <View style={{ marginLeft: ms(16) }}>
          <Text style={styles.regularText}>{item?.User?.full_name}</Text>
          <Text style={styles.regularSubText}>{item?.User?.city}</Text>
        </View>
      </View>

      <View style={styles.itemProductMatch}>
        <Image
          style={styles.imageUser}
          source={{ uri: item?.Product?.image_url }}
        />
        <View style={{ marginLeft: ms(16) }}>
          <Text style={styles.regularText2}>{item?.Product?.name}</Text>
          <NumberFormat
            value={item?.Product?.base_price}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'Rp'}
            renderText={value => <Text style={styles.oldPrice}>{value}</Text>}
          />
          <NumberFormat
            value={item?.price}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'Rp'}
            renderText={value => (
              <Text style={styles.regularText2}>Ditawar {value}</Text>
            )}
          />
        </View>
      </View>
    </View>
  );
};

const RenderTerimaBsView = ({ item }) => {
  const sheetRef = useRef(null);

  const handleClose = useCallback(index => {
    sheetRef.current?.snapToIndex(index);
  }, []);

  return (
    <BottomSheetView style={styles.bsContainer}>
      <View>
        <Text style={styles.regularText}>
          Yeay kamu berhasil mendapat harga yang sesuai
        </Text>
        <Text
          style={[
            styles.regularSubText,
            { fontSize: ms(14), lineHeight: ms(20), marginTop: ms(8) },
          ]}>
          Segera hubungi pembeli melalui whatsapp untuk transaksi selanjutnya
        </Text>
      </View>
      <ProductMatchCard item={item} />
      <TouchableOpacity style={styles.button} onPress={() => handleClose(-1)}>
        <Text style={styles.txtButton}>Hubungi via Whatsapp</Text>
        <Image
          style={{
            width: ms(13.33),
            height: ms(13.33),
            tintColor: COLORS.neutral1,
            marginLeft: ms(8),
          }}
          source={Icons.Whatsapp}
        />
      </TouchableOpacity>
    </BottomSheetView>
  );
};

const statuses = [
  {
    id: 1,
    title: 'Berhasil terjual',
    subtitle: 'Kamu telah sepakat menjual produk ini kepada pembeli',
  },
  {
    id: 2,
    title: 'Batalkan transaksi',
    subtitle: 'Kamu membatalkan transaksi produk ini dengan pembeli',
  },
];

const RenderStatusBsView = ({ item, token }) => {
  const [selectStatus, setSelectStatus] = useState(false);
  const sheetRef = useRef(null);
  const dispatch = useDispatch();

  const handleClose = useCallback(index => {
    sheetRef.current?.snapToIndex(index);
  }, []);

  return (
    <BottomSheetView style={styles.bsContainer}>
      <Text style={styles.regularText}>Perbarui status penjualan produkmu</Text>
      {statuses.map(status => (
        <View style={styles.statusContainer}>
          <TouchableOpacity
            key={status.title}
            style={{
              width: ms(16),
              height: ms(16),
              borderRadius: ms(8),
              backgroundColor:
                selectStatus === status.title
                  ? COLORS.primaryPurple4
                  : COLORS.neutral2,
              borderWidth: selectStatus === status.title ? ms(3) : ms(0),
              borderColor:
                selectStatus === status.title
                  ? COLORS.neutral2
                  : COLORS.primaryPurple2,
              marginRight: ms(16),
            }}
            onPress={() => setSelectStatus(status.title)}
          />
          <View>
            <Text style={styles.regularText2}>{status.title}</Text>
            <Text
              style={[
                styles.regularSubText,
                { fontSize: ms(14), lineHeight: ms(20), marginTop: ms(8) },
              ]}>
              {status.subtitle}
            </Text>
          </View>
        </View>
      ))}

      <TouchableOpacity
        style={[
          styles.button,
          {
            marginTop: ms(40),
            backgroundColor: selectStatus
              ? COLORS.primaryPurple4
              : COLORS.neutral2,
          },
        ]}
        onPress={() => {
          handleClose(-1);
          if (selectStatus === 'Berhasil terjual') {
            const formData = new FormData();
            formData.append('status', 'sold');
            dispatch(
              updateSellerProduct({
                id: item.id,
                token: token,
                data: formData,
              }),
            );
            dispatch(
              getSellerOrderByID({
                token: token,
                id: item.id,
              }),
            );
          } else {
            const formData = new FormData();
            formData.append('status', 'declined');
            dispatch(
              updateSellerOrder({
                id: item.id,
                token: token,
                data: formData,
              }),
            );
            dispatch(
              getSellerOrderByID({
                token: token,
                id: item.id,
              }),
            );
          }
        }}>
        <Text style={styles.txtButton}>Kirim</Text>
      </TouchableOpacity>
    </BottomSheetView>
  );
};

const RenderProductList = ({ item, type }) => {
  const dispatch = useDispatch();
  const { access_token } = useSelector(state => state.user);

  const sheetRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const snapPoints = useMemo(() => ['69%', '90%'], []);

  const handleSnapPress = useCallback(index => {
    sheetRef.current?.snapToIndex(index);
    setIsOpen(true);
  }, []);

  const handleSheetChanges = useCallback(index => {
    console.log('handleSheetChanges', index);
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

  if (item?.Product?.status === 'sold') {
    return (
      <View style={styles.produkCard}>
        <View style={styles.row}>
          <Image
            style={[styles.imageUser, { marginRight: ms(16) }]}
            source={{ uri: item?.Product?.image_url }}
          />
          <View>
            <Text style={styles.regularSubText}>Berhasil Terjual</Text>
            <Text style={styles.regularText2}>{item?.Product?.name}</Text>
            <NumberFormat
              value={item?.price}
              displayType={'text'}
              thousandSeparator={true}
              prefix={'Rp'}
              renderText={value => (
                <Text style={styles.regularText2}>{value}</Text>
              )}
            />
          </View>
        </View>
        <Text style={styles.regularSubText}>
          {dateConvert(item?.transaction_date)}
        </Text>
      </View>
    );
  } else {
    if (type === 'accepted') {
      return (
        <View style={styles.produkCardContainer}>
          <ProdukYangDitawarCard item={item} />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.buttonLeft}
              onPress={() => handleSnapPress(0)}>
              <Text style={[styles.txtButton, { color: COLORS.black }]}>
                Status
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonHubungi}>
              <Text style={[styles.txtButton, { marginRight: ms(16) }]}>
                Hubungi
              </Text>
              <Image
                style={{
                  width: ms(11.67),
                  height: ms(11.67),
                  tintColor: COLORS.neutral1,
                }}
                source={Icons.Whatsapp}
              />
            </TouchableOpacity>
          </View>
          {isOpen ? (
            <BottomSheet
              ref={sheetRef}
              snapPoints={snapPoints}
              handleIndicatorStyle={styles.handleIndicatorStyle}
              enablePanDownToClose={true}
              backdropComponent={renderBackdrop}
              onChange={handleSheetChanges}
              onClose={() => setIsOpen(false)}>
              <RenderStatusBsView item={item} token={access_token} />
            </BottomSheet>
          ) : null}
        </View>
      );
    }

    if (type === 'pending') {
      return (
        <View style={styles.produkCardContainer}>
          <ProdukYangDitawarCard item={item} />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.buttonLeft}
              onPress={() => {
                const formData = new FormData();
                formData.append('status', 'declined');
                dispatch(
                  updateSellerOrder({
                    id: item.id,
                    token: access_token,
                    data: formData,
                  }),
                );
                dispatch(
                  getSellerOrderByID({
                    token: access_token,
                    id: item.id,
                  }),
                );
              }}>
              <Text style={[styles.txtButton, { color: COLORS.black }]}>
                Tolak
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonRight}
              onPress={() => {
                handleSnapPress(0);
                const formData = new FormData();
                formData.append('status', 'accepted');
                dispatch(
                  updateSellerOrder({
                    id: item.id,
                    token: access_token,
                    data: formData,
                  }),
                );
                dispatch(
                  getSellerOrderByID({
                    token: access_token,
                    id: item.id,
                  }),
                );
              }}>
              <Text style={styles.txtButton}>Terima</Text>
            </TouchableOpacity>
          </View>
          {isOpen ? (
            <BottomSheet
              ref={sheetRef}
              snapPoints={snapPoints}
              handleIndicatorStyle={styles.handleIndicatorStyle}
              enablePanDownToClose={true}
              backdropComponent={renderBackdrop}
              onChange={handleSheetChanges}
              onClose={() => setIsOpen(false)}>
              <RenderTerimaBsView item={item} />
            </BottomSheet>
          ) : null}
        </View>
      );
    } else {
      return (
        <View style={styles.produkCard}>
          <View style={styles.row}>
            <Image
              style={[styles.imageUser, { marginRight: ms(16) }]}
              source={{ uri: item?.Product?.image_url }}
            />
            <View>
              <Text style={styles.regularSubText}>Gagal Ditawar</Text>
              <Text style={styles.regularText2}>{item?.Product?.name}</Text>
              <NumberFormat
                value={item?.Product?.base_price}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'Rp'}
                renderText={value => (
                  <Text style={styles.regularText2}>{value}</Text>
                )}
              />
              <NumberFormat
                value={item?.price}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'Rp'}
                renderText={value => (
                  <Text style={styles.regularText2Cancel}>Ditawar {value}</Text>
                )}
              />
            </View>
          </View>
          <Text style={styles.regularSubText}>
            {dateConvert(item?.transaction_date)}
          </Text>
        </View>
      );
    }
  }
};

const InfoPenawarScreen = ({ route }) => {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const { id } = route.params;
  const { access_token } = useSelector(state => state.user);
  const { isLoading } = useSelector(state => state.global);
  const { sellerOrderDetail } = useSelector(state => state.seller);

  useEffect(() => {
    dispatch(
      getSellerOrderByID({
        token: access_token,
        id: id,
      }),
    );
  }, [access_token, dispatch, id]);

  if (isLoading) {
    return <LoadingWidget />;
  } else {
    return (
      <GestureHandlerRootView style={styles.container}>
        <SafeAreaView>
          <View style={styles.top}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={Icons.ArrowLeft} style={styles.icon} />
            </TouchableOpacity>
            <Text style={styles.title}>Info Penawar</Text>
          </View>
          <View style={styles.infoBuyerContainer}>
            {sellerOrderDetail?.User?.image_url === null ? (
              <Image
                style={styles.imageUser}
                source={require('../../assets/images/img_no_image.png')}
              />
            ) : (
              <Image
                style={styles.imageUser}
                source={{ uri: sellerOrderDetail?.User?.image_url }}
              />
            )}
            <View style={{ marginLeft: ms(16) }}>
              <Text style={styles.regularText}>
                {sellerOrderDetail?.User?.full_name}
              </Text>
              <Text style={styles.regularSubText}>
                {sellerOrderDetail?.User?.city}
              </Text>
            </View>
          </View>
          <Text style={[styles.regularText, { marginVertical: ms(8) }]}>
            Daftar Produkmu yang Ditawar
          </Text>
          <RenderProductList
            item={sellerOrderDetail}
            type={sellerOrderDetail?.status}
          />
        </SafeAreaView>
      </GestureHandlerRootView>
    );
  }
};

export default InfoPenawarScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.neutral1,
    padding: ms(16),
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: ms(16),
  },
  icon: {
    height: ms(24),
    width: ms(24),
    tintColor: COLORS.neutral5,
  },
  title: {
    flex: 1,
    fontSize: ms(14),
    color: COLORS.neutral5,
    fontWeight: '500',
    lineHeight: ms(20),
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
  },
  infoBuyerContainer: {
    flexDirection: 'row',
    borderRadius: ms(16),
    shadowColor: '#000000',
    backgroundColor: 'white',
    padding: ms(16),
    marginVertical: ms(16),
    shadowOpacity: 0.15,
    elevation: ms(4),
  },
  produkCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
  },
  imageUser: {
    width: ms(48),
    height: ms(48),
    borderRadius: ms(12),
  },
  regularText: {
    fontSize: ms(14),
    color: COLORS.black,
    fontWeight: '500',
    lineHeight: ms(20),
    fontFamily: 'Poppins-Medium',
  },
  regularSubText: {
    fontSize: ms(10),
    color: COLORS.neutral3,
    fontWeight: '400',
    lineHeight: ms(14),
    fontFamily: 'Poppins-Regular',
  },
  regularText2: {
    fontSize: ms(14),
    color: COLORS.neutral5,
    fontWeight: '400',
    lineHeight: ms(20),
    fontFamily: 'Poppins-Regular',
  },
  regularText2Cancel: {
    fontSize: ms(14),
    color: COLORS.neutral5,
    fontWeight: '400',
    lineHeight: ms(20),
    fontFamily: 'Poppins-Regular',
    textDecorationLine: 'line-through',
  },
  produkCardContainer: {
    borderBottomWidth: ms(1),
    borderBottomColor: COLORS.neutral01,
    paddingBottom: ms(16),
    marginBottom: ms(16),
  },
  produkCardList: { marginTop: ms(8) },
  imageProduk: { width: ms(140), height: ms(100), borderRadius: ms(4) },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: ms(16),
  },
  buttonRight: {
    backgroundColor: COLORS.primaryPurple4,
    borderRadius: ms(16),
    borderWidth: ms(1),
    borderColor: COLORS.primaryPurple4,
    flexGrow: 1,
    height: ms(36),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonHubungi: {
    backgroundColor: COLORS.primaryPurple4,
    borderRadius: ms(16),
    borderWidth: ms(1),
    borderColor: COLORS.primaryPurple4,
    flexGrow: 1,
    height: ms(36),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '20%',
  },
  buttonLeft: {
    backgroundColor: COLORS.neutral1,
    borderRadius: ms(16),
    borderWidth: ms(1),
    borderColor: COLORS.primaryPurple4,
    flexGrow: 1,
    marginRight: ms(16),
    height: ms(36),
    justifyContent: 'center',
  },
  txtButton: {
    fontFamily: 'Poppins-Regular',
    color: COLORS.neutral1,
    textAlign: 'center',
    fontSize: ms(14),
    fontWeight: '400',
  },
  listcategory: {
    flexDirection: 'row',
    paddingVertical: ms(12),
    paddingHorizontal: ms(16),
    backgroundColor: COLORS.primaryPurple1,
    borderRadius: ms(12),
    alignSelf: 'center',
    marginRight: ms(16),
  },
  bsContainer: {
    paddingHorizontal: ms(32),
    paddingTop: ms(8),
    flex: 1,
  },
  handleIndicatorStyle: {
    backgroundColor: '#C4C4C4',
    borderRadius: ms(20),
    width: ms(60),
    height: ms(6),
    marginTop: ms(8),
  },
  productMatchContainer: {
    borderRadius: ms(16),
    shadowColor: '#000000',
    backgroundColor: 'white',
    padding: ms(16),
    marginVertical: ms(16),
    shadowOpacity: 0.15,
    elevation: ms(4),
  },
  itemProductMatch: { flexDirection: 'row', marginTop: ms(16) },
  titleProductMatch: {
    fontSize: ms(14),
    color: COLORS.black,
    fontWeight: '500',
    lineHeight: ms(20),
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
  },
  oldPrice: {
    fontSize: ms(14),
    color: COLORS.neutral5,
    fontWeight: '400',
    lineHeight: ms(20),
    fontFamily: 'Poppins-Regular',
    textDecorationLine: 'line-through',
  },
  button: {
    borderRadius: ms(16),
    height: ms(48),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primaryPurple4,
  },
  statusContainer: { flexDirection: 'row', marginTop: ms(24) },
});
