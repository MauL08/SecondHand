import {
  FlatList,
  Image,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { ms } from 'react-native-size-matters';
import { COLORS } from '../../assets/colors';
import { Icons } from '../../assets/icons';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllBuyerProduct,
  getBuyerProductByID,
  getNextPageProduct,
} from '../../data/slices/buyerSlice';
import {
  getAllSellerBanner,
  getSellerCategory,
} from '../../data/slices/sellerSlice';
import NumberFormat from 'react-number-format';
import { useNavigation } from '@react-navigation/native';
import LoadingWidget from '../../widgets/loading_widget';
import ScreenStatusBar from '../../widgets/screen_status_bar_widget';
import Carousel from 'react-native-snap-carousel';

const { width } = Dimensions.get('screen');

const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { product, nextPageProduct } = useSelector(state => state.buyer);
  const { category, banner } = useSelector(state => state.seller);
  const { isLoading, isSecondLoading } = useSelector(state => state.global);

  const [currCategory, setCurrCategory] = useState('');
  const [searchText, setSearchText] = useState('');
  const [allCategory, setAllCategory] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const [pages, setPages] = useState(1);

  useEffect(() => {
    dispatch(getSellerCategory());
    dispatch(getAllSellerBanner());
    dispatch(
      getAllBuyerProduct({
        status: '',
        category_id: currCategory,
        search: '',
        page: 1,
        per_page: 15,
      }),
    );
    fetchNextProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currCategory, dispatch]);

  useEffect(() => {
    setAllCategory([
      {
        id: '',
        name: 'Semua',
      },
      ...category,
    ]);
  }, [category]);

  const fetchNextProduct = () => {
    dispatch(
      getNextPageProduct({
        status: '',
        category_id: currCategory,
        search: '',
        page: pages + 1,
        per_page: 15,
      }),
    );
    setPages(currState => currState + 1);
  };

  const onCategoryProductCheck = cat => {
    if (!cat) {
      return '';
    }
    return cat[0]?.name;
  };

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(getSellerCategory());
    dispatch(getAllSellerBanner());
    dispatch(
      getAllBuyerProduct({
        status: '',
        category_id: currCategory,
        search: '',
        page: 1,
        per_page: 15,
      }),
    );
    setAllCategory([
      {
        id: '',
        name: 'Semua',
      },
      ...category,
    ]);
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <FlatList
        data={[]}
        keyExtractor={() => 'key'}
        renderItem={null}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListHeaderComponent={
          <>
            <ScreenStatusBar />
            <Image
              style={styles.gradient}
              source={require('../../assets/images/img_gradient_home.png')}
            />
            <View style={styles.topContainer}>
              <View style={styles.searchBarContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Cari di Second Hand"
                  placeholderTextColor="grey"
                  onChangeText={text => setSearchText(text)}
                />
                <TouchableOpacity
                  onPress={() =>
                    dispatch(
                      getAllBuyerProduct({
                        status: '',
                        category_id: currCategory,
                        search: searchText,
                        page: 1,
                        per_page: 15,
                      }),
                    )
                  }>
                  <Image source={Icons.Search} style={styles.search} />
                </TouchableOpacity>
              </View>
              <View style={styles.bannerWrapper}>
                {isLoading ? (
                  <Image
                    source={require('../../assets/images/img_no_image.png')}
                    style={styles.onLoadBannerImage}
                  />
                ) : (
                  <Carousel
                    layout={'default'}
                    sliderWidth={width}
                    itemWidth={width - 100}
                    data={banner}
                    renderItem={({ item }) => (
                      <View style={styles.bannerContainer}>
                        <Image
                          source={{ uri: item.image_url }}
                          style={styles.gift}
                        />
                        <Text style={styles.txtTop1}>{item.name}</Text>
                      </View>
                    )}
                  />
                )}
              </View>
            </View>
            <Text style={styles.midTitle}>Telusuri Kategori</Text>
            <View style={styles.filterContainer}>
              {isLoading ? (
                <Text style={styles.loadKategoriText}>Memuat Kategori...</Text>
              ) : (
                <FlatList
                  data={allCategory}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.btnFilter(currCategory, item.id)}
                      onPress={() => setCurrCategory(item.id)}>
                      <Image
                        source={Icons.Search}
                        style={styles.searchFilter(currCategory, item.id)}
                      />
                      <Text style={styles.txtFilter(currCategory, item.id)}>
                        {item.name}
                      </Text>
                    </TouchableOpacity>
                  )}
                  keyExtractor={item => item.id}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                />
              )}
            </View>
            {isLoading ? (
              <View style={{ marginTop: ms(100) }}>
                <LoadingWidget />
              </View>
            ) : product.length === 0 ? (
              <View style={styles.dumpText}>
                <Text>Tidak ada produk yang tersedia</Text>
              </View>
            ) : (
              <View style={styles.productContainer}>
                <FlatList
                  data={product}
                  key={2}
                  numColumns={2}
                  columnWrapperStyle={styles.columnWrapperStyle}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.btnProduct}
                      onPress={() => {
                        dispatch(getBuyerProductByID(item.id));
                        navigation.navigate('DetailProduct');
                      }}>
                      {item.image_url === null || item.image_url === '' ? (
                        <Image
                          source={require('../../assets/images/img_no_image.png')}
                          style={styles.productImg}
                        />
                      ) : (
                        <Image
                          source={{ uri: item.image_url }}
                          style={styles.productImg}
                        />
                      )}
                      <Text numberOfLines={1} style={styles.txtProduct1}>
                        {item.name}
                      </Text>
                      <Text style={styles.txtProduct2}>
                        {onCategoryProductCheck(item.Categories)}
                      </Text>
                      <NumberFormat
                        value={item.base_price}
                        displayType={'text'}
                        thousandSeparator={true}
                        prefix={'Rp'}
                        renderText={value => (
                          <Text style={styles.txtProduct1}>{value}</Text>
                        )}
                      />
                    </TouchableOpacity>
                  )}
                  keyExtractor={item => String(item.id)}
                  showsVerticalScrollIndicator={false}
                />
              </View>
            )}
            {isSecondLoading ? (
              <LoadingWidget />
            ) : (
              nextPageProduct.length > 0 && (
                <TouchableOpacity
                  style={styles.loadMoreButton}
                  onPress={fetchNextProduct}>
                  <Text style={styles.loadMoreText}>Lebih Banyak Produk</Text>
                </TouchableOpacity>
              )
            )}
          </>
        }
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.neutral1,
  },
  gradient: {
    position: 'absolute',
    width: '100%',
    height: ms(398),
    left: 0,
    top: 0,
  },
  topContainer: {
    marginHorizontal: ms(16),
    marginTop: ms(16),
  },
  searchBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: ms(16),
    borderColor: COLORS.neutral2,
    paddingHorizontal: ms(16),
    fontFamily: 'Poppins-Regular',
    backgroundColor: COLORS.neutral1,
    fontSize: ms(14),
  },
  input: {
    fontFamily: 'Poppins-Regular',
    backgroundColor: COLORS.neutral1,
    fontSize: ms(14),
    width: ms(270),
    color: 'black',
  },
  search: {
    width: ms(24),
    height: ms(24),
    tintColor: COLORS.neutral3,
  },
  gift: {
    width: width - 100,
    height: ms(150),
    marginTop: ms(38),
  },
  txtTop1: {
    fontSize: ms(20),
    fontFamily: 'Poppins-Bold',
    color: COLORS.neutral5,
    marginTop: ms(20),
  },
  txtTop2: {
    fontFamily: 'Poppins-Regular',
    fontSize: ms(10),
    marginTop: ms(16),
    color: COLORS.neutral5,
  },
  txtTop3: {
    fontFamily: 'Poppins-Medium',
    fontSize: ms(18),
    color: COLORS.alertDanger,
  },
  midTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: ms(14),
    color: COLORS.neutral5,
    marginTop: ms(25),
    marginLeft: ms(16),
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: ms(16),
    marginLeft: ms(16),
  },
  btnFilter: (currCat, id) => ({
    backgroundColor:
      currCat === id ? COLORS.primaryPurple4 : COLORS.primaryPurple1,
    flexDirection: 'row',
    borderRadius: ms(12),
    marginRight: ms(16),
  }),
  allBtnFilter: {
    backgroundColor: COLORS.primaryPurple4,
    flexDirection: 'row',
    borderRadius: ms(12),
    marginRight: ms(16),
  },
  searchFilter: (currCat, id) => ({
    width: ms(20),
    height: ms(20),
    marginVertical: ms(12),
    marginLeft: ms(16),
    tintColor: currCat === id ? 'white' : 'black',
  }),
  allSearchFilter: {
    width: ms(20),
    height: ms(20),
    marginVertical: ms(12),
    marginLeft: ms(16),
    tintColor: COLORS.neutral2,
  },
  txtFilter: (currCat, id) => ({
    fontFamily: 'Poppins-Regular',
    fontSize: ms(14),
    marginVertical: ms(12),
    marginRight: ms(16),
    marginLeft: ms(8),
    color: currCat === id ? 'white' : 'black',
  }),
  allTxtFilter: {
    fontFamily: 'Poppins-Regular',
    fontSize: ms(14),
    marginVertical: ms(12),
    marginRight: ms(16),
    marginLeft: ms(8),
    color: COLORS.neutral2,
  },
  productContainer: {
    flex: 1,
    marginHorizontal: ms(16),
    marginTop: ms(25),
    justifyContent: 'space-between',
  },
  btnProduct: {
    padding: ms(8),
    width: ms(156),
    height: ms(206),
    borderWidth: 1,
    borderRadius: ms(4),
    borderColor: COLORS.neutral2,
    marginBottom: ms(16),
  },
  productImg: {
    width: ms(140),
    height: ms(100),
    borderRadius: ms(4),
  },
  txtProduct1: {
    fontFamily: 'Poppins-Regular',
    fontSize: ms(14),
    color: COLORS.neutral5,
  },
  txtProduct2: {
    fontFamily: 'Poppins-Regular',
    fontSize: ms(10),
    color: COLORS.neutral3,
    marginTop: ms(4),
    marginBottom: ms(8),
  },
  columnWrapperStyle: {
    flex: 1,
    justifyContent: 'space-between',
  },
  dumpText: {
    marginTop: ms(80),
    color: COLORS.primaryPurple4,
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: ms(18),
  },
  loadKategoriText: {
    marginTop: ms(20),
    fontSize: ms(14),
    fontWeight: 'bold',
  },
  loadMoreButton: {
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: ms(10),
    marginBottom: ms(14),
    borderRadius: ms(8),
    padding: ms(12),
    backgroundColor: COLORS.primaryPurple4,
  },
  loadMoreText: {
    color: COLORS.neutral01,
    fontSize: ms(12),
    fontWeight: '700',
  },
  onLoadBannerImage: {
    alignSelf: 'center',
    width: width - 100,
    height: ms(150),
    marginVertical: ms(38),
    tintColor: 'grey',
  },
});
