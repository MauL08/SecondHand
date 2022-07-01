import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState, useCallback, useRef, useMemo } from 'react';
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

// const dataProdukYangDitawar = [
//   {
//     id: 1,
//     name: 'Jam Tangan Casio',
//     price: 'Rp 250.000',
//     ditawar: 'Rp 200.000',
//     image: require('../../assets/images/image_produk_temporary.png'),
//     date: '20 Apr',
//     time: '14:04',
//   },
// ];

const ProdukYangDitawarCard = () => {
  return (
    <TouchableOpacity style={styles.produkCard}>
      <View style={styles.row}>
        <Image
          style={[styles.imageUser, { marginRight: ms(16) }]}
          source={require('../../assets/images/image_produk_temporary.png')}
        />

        <View>
          <Text style={styles.regularSubText}>Penawaran produk</Text>
          <Text style={styles.regularText2}>Jam Tangan Casio</Text>
          <Text style={styles.regularText2}>Rp 250.000</Text>
          <Text style={styles.regularText2}>Ditawar Rp 200.000</Text>
        </View>
      </View>

      <Text style={styles.regularSubText}>20 Apr, 14:04</Text>
    </TouchableOpacity>
  );
};

// const ProductMatchCard = () => {
//   return (
//     <View style={styles.productMatchContainer}>
//       <Text style={styles.titleProductMatch}>Product Match</Text>
//       <View style={styles.itemProductMatch}>
//         <Image
//           style={styles.imageUser}
//           source={require('../../assets/images/image_user_temporary.png')}
//         />
//         <View style={{ marginLeft: ms(16) }}>
//           <Text style={styles.regularText}>Nama Pembeli</Text>
//           <Text style={styles.regularSubText}>Kota</Text>
//         </View>
//       </View>

//       <View style={styles.itemProductMatch}>
//         <Image
//           style={styles.imageUser}
//           source={require('../../assets/images/image_produk_temporary.png')}
//         />
//         <View style={{ marginLeft: ms(16) }}>
//           <Text style={styles.regularText2}>Jam Tangan Casio</Text>
//           <Text style={styles.oldPrice}>Rp 250.000</Text>
//           <Text style={styles.regularText2}>Ditawar Rp 200.000</Text>
//         </View>
//       </View>
//     </View>
//   );
// };

// const RenderTerimaBsView = () => {
//   const sheetRef = useRef(null);

//   const handleClose = useCallback(index => {
//     sheetRef.current?.snapToIndex(index);
//   }, []);

//   return (
//     <BottomSheetView style={styles.bsContainer}>
//       <View>
//         <Text style={styles.regularText}>
//           Yeay kamu berhasil mendapat harga yang sesuai
//         </Text>
//         <Text
//           style={[
//             styles.regularSubText,
//             { fontSize: ms(14), lineHeight: ms(20), marginTop: ms(8) },
//           ]}>
//           Segera hubungi pembeli melalui whatsapp untuk transaksi selanjutnya
//         </Text>
//       </View>
//       <ProductMatchCard />

//       <TouchableOpacity style={styles.button} onPress={() => handleClose(-1)}>
//         <Text style={styles.txtButton}>Hubungi via Whatsapp</Text>
//         <Image
//           style={{
//             width: ms(13.33),
//             height: ms(13.33),
//             tintColor: COLORS.neutral1,
//           }}
//           source={Icons.Whatsapp}
//         />
//       </TouchableOpacity>
//     </BottomSheetView>
//   );
// };

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

const RenderStatusBsView = () => {
  const [selectStatus, setSelectStatus] = useState(false);
  const sheetRef = useRef(null);

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
        onPress={() => handleClose(-1)}>
        <Text style={styles.txtButton}>Kirim</Text>
      </TouchableOpacity>
    </BottomSheetView>
  );
};

const InfoPenawarScreen = () => {
  const navigation = useNavigation();
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
          <Image
            style={styles.imageUser}
            source={require('../../assets/images/image_user_temporary.png')}
          />
          <View style={{ marginLeft: ms(16) }}>
            <Text style={styles.regularText}>Nama Pembeli</Text>
            <Text style={styles.regularSubText}>Kota</Text>
          </View>
        </View>

        <Text style={[styles.regularText, { marginVertical: ms(8) }]}>
          Daftar Produkmu yang Ditawar
        </Text>

        {/* <View style={styles.produkCardContainer}>
          <ProdukYangDitawarCard />
        </View> */}

        {/* <View style={styles.produkCardContainer}>
          <ProdukYangDitawarCard />

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.buttonLeft}>
              <Text style={[styles.txtButton, { color: COLORS.black }]}>
                Tolak
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonRight}
              onPress={() => handleSnapPress(0)}>
              <Text style={styles.txtButton}>Terima</Text>
            </TouchableOpacity>
          </View>
        </View> */}

        <View style={styles.produkCardContainer}>
          <ProdukYangDitawarCard />

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
        </View>
      </SafeAreaView>

      {/* {isOpen ? (
        <BottomSheet
          ref={sheetRef}
          snapPoints={snapPoints}
          handleIndicatorStyle={styles.handleIndicatorStyle}
          enablePanDownToClose={true}
          backdropComponent={renderBackdrop}
          onChange={handleSheetChanges}
          onClose={() => setIsOpen(false)}>
          <RenderTerimaBsView />
        </BottomSheet>
      ) : null} */}

      {isOpen ? (
        <BottomSheet
          ref={sheetRef}
          snapPoints={snapPoints}
          handleIndicatorStyle={styles.handleIndicatorStyle}
          enablePanDownToClose={true}
          backdropComponent={renderBackdrop}
          onChange={handleSheetChanges}
          onClose={() => setIsOpen(false)}>
          <RenderStatusBsView />
        </BottomSheet>
      ) : null}
    </GestureHandlerRootView>
  );
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
  },
  statusContainer: { flexDirection: 'row', marginTop: ms(24) },
});
