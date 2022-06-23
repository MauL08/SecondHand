import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { Icons } from '../../assets/icons';
import { COLORS } from '../../assets/colors';
import { ms } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';

const FilterScreen = () => {
  const navigation = useNavigation();
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
    {
      id: 4,
      name: 'Smartwatch Samsung',
      category: 'Aksesoris',
      harga: 'Rp 3.550.000',
      image_url:
        'https://assets.website-files.com/5b749aeb30c2321291cb4485/5e543b78c56f7a4b3e961205_Screen%20Shot%202020-02-24%20at%2012.32.24%20PM.png',
    },
    {
      id: 5,
      name: 'Jam Tangan Casio',
      category: 'Aksesoris',
      harga: 'Rp 250.000',
      image_url:
        'https://www.utileincasa.it/wp-content/uploads/2021/10/6oM-lgd-olia-nayda-dB3pkARCxHI-unsplash-scaled-e1629735546986.jpg',
    },
    {
      id: 6,
      name: 'Smartwatch Samsung',
      category: 'Aksesoris',
      harga: 'Rp 3.550.000',
      image_url:
        'https://assets.website-files.com/5b749aeb30c2321291cb4485/5e543b78c56f7a4b3e961205_Screen%20Shot%202020-02-24%20at%2012.32.24%20PM.png',
    },
  ];

  const ProductRender = ({ name, category, harga, image_url }) => (
    <TouchableOpacity style={styles.btnProduct}>
      <Image
        source={{
          uri: image_url,
        }}
        style={styles.productImg}
      />
      <Text numberOfLines={1} style={styles.txtProduct1}>
        {name}
      </Text>
      <Text style={styles.txtProduct2}>{category}</Text>
      <Text style={styles.txtProduct1}>{harga}</Text>
    </TouchableOpacity>
  );
  return (
    <>
      <View style={styles.topContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={Icons.ArrowLeft} style={styles.iconBack} />
        </TouchableOpacity>
        <View>
          <TextInput style={styles.input} placeholder="Cari di Second Chance" />
          <TouchableOpacity>
            <Image source={Icons.Search} style={styles.search} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.mainContainer}>
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
      </View>
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
});
