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
import { useNavigation } from '@react-navigation/native';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
const WIDTH = Dimensions.get('window').width;

const DetailProductScreen = () => {
  const navigation = useNavigation();
  const [imgActive, setImgActive] = useState(0);
  const sheetRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [btnActive, setBtnActive] = useState(true);

  const onChange = nativeEvent => {
    if (nativeEvent) {
      const slide = Math.floor(
        nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
      );
      if (slide != imgActive) {
        setImgActive(slide);
      }
    }
  };

  const snapPoints = useMemo(() => ['69%', '90%'], []);

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

  const RenderBsView = () => (
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
            uri: 'https://www.utileincasa.it/wp-content/uploads/2021/10/6oM-lgd-olia-nayda-dB3pkARCxHI-unsplash-scaled-e1629735546986.jpg',
          }}
        />
        <View style={styles.bsProductText}>
          <Text style={styles.cardName}>Nama Penjual</Text>
          <Text style={styles.txtPrice}>Rp 250.000</Text>
        </View>
      </View>
      <Text style={styles.label}>Harga Tawar</Text>
      <TextInput style={styles.input} placeholder="Rp 0,00" />
      <TouchableOpacity style={styles.btnKirim} onPress={() => handleClose(-1)}>
        <Text style={styles.txtBtn}>Kirim</Text>
      </TouchableOpacity>
    </BottomSheetView>
  );

  const imageList = [
    {
      id: 1,
      image_url:
        'https://www.utileincasa.it/wp-content/uploads/2021/10/6oM-lgd-olia-nayda-dB3pkARCxHI-unsplash-scaled-e1629735546986.jpg',
    },
    {
      id: 2,
      image_url:
        'https://assets.website-files.com/5b749aeb30c2321291cb4485/5e543b78c56f7a4b3e961205_Screen%20Shot%202020-02-24%20at%2012.32.24%20PM.png',
    },
    {
      id: 3,
      image_url:
        'https://www.utileincasa.it/wp-content/uploads/2021/10/6oM-lgd-olia-nayda-dB3pkARCxHI-unsplash-scaled-e1629735546986.jpg',
    },
    {
      id: 4,
      image_url:
        'https://assets.website-files.com/5b749aeb30c2321291cb4485/5e543b78c56f7a4b3e961205_Screen%20Shot%202020-02-24%20at%2012.32.24%20PM.png',
    },
  ];

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.wrap}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.btnBack}>
            <Image source={Icons.ArrowLeft} style={styles.iconBack} />
          </TouchableOpacity>
          <ScrollView
            onScroll={({ nativeEvent }) => onChange(nativeEvent)}
            showsHorizontalScrollIndicator={false}
            pagingEnabled={true}
            horizontal={true}
            style={styles.wrap}>
            {imageList.map(item => (
              <Image
                key={item.id}
                resizeMode="stretch"
                style={styles.wrap}
                source={{ uri: item.image_url }}
              />
            ))}
          </ScrollView>
          <View style={styles.wrapDot}>
            {imageList.map((item, index) => (
              <Text
                key={item.id}
                style={imgActive == index ? styles.dotActive : styles.dot}>
                ●
              </Text>
            ))}
          </View>
        </View>
        <ScrollView
          style={styles.scrollCointainer}
          showsVerticalScrollIndicator={false}>
          <View style={styles.productContainer}>
            <Text style={styles.cardName}>Jam Tangan Casio</Text>
            <Text style={styles.txtSecondary}>Aksesoris</Text>
            <Text style={styles.txtPrice}>Rp 250.000</Text>
          </View>
          <View style={styles.cardUser}>
            <Image
              source={{ uri: 'https://randomuser.me/api/portraits/men/62.jpg' }}
              style={styles.userImg}
            />
            <View style={styles.userContainer}>
              <Text style={styles.cardName}>Nama Penjual</Text>
              <Text style={styles.txtSecondary}>Kota</Text>
            </View>
          </View>
          <View style={styles.cardDesc}>
            <Text style={styles.cardName}>Deskripsi</Text>
            <Text style={styles.txtDesc}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Text>
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
          onPress={btnActive ? () => handleSnapPress(0) : null}>
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
    </>
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
    flex: 1,
    width: '91.5%',
    position: 'absolute',
    backgroundColor: COLORS.primaryPurple4,
    alignSelf: 'center',
    borderRadius: ms(16),
    marginTop: ms(540),
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
});
