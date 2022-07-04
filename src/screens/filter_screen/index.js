import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { Icons } from '../../assets/icons';
import { COLORS } from '../../assets/colors';
import { ms } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBuyerProduct } from '../../data/slices/buyerSlice';
import NumberFormat from 'react-number-format';

const FilterScreen = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { product } = useSelector(state => state.buyer);
  const { isLoading } = useSelector(state => state.global);
  const [searchText, setSearchText] = useState('');

  const [allProduct, setAllProduct] = useState(product);

  useEffect(() => {
    dispatch(
      getAllBuyerProduct({
        status: '',
        category_id: '',
        search: route.params.filterText,
      }),
    );
  }, [dispatch, route.params.filterText]);

  const ProductRender = ({ name, category, harga, image_url }) => (
    <TouchableOpacity style={styles.btnProduct}>
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
    <>
      <View style={styles.topContainer}>
        <TouchableOpacity
          onPress={() => {
            dispatch(
              getAllBuyerProduct({
                status: '',
                category_id: '',
                search: '',
              }),
            );
            navigation.navigate('Main');
          }}>
          <Image source={Icons.ArrowLeft} style={styles.iconBack} />
        </TouchableOpacity>
        <View>
          <TextInput
            style={styles.input}
            placeholder="Cari di Second Chance"
            onChangeText={text => setSearchText(text)}
          />
          <TouchableOpacity
            onPress={() => {
              setAllProduct(
                product.filter(item =>
                  item?.name?.toLowerCase().match(searchText.toLowerCase()),
                ),
              );
            }}>
            <Image source={Icons.Search} style={styles.search} />
          </TouchableOpacity>
        </View>
      </View>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator color={COLORS.primaryPurple4} size="large" />
        </View>
      ) : (
        <View style={styles.mainContainer}>
          <View style={styles.productContainer}>
            <FlatList
              data={allProduct}
              key={2}
              numColumns={2}
              columnWrapperStyle={styles.columnWrapperStyle}
              renderItem={({ item }) => (
                <ProductRender
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
        </View>
      )}
    </>
  );
};

export default FilterScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: ms(16),
    marginTop: ms(16),
  },
  iconBack: {
    height: ms(24),
    width: ms(24),
    tintColor: COLORS.neutral5,
    marginRight: ms(16),
  },
  input: {
    borderWidth: 1,
    borderRadius: ms(16),
    borderColor: COLORS.neutral2,
    paddingHorizontal: ms(16),
    fontFamily: 'Poppins-Regular',
    backgroundColor: COLORS.neutral1,
    fontSize: ms(14),
  },
  search: {
    width: ms(24),
    height: ms(24),
    marginRight: ms(16),
    tintColor: COLORS.neutral3,
    flexGrow: 0,
    marginTop: ms(-38),
    marginLeft: ms(268),
  },
  productContainer: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: ms(16),
    marginTop: ms(16),
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
  loadingContainer: {
    marginTop: ms(80),
  },
});
