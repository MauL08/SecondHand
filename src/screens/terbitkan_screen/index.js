import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import { ms } from 'react-native-size-matters';
import { COLORS } from '../../assets/colors';
import { Icons } from '../../assets/icons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { createSellerProduct } from '../../data/slices/sellerSlice';
import NumberFormat from 'react-number-format';

const WIDTH = Dimensions.get('window').width;

const DetailProductScreen = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { image, name, kategori, harga, deskripsi, lokasi } = route.params;
  const { userDetail, access_token } = useSelector(state => state.user);
  const { category } = useSelector(state => state.seller);
  const { isLoading } = useSelector(state => state.global);

  const [showCategory, setShowCategory] = useState('');

  const onShowCategory = useCallback(
    catID => {
      category.map(val => {
        if (val.id === catID) {
          setShowCategory(val.name);
        }
      });
    },
    [category],
  );

  const onPostProduct = () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('base_price', harga);
    formData.append('category_ids', kategori);
    formData.append('description', deskripsi);
    formData.append('location', lokasi);
    formData.append('image', {
      uri: image.uri,
      name: image.fileName,
      type: image.type,
    });
    dispatch(
      createSellerProduct({
        token: access_token,
        data: formData,
      }),
    );
  };

  useEffect(() => {
    onShowCategory(kategori);
  }, [category, kategori, onShowCategory]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrap}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.btnBack}>
          <Image source={Icons.ArrowLeft} style={styles.iconBack} />
        </TouchableOpacity>
        <Image
          resizeMode="stretch"
          style={styles.wrap}
          source={{ uri: image.uri }}
        />
      </View>
      <ScrollView
        style={styles.scrollCointainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.productContainer}>
          <Text style={styles.cardName}>{name}</Text>
          <Text style={styles.txtSecondary}>{showCategory}</Text>
          <NumberFormat
            value={harga}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'Rp'}
            renderText={value => <Text style={styles.txtPrice}>{value}</Text>}
          />
        </View>
        <View style={styles.cardUser}>
          {userDetail.image_url === null ? (
            <Image
              style={styles.userImg}
              source={require('../../assets/images/img_no_image.png')}
            />
          ) : (
            <Image
              source={{ uri: userDetail.image_url }}
              style={styles.userImg}
            />
          )}
          <View style={styles.userContainer}>
            <Text style={styles.cardName}>{userDetail.full_name}</Text>
            <Text style={styles.txtSecondary}>{userDetail.city}</Text>
          </View>
        </View>

        <View style={styles.cardDesc}>
          <Text style={styles.cardName}>Deskripsi</Text>
          <Text style={styles.txtDesc}>{deskripsi}</Text>
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.btnTerbitkan}
        onPress={() => {
          onPostProduct();
        }}>
        {isLoading ? (
          <ActivityIndicator color="white" style={{ marginVertical: ms(14) }} />
        ) : (
          <Text style={styles.txtBtn}>Terbitkan</Text>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
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
    width: '91.5%',
    position: 'absolute',
    backgroundColor: COLORS.primaryPurple4,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: ms(16),
    height: ms(48),
    marginTop: ms(600),
  },
  txtBtn: {
    color: COLORS.neutral1,
    fontFamily: 'Poppins-Medium',
    fontSize: ms(14),
    textAlign: 'center',
  },
});
