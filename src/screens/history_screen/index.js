import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
} from 'react-native';
import React, { useState } from 'react';
import { COLORS } from '../../assets/colors';
import { Icons } from '../../assets/icons';
import { useNavigation } from '@react-navigation/native';
import { ms } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import LoadingWidget from '../../widgets/loading_widget';
import ScreenStatusBar from '../../widgets/screen_status_bar_widget';
import { getAllHistory } from '../../data/slices/historySlice';
import { FlatList } from 'react-native-gesture-handler';
import NumberFormat from 'react-number-format';

const dateConvert = date => {
  if (!date) {
    return '-';
  }
  const theDate = date.split('T')[0].split('-');
  return `${theDate[2]}-${theDate[1]}-${theDate[0]}`;
};

const ProdukCard = ({ item }) => {
  if (item.status === 'accepted') {
    return (
      <View style={styles.produkDitawarContainer}>
        <View style={styles.productRowContainer}>
          {item?.Product === null ? (
            <Image
              style={[styles.imageUser, { marginRight: ms(16) }]}
              source={require('../../assets/images/img_no_image.png')}
            />
          ) : (
            <Image
              style={[styles.imageUser, { marginRight: ms(16) }]}
              source={{ uri: item?.Product?.image_url }}
            />
          )}

          <View>
            <Text style={styles.regularSubTextDone}>Berhasil Ditawar</Text>
            <Text style={styles.regularText2}>{item.product_name}</Text>
            {item?.Product === null ? (
              <Text style={styles.regularText2}>-</Text>
            ) : (
              <NumberFormat
                value={item?.Product?.base_price}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'Rp'}
                renderText={value => (
                  <Text style={styles.regularText2}>{value}</Text>
                )}
              />
            )}
            <NumberFormat
              value={item.price}
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
  } else {
    return (
      <View style={styles.produkDitawarContainer}>
        <View style={styles.productRowContainer}>
          {item?.Product === null ? (
            <Image
              style={[styles.imageUser, { marginRight: ms(16) }]}
              source={require('../../assets/images/img_no_image.png')}
            />
          ) : (
            <Image
              style={[styles.imageUser, { marginRight: ms(16) }]}
              source={{ uri: item?.Product?.image_url }}
            />
          )}
          <View>
            <Text style={styles.regularSubTextFail}>Gagal Ditawar</Text>
            <Text style={styles.regularText2}>{item.product_name}</Text>
            {item?.Product === null ? (
              <Text style={styles.regularText2}>-</Text>
            ) : (
              <NumberFormat
                value={item?.Product?.base_price}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'Rp'}
                renderText={value => (
                  <Text style={styles.regularText2}>{value}</Text>
                )}
              />
            )}
            <NumberFormat
              value={item.price}
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
  }
};

const LengkapiInfoAkunScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { access_token } = useSelector(state => state.user);
  const { isLoading } = useSelector(state => state.global);
  const { historyData } = useSelector(state => state.history);

  const [refresh, setRefresh] = useState(false);

  const onRefresh = () => {
    setRefresh(true);
    dispatch(getAllHistory(access_token));
    setRefresh(false);
  };

  if (isLoading) {
    return <LoadingWidget />;
  } else {
    return (
      <View
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl onRefresh={onRefresh} />}
        style={styles.container}>
        <ScreenStatusBar />
        <View style={styles.top}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={Icons.ArrowLeft} style={styles.iconBack} />
          </TouchableOpacity>
          <Text style={styles.title}>Riwayat Pembelian</Text>
        </View>
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
          }
          key={'Produk'}
          data={historyData}
          showsVerticalScrollIndicator={false}
          style={{ padding: ms(12) }}
          renderItem={({ item }) => (
            <ProdukCard item={item} token={access_token} />
          )}
        />
      </View>
    );
  }
};

export default LengkapiInfoAkunScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  infoSellerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: ms(16),
    shadowColor: '#000000',
    backgroundColor: 'white',
    padding: ms(16),
    marginVertical: ms(16),
    shadowOpacity: 0.15,
    elevation: ms(4),
  },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  imageUser: {
    width: ms(60),
    height: ms(60),
    borderRadius: ms(12),
  },
  regularText: {
    fontSize: ms(14),
    color: COLORS.neutral5,
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
  regularSubTextDone: {
    fontSize: ms(10),
    color: 'green',
    fontWeight: 'bold',
    lineHeight: ms(14),
    fontFamily: 'Poppins-Regular',
  },
  regularSubTextFail: {
    fontSize: ms(10),
    color: 'red',
    fontWeight: 'bold',
    lineHeight: ms(14),
    fontFamily: 'Poppins-Regular',
  },
  regularText2: {
    fontSize: ms(14),
    color: 'black',
    fontWeight: '400',
    lineHeight: ms(20),
    fontFamily: 'Poppins-Regular',
  },
  titleText: {
    fontSize: ms(14),
    color: COLORS.neutral4,
    fontWeight: '400',
    lineHeight: ms(20),
    fontFamily: 'Poppins-Regular',
    flexShrink: 1,
  },
  bottonEdit: {
    fontSize: ms(12),
    fontFamily: 'Poppins-Medium',
    borderWidth: ms(1),
    borderColor: COLORS.primaryPurple4,
    borderRadius: ms(8),
    paddingVertical: ms(4),
    paddingHorizontal: ms(12),
    alignSelf: 'center',
  },
  bottonEditText: {
    color: COLORS.neutral5,
    fontWeight: '500',
    lineHeight: ms(18),
  },
  listcategoryContainer: { flexGrow: 0 },
  listcategory: {
    flexDirection: 'row',
    paddingVertical: ms(12),
    paddingHorizontal: ms(16),
    backgroundColor: COLORS.primaryPurple1,
    borderRadius: ms(12),
    alignSelf: 'center',
    marginRight: ms(16),
  },
  icon: {
    width: ms(20),
    height: ms(20),
    marginRight: ms(8),
  },
  daftarProdukContainer: {
    marginTop: ms(16),
    flex: 1,
  },
  produkContainer: {
    marginBottom: ms(14),
    marginHorizontal: ms(8),
    marginTop: ms(2),
    padding: ms(8),
    borderRadius: ms(4),
    shadowColor: '#000000',
    backgroundColor: 'white',
    shadowOpacity: 0.15,
    elevation: ms(4),
    flexShrink: 1,
  },
  produkTerjualContainer: {
    borderBottomWidth: ms(1),
    borderBottomColor: COLORS.neutral01,
    paddingBottom: ms(16),
    marginTop: ms(16),
  },
  produkDitawarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: ms(1),
    borderBottomColor: COLORS.neutral01,
    paddingBottom: ms(16),
    marginTop: ms(16),
  },
  imageProduk: { width: ms(140), height: ms(100), borderRadius: ms(4) },
  tambahProduk: {
    width: '46%',
    height: ms(206),
    marginTop: ms(16),
    borderRadius: ms(4),
    borderWidth: ms(1),
    borderStyle: 'dashed',
    borderColor: COLORS.neutral2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nothingSold: {
    width: ms(172),
    height: ms(121),
    marginTop: ms(80),
    alignSelf: 'center',
  },
  nothingSoldText: {
    margin: ms(16),
    textAlign: 'center',
    fontSize: ms(14),
    color: COLORS.neutral3,
    fontWeight: '400',
    lineHeight: ms(20),
    fontFamily: 'Poppins-Regular',
  },
  input: {
    borderWidth: 1,
    borderRadius: ms(16),
    borderColor: COLORS.neutral2,
    paddingHorizontal: ms(16),
    fontFamily: 'Poppins-Regular',
    marginVertical: ms(4),
  },
  dropdownText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: COLORS.neutral5,
  },
  placeholderDropdown: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: COLORS.neutral3,
  },
  regularText2Cancel: {
    fontSize: ms(14),
    color: COLORS.neutral5,
    fontWeight: '400',
    lineHeight: ms(20),
    fontFamily: 'Poppins-Regular',
    textDecorationLine: 'line-through',
  },
  txtButton: {
    fontFamily: 'Poppins-Regular',
    color: COLORS.neutral1,
    textAlign: 'center',
    fontSize: ms(10),
    fontWeight: '400',
  },
  button: {
    marginTop: ms(10),
    borderRadius: ms(16),
    padding: ms(12),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primaryPurple4,
  },
  mainProdukContainer: {
    flexShrink: 1,
    alignItems: 'center',
  },
  statusTextContainer: status => ({
    backgroundColor: status === 'sold' ? 'red' : 'green',
    padding: ms(8),
    borderRadius: ms(6),
    width: ms(140),
    alignItems: 'center',
    marginVertical: ms(10),
  }),
  produkControlContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  deleteButton: {
    alignSelf: 'center',
  },
  iconSizeController: {
    height: ms(26),
    width: ms(24),
  },
  productRowContainer: {
    flexDirection: 'row',
  },
});
