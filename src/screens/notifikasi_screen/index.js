import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import React, { useEffect } from 'react';
import { COLORS } from '../../assets/colors';
import { ms } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import { getAllNotification } from '../../data/slices/notificationSlice';
import NumberFormat from 'react-number-format';

const { width } = Dimensions.get('screen');

const NotifikasiScreen = () => {
  const dispatch = useDispatch();
  const { access_token } = useSelector(state => state.user);
  const { allNotif } = useSelector(state => state.notification);
  const { isLoading } = useSelector(state => state.global);

  useEffect(() => {
    dispatch(getAllNotification(access_token));
  }, [access_token, dispatch]);

  const dateConvert = date => {
    if (!date) {
      return '-';
    }
    const theDate = date.split('T')[0].split('-');
    return `${theDate[2]}-${theDate[1]}-${theDate[0]}`;
  };

  const NotifCard = ({
    name,
    product_price,
    bid_price,
    status,
    transaction_date,
    image_url,
    read,
  }) => {
    return (
      <TouchableOpacity style={styles.cardContainer}>
        <View style={styles.row}>
          {image_url === null || image_url === '' ? (
            <Image
              source={require('../../assets/images/img_no_image.png')}
              style={styles.imageProduct}
            />
          ) : (
            <Image source={{ uri: image_url }} style={styles.imageProduct} />
          )}
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
                <View style={styles.circle(read)} />
              </View>
            </View>
            <Text style={styles.regularText2}>{name}</Text>
            <NumberFormat
              value={product_price}
              displayType={'text'}
              thousandSeparator={true}
              prefix={'Rp'}
              renderText={value => (
                <Text
                  style={[
                    styles.regularText2,
                    {
                      textDecorationLine:
                        status === 'accepted' ? 'line-through' : null,
                    },
                  ]}>
                  {value}
                </Text>
              )}
            />
            {status === 'bid' ? (
              <NumberFormat
                value={bid_price}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'Rp'}
                renderText={value => (
                  <Text style={styles.regularText2}>Ditawar {value}</Text>
                )}
              />
            ) : status === 'accepted' ? (
              <NumberFormat
                value={bid_price}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'Rp'}
                renderText={value => (
                  <Text style={styles.regularText2}>
                    Berhasil ditawar {value}
                  </Text>
                )}
              />
            ) : status === 'declined' ? (
              <NumberFormat
                value={bid_price}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'Rp'}
                renderText={value => (
                  <Text style={styles.regularText2}>Gagal ditawar {value}</Text>
                )}
              />
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
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator color={COLORS.primaryPurple4} size="large" />
          </View>
        ) : allNotif.length === 0 ? (
          <View style={styles.dumpText}>
            <Text>Tidak ada notifikasi</Text>
          </View>
        ) : (
          <FlatList
            data={allNotif}
            key={1}
            renderItem={({ item }) => (
              <NotifCard
                name={item.product_name}
                product_price={item.base_price}
                image_url={item.image_url}
                bid_price={item.bid_price}
                transaction_date={dateConvert(item.transaction_date)}
                status={item.status}
                read={item.read}
              />
            )}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            style={styles.flatlistStyle}
          />
        )}
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
    flexDirection: 'row',
    width: ms(width - 120),
    justifyContent: 'space-between',
  },
  timestampContainer: {
    flexDirection: 'row',
  },
  circle: status => ({
    width: ms(8),
    height: ms(8),
    borderRadius: ms(180) / ms(2),
    backgroundColor: status ? 'grey' : COLORS.alertDanger,
    alignSelf: 'center',
    marginLeft: ms(8),
  }),
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
  dumpText: {
    marginTop: ms(50),
    color: COLORS.primaryPurple4,
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: ms(24),
  },
  loadingContainer: {
    marginTop: ms(50),
  },
});
