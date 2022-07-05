import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { ms } from 'react-native-size-matters';
import { COLORS } from '../../assets/colors';
import { Icons } from '../../assets/icons';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllBuyerProduct,
  getBuyerProductByID,
} from '../../data/slices/buyerSlice';
import { getSellerCategory } from '../../data/slices/sellerSlice';
import NumberFormat from 'react-number-format';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { product } = useSelector(state => state.buyer);
  const { category } = useSelector(state => state.seller);
  const { isLoading } = useSelector(state => state.global);

  const [currCategory, setCurrCategory] = useState('');
  const [searchText, setSearchText] = useState('');
  const [allCategory, setAllCategory] = useState([]);

  const [allProduct, setAllProduct] = useState([]);

  useEffect(() => {
    dispatch(
      getAllBuyerProduct({
        status: '',
        category_id: currCategory,
        search: '',
      }),
    );
    setAllCategory([
      {
        id: '',
        name: 'Semua',
      },
      ...category,
    ]);
    dispatch(getSellerCategory());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currCategory, dispatch]);

  useEffect(() => {
    searchProduct(searchText);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  const searchProduct = value => {
    setAllProduct(
      product.filter(item =>
        item?.name?.toLowerCase().match(value?.toLowerCase()),
      ),
    );
  };

  const FilterRender = ({ id, name }) => (
    <TouchableOpacity
      style={styles.btnFilter(currCategory, id)}
      onPress={() => setCurrCategory(id)}>
      <Image
        source={Icons.Search}
        style={styles.searchFilter(currCategory, id)}
      />
      <Text style={styles.txtFilter(currCategory, id)}>{name}</Text>
    </TouchableOpacity>
  );

  const ProductRender = ({ index, name, category, harga, image_url }) => (
    <TouchableOpacity
      style={styles.btnProduct}
      onPress={() => {
        dispatch(getBuyerProductByID(index));
        navigation.navigate('DetailProduct');
      }}>
      {image_url === null || image_url === '' ? (
        <Image
          source={require('../../assets/images/img_no_image.png')}
          style={styles.productImg}
        />
      ) : (
        <Image source={{ uri: image_url }} style={styles.productImg} />
      )}
      <Text numberOfLines={1} style={styles.txtProduct1}>
        {name}
      </Text>
      <Text style={styles.txtProduct2}>{category}</Text>
      <NumberFormat
        value={harga}
        displayType={'text'}
        thousandSeparator={true}
        prefix={'Rp'}
        renderText={value => <Text style={styles.txtProduct1}>{value}</Text>}
      />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Image
        style={styles.gradient}
        source={require('../../assets/images/img_gradient_home.png')}
      />
      <View style={styles.topContainer}>
        <View style={styles.searchBarContainer}>
          <TextInput
            style={styles.input}
            placeholder="Cari di Second Hand"
            onChangeText={text => {
              setSearchText(text);
              searchProduct(text);
            }}
          />
          <TouchableOpacity onPress={() => searchProduct(searchText)}>
            <Image source={Icons.Search} style={styles.search} />
          </TouchableOpacity>
        </View>
        <View style={styles.bannerWrapper}>
          <View>
            <Text style={styles.txtTop1}>
              Bulan Ramadhan{'\n'}Banyak diskon!
            </Text>
            <Text style={styles.txtTop2}>Diskon Hingga</Text>
            <Text style={styles.txtTop3}>60%</Text>
          </View>
          <Image
            source={require('../../assets/images/img_gift.png')}
            style={styles.gift}
          />
        </View>
      </View>
      <Text style={styles.midTitle}>Telusuri Kategori</Text>
      <View style={styles.filterContainer}>
        <FlatList
          data={allCategory}
          renderItem={({ item }) => (
            <FilterRender name={item.name} id={item.id} />
          )}
          keyExtractor={item => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator color={COLORS.primaryPurple4} size="large" />
        </View>
      ) : allProduct.length === 0 ? (
        <View style={styles.dumpText}>
          <Text>Tidak ada produk yang tersedia</Text>
        </View>
      ) : (
        <View style={styles.productContainer}>
          <FlatList
            data={allProduct}
            key={2}
            numColumns={2}
            columnWrapperStyle={styles.columnWrapperStyle}
            renderItem={({ item }) => (
              <ProductRender
                index={item.id}
                name={item.name}
                category={item?.Categories[0]?.name}
                harga={item.base_price}
                image_url={item.image_url}
              />
            )}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
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
  },
  search: {
    width: ms(24),
    height: ms(24),
    tintColor: COLORS.neutral3,
  },
  bannerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  gift: {
    width: ms(127),
    height: ms(123),
    marginTop: ms(38),
  },
  txtTop1: {
    fontSize: ms(20),
    fontFamily: 'Poppins-Bold',
    color: COLORS.neutral5,
    marginTop: ms(32),
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
    marginTop: ms(48),
    marginLeft: ms(16),
  },
  filterContainer: {
    flexDirection: 'row',
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
    flexDirection: 'row',
    marginHorizontal: ms(16),
    marginTop: ms(32),
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
  loadingContainer: {
    marginTop: ms(80),
  },
});
