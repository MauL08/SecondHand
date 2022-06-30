import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { COLORS } from '../../assets/colors';
import { ms } from 'react-native-size-matters';

const NotifikasiScreen = () => {
  const dataNotifikasi = [
    {
      id: 1,
      name: 'Jam Tangan Casio',
      price: 'Rp 250.000',
      ditawar: 'Rp 200.000',
      timestamp: '19 Apr, 12:00',
      image_url:
        'https://www.utileincasa.it/wp-content/uploads/2021/10/6oM-lgd-olia-nayda-dB3pkARCxHI-unsplash-scaled-e1629735546986.jpg',
    },
    {
      id: 2,
      name: 'Jam Tangan Casio',
      price: 'Rp 250.000',
      ditawar: 'Rp 200.000',
      timestamp: '19 Apr, 12:00',
      image_url:
        'https://www.utileincasa.it/wp-content/uploads/2021/10/6oM-lgd-olia-nayda-dB3pkARCxHI-unsplash-scaled-e1629735546986.jpg',
    },
    {
      id: 3,
      name: 'Jam Tangan Casio',
      price: 'Rp 250.000',
      ditawar: 'Rp 200.000',
      timestamp: '19 Apr, 12:00',
      image_url:
        'https://www.utileincasa.it/wp-content/uploads/2021/10/6oM-lgd-olia-nayda-dB3pkARCxHI-unsplash-scaled-e1629735546986.jpg',
    },
  ];

  const NotifCard = ({ name, price, ditawar, timestamp, image_url }) => {
    return (
      <TouchableOpacity style={styles.cardContainer}>
        <View style={styles.row}>
          <Image
            style={styles.imageProduct}
            source={{
              uri: image_url,
            }}
          />
          <View style={styles.textContainer}>
            <View style={styles.regularContainer}>
              <Text style={styles.regularSubText}>Penawaran produk</Text>
              <View style={styles.timestampContainer}>
                <Text style={styles.regularSubText}>{timestamp}</Text>
                <View style={styles.circle}></View>
              </View>
            </View>
            <Text style={styles.regularText2}>{name}</Text>
            <Text style={styles.regularText2}>{price}</Text>
            <Text style={styles.regularText2}>Ditawar {ditawar}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Notifikasi</Text>
      <View>
        <FlatList
          data={dataNotifikasi}
          key={1}
          renderItem={({ item }) => (
            <NotifCard
              name={item.name}
              price={item.price}
              image_url={item.image_url}
              ditawar={item.ditawar}
              timestamp={item.timestamp}
            />
          )}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default NotifikasiScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.neutral1,
    padding: ms(16),
  },
  screenTitle: {
    fontSize: ms(20),
    lineHeight: ms(30),
    fontFamily: 'Poppins-Bold',
    color: COLORS.black,
    marginBottom: ms(24),
  },
  imageProduct: {
    height: ms(48),
    width: ms(48),
    borderRadius: ms(12),
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.neutral01,
    paddingBottom: ms(16),
    marginBottom: ms(16),
  },
  regularText: {
    fontSize: ms(14),
    color: COLORS.neutral5,
    lineHeight: ms(20),
    fontFamily: 'Poppins-Medium',
  },
  regularSubText: {
    fontSize: ms(10),
    color: COLORS.neutral3,
    lineHeight: ms(14),
    fontFamily: 'Poppins-Regular',
  },
  regularText2: {
    fontSize: ms(14),
    color: COLORS.neutral4,
    lineHeight: ms(20),
    fontFamily: 'Poppins-Regular',
  },
  textContainer: {
    marginLeft: ms(16),
  },
  regularContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timestampContainer: {
    flexDirection: 'row',
    left: ms(108),
  },
  circle: {
    width: ms(8),
    height: ms(8),
    borderRadius: ms(180) / ms(2),
    backgroundColor: COLORS.alertDanger,
    alignSelf: 'center',
    marginLeft: ms(8),
  },
});
