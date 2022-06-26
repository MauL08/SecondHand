import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { ms } from 'react-native-size-matters';
import { COLORS } from '../../assets/colors';
import { Icons } from '../../assets/icons';

const HomeScreen = () => {
  const filterName = [
    {
      id: 1,
      name: 'Search',
    },
    {
      id: 2,
      name: 'Hobi',
    },
    {
      id: 3,
      name: 'Kendaraan',
    },
  ];

  const productList = [
    {
      id: 1,
      name: 'Jam Tangan Casio',
      category: 'Aksesoris',
      harga: 'Rp 250.000',
      image_url:
        'https://www.utileincasa.it/wp-content/uploads/2021/10/6oM-lgd-olia-nayda-dB3pkARCxHI-unsplash-scaled-e1629735546986.jpg',
    },
    {
      id: 2,
      name: 'Smartwatch Samsung',
      category: 'Aksesoris',
      harga: 'Rp 3.550.000',
      image_url:
        'https://assets.website-files.com/5b749aeb30c2321291cb4485/5e543b78c56f7a4b3e961205_Screen%20Shot%202020-02-24%20at%2012.32.24%20PM.png',
    },
    {
      id: 3,
      name: 'Jam Tangan Casio',
      category: 'Aksesoris',
      harga: 'Rp 250.000',
      image_url:
        'https://www.utileincasa.it/wp-content/uploads/2021/10/6oM-lgd-olia-nayda-dB3pkARCxHI-unsplash-scaled-e1629735546986.jpg',
    },
  ];

  const FilterRender = ({ name }) => (
    <TouchableOpacity style={styles.btnFilter}>
      <Image source={Icons.Search} style={styles.searchFilter} />
      <Text style={styles.txtFilter}>{name}</Text>
    </TouchableOpacity>
  );

  const ProductRender = ({ name, category, harga, image_url }) => (
    <TouchableOpacity style={styles.btnProduct}>
      <Image source={{ uri: image_url }} style={styles.productImg} />
      <Text numberOfLines={1} style={styles.txtProduct1}>
        {name}
      </Text>
      <Text style={styles.txtProduct2}>{category}</Text>
      <Text style={styles.txtProduct1}>{harga}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Image
        style={styles.gradient}
        source={require('../../assets/images/img_gradient_home.png')}
      />
      <View style={styles.topContainer}>
        <TextInput style={styles.input} placeholder="Cari di Second Chance" />
        <TouchableOpacity>
          <Image source={Icons.Search} style={styles.search} />
        </TouchableOpacity>
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
          data={filterName}
          renderItem={({ item }) => <FilterRender name={item.name} />}
          keyExtractor={item => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View style={styles.productContainer}>
        <FlatList
          data={productList}
          key={2}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapperStyle}
          renderItem={({ item }) => (
            <ProductRender
              name={item.name}
              category={item.category}
              harga={item.harga}
              image_url={item.image_url}
            />
          )}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
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
    marginLeft: ms(308),
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
  btnFilter: {
    backgroundColor: COLORS.primaryPurple1,
    flexDirection: 'row',
    borderRadius: ms(12),
    marginRight: ms(16),
  },
  searchFilter: {
    width: ms(20),
    height: ms(20),
    marginVertical: ms(12),
    marginLeft: ms(16),
  },
  txtFilter: {
    fontFamily: 'Poppins-Regular',
    fontSize: ms(14),
    marginVertical: ms(12),
    marginRight: ms(16),
    marginLeft: ms(8),
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
});
