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
      product_price: 'Rp 250.000',
      bid_price: 'Rp 200.000',
      status: 'bid',
      transaction_date: '19 Apr, 12:00',
      image_url:
        'https://www.utileincasa.it/wp-content/uploads/2021/10/6oM-lgd-olia-nayda-dB3pkARCxHI-unsplash-scaled-e1629735546986.jpg',
    },
    {
      id: 2,
      name: 'Jam Tangan Casio',
      product_price: 'Rp 250.000',
      bid_price: '',
      status: 'terbit',
      transaction_date: '19 Apr, 12:00',
      image_url:
        'https://www.utileincasa.it/wp-content/uploads/2021/10/6oM-lgd-olia-nayda-dB3pkARCxHI-unsplash-scaled-e1629735546986.jpg',
    },
    {
      id: 3,
      name: 'Jam Tangan Casio',
      product_price: 'Rp 250.000',
      bid_price: 'Rp 200.000',
      status: 'accepted',
      transaction_date: '19 Apr, 12:00',
      image_url:
        'https://www.utileincasa.it/wp-content/uploads/2021/10/6oM-lgd-olia-nayda-dB3pkARCxHI-unsplash-scaled-e1629735546986.jpg',
    },
    {
      id: 4,
      name: 'Jam Tangan Casio',
      product_price: 'Rp 250.000',
      bid_price: 'Rp 200.000',
      status: 'declined',
      transaction_date: '19 Apr, 12:00',
      image_url:
        'https://www.utileincasa.it/wp-content/uploads/2021/10/6oM-lgd-olia-nayda-dB3pkARCxHI-unsplash-scaled-e1629735546986.jpg',
    },
  ];

  const NotifCard = ({
    name,
    product_price,
    bid_price,
    status,
    transaction_date,
    image_url,
  }) => {
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
              <Text style={styles.regularSubText}>
                {' '}
                {status === 'terbit'
                  ? 'Berhasil diterbitkan'
                  : 'Penawaran produk'}
              </Text>
              <View style={styles.timestampContainer}>
                <Text style={styles.regularSubText}>{transaction_date}</Text>
                <View style={styles.circle}></View>
              </View>
            </View>
            <Text style={styles.regularText2}>{name}</Text>
            <Text
              style={[
                styles.regularText2,
                {
                  textDecorationLine:
                    status === 'accepted' ? 'line-through' : null,
                },
              ]}>
              {product_price}
            </Text>
            {status === 'bid' ? (
              <Text style={styles.regularText2}>Ditawar {bid_price}</Text>
            ) : status === 'accepted' ? (
              <Text style={styles.regularText2}>
                Berhasil ditawar {bid_price}
              </Text>
            ) : status === 'declined' ? (
              <Text style={styles.regularText2}>Gagal ditawar {bid_price}</Text>
            ) : null}
          </View>
        </View>
        {status === 'accepted' ? (
          <Text style={styles.bottomSubText}>
            Kamu akan segera dihubungi penjual via whatsapp
          </Text>
        ) : status === 'declined' ? (
          <Text style={styles.bottomSubText}>
            Penawaran ditolak oleh penjual
          </Text>
        ) : null}
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
              product_price={item.product_price}
              image_url={item.image_url}
              bid_price={item.bid_price}
              transaction_date={item.transaction_date}
              status={item.status}
            />
          )}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          style={styles.flatlistStyle}
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
  },
  cardContainer: {
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
    marginTop: ms(4),
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
    left: ms(206),
    position: 'absolute',
  },
  circle: {
    width: ms(8),
    height: ms(8),
    borderRadius: ms(180) / ms(2),
    backgroundColor: COLORS.alertDanger,
    alignSelf: 'center',
    marginLeft: ms(8),
  },
  bottomSubText: {
    fontSize: ms(10),
    color: COLORS.neutral3,
    lineHeight: ms(14),
    fontFamily: 'Poppins-Regular',
    marginLeft: ms(64),
    marginTop: ms(4),
  },
  flatlistStyle: {
    marginBottom: ms(16),
  },
});
