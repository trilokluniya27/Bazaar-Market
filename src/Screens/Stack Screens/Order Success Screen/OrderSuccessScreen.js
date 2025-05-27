import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, useRoute} from '@react-navigation/native';

import {Linking, Alert} from 'react-native';

const OrderSuccessScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const {
    invoiceNo,
    totalAmount,
    deliveryCharge,
    deliveryDate,
    cartItems,
    isGift,
    coupon,
  } = route.params;

  const grandTotal = totalAmount + deliveryCharge - (coupon ? 30 : 0);

  // ✅ Full order object for cancel/reorder support
const fullOrder = {
  id: Math.floor(Math.random() * 90000) + 10000,
  invoiceNo,
  store_id: cartItems[0]?.store_id || 1,
  qty: cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0),
  price: totalAmount || 0,
  amount: grandTotal || 0,
  company_id: 162,
  app_id: 193,
  invoice_date: new Date().toISOString(),
  status: 'pending',
  delivery_status: 'Pending',
  payment_status: 'Pending',
  discount: coupon ? 30 : 0,
  tax_amount: 0,
  net_amount: totalAmount || 0,
  primary_flag: 'Y',
  items: cartItems,
};


  const saveOrderToStorage = async () => {
    try {
      const existing = await AsyncStorage.getItem('orderHistory');
      const parsed = existing ? JSON.parse(existing) : [];
      const updated = [fullOrder, ...parsed];
      await AsyncStorage.setItem('orderHistory', JSON.stringify(updated));
    } catch (e) {
      console.error('❌ Failed to save order:', e);
    }
  };

 const handleMyOrders = async () => {
  try {
    const existing = await AsyncStorage.getItem('orderHistory');
    const parsed = existing ? JSON.parse(existing) : [];
    const updated = [fullOrder, ...parsed];
    await AsyncStorage.setItem('orderHistory', JSON.stringify(updated));

    // ✅ Navigate using nested tab navigator syntax
    navigation.navigate('BottomScreen', {
      screen: 'My Order',
    });
  } catch (e) {
    console.error('❌ Failed to save or navigate:', e);
  }
};


  const renderItem = ({item}) => (
    <View style={styles.itemRow}>
      <Text style={styles.itemName}>
        {item.item_name} x{item.quantity}
      </Text>
      <Text style={styles.itemPrice}>₹{item.price}</Text>
    </View>
  );



const sendOrderToWhatsApp = (order) => {
  // ✅ Clean and prefix with +91 (India)
  const raw = order.mobile_no || '8224054220';
  const cleanNumber = raw.replace(/[^0-9]/g, ''); // Remove +, -, space, etc.
  const phone = `91${cleanNumber.slice(-10)}`; // Ensure only last 10 digits

  const itemsText = order.items
    .map((item) => `• ${item.item_name} x${item.quantity} - ₹${item.price}`)
    .join('\n');

  const message = `🧾 *Order Summary*
Invoice: ${order.invoiceNo}
Status: ${order.status?.toUpperCase()}
Total: ₹${order.amount}

📦 Items:
${itemsText}

🏠 Address: ${order.address}
📱 Mobile: ${order.mobile_no}
`;

  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  Linking.openURL(url).catch(() => {
    Alert.alert('❌ WhatsApp Error', 'WhatsApp not installed or number invalid.');
  });
};

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <LottieView
        source={require('../../../Images/success.png')}
        autoPlay
        loop={false}
        style={styles.lottie}
      />

      <Text style={styles.title}>Order Placed Successfully!</Text>
      <Text style={styles.invoice}>Invoice #: {invoiceNo}</Text>

      <View style={styles.card}>
        <FlatList
          data={cartItems}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />

        <View style={styles.divider} />
        <Text style={styles.summaryText}>Item Total: ₹{totalAmount}</Text>
        <Text style={styles.summaryText}>
          Delivery Charge: ₹{deliveryCharge}
        </Text>
        {coupon ? (
          <Text style={styles.summaryText}>Coupon Discount: ₹30</Text>
        ) : null}
        <Text style={styles.grandTotal}>Grand Total: ₹{grandTotal}</Text>
        <Text style={styles.deliveryNote}>Delivery by: {deliveryDate}</Text>
        {isGift ? (
          <Text style={styles.giftText}>🎁 This is a gift order</Text>
        ) : null}
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('OrderTrackScreen')}>
          <Icon name="local-shipping" size={20} color="#fff" />
          <Text style={styles.buttonText}>Track Order</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleMyOrders}>
          <Icon name="list-alt" size={20} color="#fff" />
          <Text style={styles.buttonText}>My Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.whatsapp}
          onPress={() => sendOrderToWhatsApp(fullOrder)} // ✅ Send to customer
        >
          <Icon name="whatsapp" color="#fff" size={18} />
          <Text style={styles.buttonText}>Send to WhatsApp</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate('InvoiceScreen', {
              invoiceNo,
              items: cartItems,
              totalAmount,
              deliveryCharge,
              coupon,
              grandTotal,
            })
          }>
          <Icon name="receipt" size={20} color="#fff" />
          <Text style={styles.buttonText}>Invoice</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F1F8FF',
    alignItems: 'center',
  },
  lottie: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginBottom: -10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 5,
  },
  invoice: {
    fontSize: 16,
    marginBottom: 15,
    color: '#555',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    width: '100%',
    marginBottom: 20,
    elevation: 3,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  itemName: {
    fontSize: 15,
    color: '#333',
  },
  itemPrice: {
    fontSize: 15,
    color: '#333',
  },
  summaryText: {
    fontSize: 14,
    marginVertical: 2,
    color: '#555',
  },
  grandTotal: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 10,
    color: '#000',
  },
  deliveryNote: {
    marginTop: 5,
    color: '#777',
  },
  giftText: {
    marginTop: 8,
    color: '#D81B60',
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 8,
  },
  buttonRow: {
    width: '100%',
    gap: 12,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#1976D2',
    padding: 14,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  whatsapp: {
    flexDirection: 'row',
    backgroundColor: '#25D366',
    padding: 14,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    gap: 8,
  },
});

export default OrderSuccessScreen;
