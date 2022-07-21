import {
  Text,
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
  RefreshControl,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { COLORS } from '../../assets/colors';
import { ms } from 'react-native-size-matters';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Icons } from '../../assets/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import {
  getSellerOrder,
  // getSellerOrderByID,
  getSellerProduct,
} from '../../data/slices/sellerSlice';
import NumberFormat from 'react-number-format';
import LoadingWidget from '../../widgets/loading_widget';
import { getAllHistory } from '../../data/slices/historySlice';

const categories = [
  { id: 1, name: 'Produk', icon: Icons.Box },
  { id: 2, name: 'Diminati', icon: Icons.Heart },
  { id: 3, name: 'Terjual', icon: Icons.Dollar },
];

const onCategoryProductCheck = cat => {
  if (!cat) {
    return '';
  }
  return cat[0]?.name;
};

const ProdukCard = ({ item }) => {
  return (
    <TouchableOpacity style={styles.produkContainer}>
      <Image style={styles.imageProduk} source={{ uri: item.image_url }} />
      <Text style={[styles.regularText2, { paddingVertical: ms(4) }]}>
        {item.name}
      </Text>
      <Text style={styles.regularSubText}>
        {onCategoryProductCheck(item.Categories)}
      </Text>
      <NumberFormat
        value={item.base_price}
        displayType={'text'}
        thousandSeparator={true}
        prefix={'Rp'}
        renderText={value => (
          <Text style={[styles.regularText2, { paddingVertical: ms(4) }]}>
            {value}
          </Text>
        )}
      />
    </TouchableOpacity>
  );
};

const ProdukYangDitawarCard = ({ item, type }) => {
  const navigation = useNavigation();
  // const dispatch = useDispatch();
  // const { access_token } = useSelector(state => state.user);

  if (type === 'Diminati') {
    return (
      <TouchableOpacity
        style={styles.produkDitawarContainer}
        onPress={() => {
          navigation.navigate('InfoPenawar', {
            id: item.id,
          });
          // dispatch(
          //   getSellerOrderByID({
          //     token: access_token,
          //     id: item.id,
          //   }),
          // );
        }}>
        <View style={styles.row}>
          <Image
            style={[styles.imageUser, { marginRight: ms(16) }]}
            source={{ uri: item.Product.image_url }}
          />
          <View>
            <Text style={styles.regularSubText}>Penawaran produk</Text>
            <Text style={styles.regularText2}>{item.product_name}</Text>
            <NumberFormat
              value={item.Product.base_price}
              displayType={'text'}
              thousandSeparator={true}
              prefix={'Rp'}
              renderText={value => (
                <Text style={styles.regularText2}>{value}</Text>
              )}
            />
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
      </TouchableOpacity>
    );
  } else {
    return (
      <View style={styles.produkDitawarContainer}>
        <View style={styles.row}>
          <Image
            style={[styles.imageUser, { marginRight: ms(16) }]}
            source={{ uri: item.image_url }}
          />
          <View>
            <Text style={styles.regularSubText}>Berhasil Terjual</Text>
            <Text style={styles.regularText2}>{item.product_name}</Text>
            <NumberFormat
              value={item.price}
              displayType={'text'}
              thousandSeparator={true}
              prefix={'Rp'}
              renderText={value => (
                <Text style={styles.regularText2}>{value}</Text>
              )}
            />
          </View>
        </View>
      </View>
    );
  }
};

const DaftarJualScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState('Produk');

  const [refresh, setRefresh] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { userDetail, access_token } = useSelector(state => state.user);
  const { isLoading } = useSelector(state => state.global);
  const { sellerProduct, sellerOrder } = useSelector(state => state.seller);
  const { historyData } = useSelector(state => state.history);

  const onRefresh = () => {
    setRefresh(true);
    dispatch(getSellerProduct(access_token));
    dispatch(getAllHistory(access_token));
    dispatch(
      getSellerOrder({
        token: access_token,
        type: '',
      }),
    );
    setRefresh(false);
  };

  useEffect(() => {
    dispatch(getSellerProduct(access_token));
    dispatch(getAllHistory(access_token));
    dispatch(
      getSellerOrder({
        token: access_token,
        type: '',
      }),
    );
  }, [access_token, dispatch]);

  const setSelectedCategoryFilter = category => {
    setSelectedCategory(category);
    if (category === 'Produk') {
      dispatch(getSellerProduct(access_token));
    } else if (category === 'Diminati') {
      dispatch(
        getSellerOrder({
          token: access_token,
          type: '',
        }),
      );
    } else {
      dispatch(getAllHistory(access_token));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Daftar Jual Saya</Text>
      <View style={styles.infoSellerContainer}>
        <View style={styles.row}>
          <Image
            style={styles.imageUser}
            source={{ uri: userDetail.image_url }}
          />
          <View style={{ marginLeft: ms(16) }}>
            <Text style={styles.regularText}>{userDetail.full_name}</Text>
            <Text style={styles.regularSubText}>{userDetail.city}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.bottonEdit}
          onPress={() => navigation.navigate('LengkapiAkun')}>
          <Text style={styles.bo}>Edit</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        style={styles.listcategoryContainer}
        horizontal={true}
        showsHorizontalScrollIndicator={false}>
        {categories.map(category => (
          <TouchableOpacity
            key={category.name}
            style={[
              styles.listcategory,
              {
                backgroundColor:
                  selectedCategory === category.name
                    ? COLORS.primaryPurple4
                    : COLORS.primaryPurple1,
              },
            ]}
            onPress={() => {
              setSelectedCategoryFilter(category.name);
            }}>
            <Image
              style={[
                styles.icon,
                {
                  tintColor:
                    selectedCategory === category.name
                      ? COLORS.neutral1
                      : COLORS.neutral4,
                },
              ]}
              source={category.icon}
            />
            <Text
              style={[
                styles.regularText2,
                {
                  color:
                    selectedCategory === category.name
                      ? COLORS.neutral1
                      : COLORS.neutral4,
                },
              ]}>
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {selectedCategory === 'Produk' ? (
        <View style={styles.daftarProdukContainer}>
          {isLoading ? (
            <LoadingWidget />
          ) : sellerProduct?.length === 0 ? (
            <TouchableOpacity
              style={styles.tambahProduk}
              onPress={() => navigation.navigate('Jual')}>
              <Image
                source={Icons.Plus}
                style={[styles.icon, { tintColor: COLORS.neutral2 }]}
              />
              <Text style={styles.regularSubText}>Tambah Produk</Text>
            </TouchableOpacity>
          ) : (
            <FlatList
              refreshControl={
                <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
              }
              key={'Produk'}
              data={sellerProduct}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <ProdukCard name={item.name} icon={item.icon} item={item} />
              )}
            />
          )}
        </View>
      ) : selectedCategory === 'Diminati' ? (
        <View style={{ marginTop: ms(8), flex: 1 }}>
          {isLoading ? (
            <LoadingWidget />
          ) : sellerOrder.length === 0 ? (
            <View>
              <Image
                style={styles.nothingSold}
                source={require('../../assets/images/image_nothing_sold.png')}
              />
              <Text style={styles.nothingSoldText}>
                Belum ada produkmu yang diminati nih, sabar ya rejeki nggak
                kemana kok
              </Text>
            </View>
          ) : (
            <>
              <FlatList
                refreshControl={
                  <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
                }
                key={'Diminati'}
                data={sellerOrder}
                numColumns={1}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  <ProdukYangDitawarCard
                    name={item.name}
                    icon={item.icon}
                    item={item}
                    type="Diminati"
                  />
                )}
              />
            </>
          )}
        </View>
      ) : selectedCategory === 'Terjual' ? (
        <View style={{ marginTop: ms(8), flex: 1 }}>
          {isLoading ? (
            <LoadingWidget />
          ) : historyData.length === 0 ? (
            <View>
              <Image
                style={styles.nothingSold}
                source={require('../../assets/images/image_nothing_sold.png')}
              />
              <Text style={styles.nothingSoldText}>
                Belum ada produkmu yang terjual nih, sabar ya rejeki nggak
                kemana kok
              </Text>
            </View>
          ) : (
            <FlatList
              refreshControl={
                <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
              }
              key={'Terjual'}
              data={historyData}
              numColumns={1}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <ProdukYangDitawarCard
                  name={item.name}
                  icon={item.icon}
                  item={item}
                  type="Terjual"
                />
              )}
            />
          )}
        </View>
      ) : (
        <View />
      )}
    </SafeAreaView>
  );
};

export default DaftarJualScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.neutral1,
    padding: ms(16),
  },
  title: {
    fontSize: ms(20),
    lineHeight: ms(30),
    fontFamily: 'Poppins-Bold',
    color: COLORS.black,
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
  row: { flexDirection: 'row' },
  imageUser: {
    width: ms(48),
    height: ms(48),
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
  regularText2: {
    fontSize: ms(14),
    color: COLORS.neutral4,
    fontWeight: '400',
    lineHeight: ms(20),
    fontFamily: 'Poppins-Regular',
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
    height: ms(206),
    marginBottom: ms(14),
    marginHorizontal: ms(8),
    marginTop: ms(2),
    padding: ms(8),
    borderRadius: ms(4),
    shadowColor: '#000000',
    backgroundColor: 'white',
    shadowOpacity: 0.15,
    elevation: ms(4),
  },
  produkDitawarContainer: {
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
});
