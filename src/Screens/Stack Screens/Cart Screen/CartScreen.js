import React, { useContext, useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Animated,
  ActivityIndicator,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { CartContext } from '../../Custom Component Screens/CartContext';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartScreen = ({ navigation }) => {
  const {
    cart,
    incrementItemQuantity,
    decrementItemQuantity,
    removeFromCart,
    totalAmount,
  } = useContext(CartContext);

  const [coupon, setCoupon] = useState('');
  const [loading, setLoading] = useState(false);
  const [isGift, setIsGift] = useState(false);
  const [addressModalVisible, setAddressModalVisible] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [details, setDetails] = useState('');

  const deliveryCharge = totalAmount > 499 ? 0 : 40;
  const couponDiscount = coupon ? 30 : 0;
  const totalPayable = totalAmount + deliveryCharge - couponDiscount;

  useEffect(() => {
    AsyncStorage.getItem('user_address').then(addr => {
      if (addr) {
        const parsed = JSON.parse(addr);
        setDeliveryAddress(parsed);
      }
    });
  }, []);

  const openAddressModal = () => {
    if (deliveryAddress) {
      setName(deliveryAddress.name);
      setPhone(deliveryAddress.phone);
      setDetails(deliveryAddress.details);
    }
    setAddressModalVisible(true);
  };

  const saveAddress = async () => {
    if (!name || !phone || !details) {
      Alert.alert('Error', 'All address fields are required.');
      return;
    }
    const fullAddress = { name, phone, details };
    setDeliveryAddress(fullAddress);
    await AsyncStorage.setItem('user_address', JSON.stringify(fullAddress));
    setAddressModalVisible(false);
  };

  const handleCheckout = () => {
    if (!deliveryAddress || !deliveryAddress.details) {
      Alert.alert('Address Required', 'Please add a delivery address before checkout.');
      return;
    }

    navigation.navigate('CheckoutScreens', {
      coupon,
      isGift,
      selectedAddress: deliveryAddress,
    });
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemCard}>
      <Image
        source={
          item.image_path
            ? { uri: item.image_path }
            : require('../../../Images/Noimages.jpeg')
        }
        style={styles.itemImage}
      />
      <View style={{ flex: 1, marginLeft: 12 }}>
        <Text style={styles.itemName}>{item.item_name}</Text>
        <Text style={styles.itemPrice}>
          ₹{item.price} × {item.quantity} = ₹{item.price * item.quantity}
        </Text>
        <View style={styles.qtyRow}>
          <TouchableOpacity
            onPress={() => decrementItemQuantity(item)}
            style={styles.qtyButton}>
            <Text style={styles.qtyText}>−</Text>
          </TouchableOpacity>
          <Text style={styles.qtyCount}>{item.quantity}</Text>
          <TouchableOpacity
            onPress={() => incrementItemQuantity(item)}
            style={styles.qtyButton}>
            <Text style={styles.qtyText}>＋</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0070b7" style={styles.loader} />
      ) : (
        <>
          {cart.length > 0 && (
            <TouchableOpacity style={styles.addressContainer} onPress={openAddressModal}>
              <Icon name="location-on" size={22} color="#0070b7" />
              <View style={{ flex: 1 }}>
                {deliveryAddress ? (
                  <>
                    <Text style={styles.addressText}>{deliveryAddress.details}</Text>
                    <Text style={styles.addressSub}>{deliveryAddress.name} • {deliveryAddress.phone}</Text>
                  </>
                ) : (
                  <Text style={styles.addressText}>No Address Selected</Text>
                )}
                <Text style={styles.changeAddress}>Change or Add Address</Text>
              </View>
              <Icon name="keyboard-arrow-right" size={20} color="#888" />
            </TouchableOpacity>
          )}

          {cart.length > 0 && (
            <View style={styles.couponBoxTop}>
              <Icon name="local-offer" size={20} color="#0070b7" />
              <TextInput
                value={coupon}
                onChangeText={setCoupon}
                placeholder="Apply Promo Code"
                placeholderTextColor="#888"
                style={styles.couponInput}
              />
              <TouchableOpacity style={styles.applyButton} onPress={() => { setLoading(true); setTimeout(() => { setLoading(false); Alert.alert('Coupon Applied', coupon || 'No code'); }, 2000); }}>
                <Text style={styles.applyText}>Apply</Text>
              </TouchableOpacity>
            </View>
          )}

          {cart.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Image
                source={require('../../../Images/empty-cart.png')}
                
                style={{resizeMode:'contain' }}
              />
              <Text style={styles.emptyText}>Your cart is empty</Text>
            </View>
          ) : (
            <>
              <FlatList
                data={cart}
                renderItem={renderItem}
                keyExtractor={item => item.item_id.toString()}
                contentContainerStyle={{ paddingBottom: 300 }}
                showsVerticalScrollIndicator={false}
              />

              <View style={styles.billingCard}>
                <Text style={styles.billingTitle}>Billing Details</Text>
                <View style={styles.billingRow}>
                  <Text style={styles.billingLabel}>Total Products Price</Text>
                  <Text style={styles.billingValue}>₹{totalAmount}</Text>
                </View>
                <View style={styles.billingRow}>
                  <Text style={styles.billingLabel}>Delivery Charges</Text>
                  <Text style={styles.billingValue}>
                    ₹{deliveryCharge === 0 ? '0 (Free)' : deliveryCharge}
                  </Text>
                </View>
                {coupon ? (
                  <View style={styles.billingRow}>
                    <Text style={styles.billingLabel}>Coupon Discount</Text>
                    <Text style={[styles.billingValue, { color: 'green' }]}>- ₹{couponDiscount}</Text>
                  </View>
                ) : null}
                <View style={styles.billingRow}>
                  <Text style={styles.billingTotal}>Order Total</Text>
                  <Text style={styles.billingTotal}>₹{totalPayable}</Text>
                </View>
              </View>

              <View style={styles.floatingCheckout}>
                <TouchableOpacity onPress={handleCheckout} style={styles.checkoutButton}>
                  <Text style={styles.checkoutText}>Checkout ({cart.length} items)</Text>
                  <Icon name="arrow-forward" size={20} color="#fff" />
                </TouchableOpacity>
              </View>
            </>
          )}

          <Modal
            animationType="slide"
            transparent={true}
            visible={addressModalVisible}
            onRequestClose={() => setAddressModalVisible(false)}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 10 }}>Edit Delivery Address</Text>
                <TextInput
                  placeholder="Full Address"
                  value={details}
                  onChangeText={setDetails}
                  style={styles.addressInput}
                />
                <TextInput
                  placeholder="Name"
                  value={name}
                  onChangeText={setName}
                  style={styles.addressInput}
                />
                <TextInput
                  placeholder="Phone"
                  value={phone}
                  keyboardType="phone-pad"
                  onChangeText={setPhone}
                  style={styles.addressInput}
                />
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                  <TouchableOpacity onPress={() => setAddressModalVisible(false)} style={styles.modalButton}>
                    <Text style={{ color: 'red' }}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={saveAddress} style={styles.modalButton}>
                    <Text style={{ color: 'green' }}>Save</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  itemCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginVertical: 6,
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  itemImage: {
    width: 65,
    height: 65,
    borderRadius: 2,
    backgroundColor: '#eee',
  },
  itemName: { fontWeight: '600', fontSize: 15, color: '#333' },
  itemPrice: { fontSize: 13, marginTop: 4, color: '#555' },
  qtyRow: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  qtyButton: {
    width: 32,
    height: 32,
    backgroundColor:'#0070b7',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  qtyText: { fontSize: 18, color: '#fff', fontWeight: 'bold' },
  qtyCount: { marginHorizontal: 12, fontSize: 15, fontWeight: 'bold', color: '#333' },
  couponBoxTop: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    gap: 8,
  },
  couponInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    color: '#333',
  },
  applyButton: {
    backgroundColor: '#0070b7',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 6,
  },
  applyText: { color: '#fff', fontWeight: 'bold' },
  billingCard: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    padding: 16,
  },
  billingTitle: { fontSize: 16, fontWeight: 'bold', color: '#444', marginBottom: 10 },
  billingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  billingLabel: { fontSize: 14, color: '#666' },
  billingValue: { fontSize: 14, color: '#333', fontWeight: '600' },
  billingTotal: { fontSize: 16, fontWeight: 'bold', color: '#000' },
  floatingCheckout: { paddingBottom: 10 },
  checkoutButton: {
    backgroundColor: '#0070b7',
    paddingVertical: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  checkoutText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 18, color: '#aaa', marginTop: 20 },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
    gap: 10,
  },
  addressText: { fontSize: 14, fontWeight: 'bold', color: '#333' },
  addressSub: { fontSize: 13, color: '#666' },
  changeAddress: { fontSize: 12, color: '#0070b7' },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  addressInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    color: '#000',
  },
  modalButton: {
    marginHorizontal: 10,
  },
});

export default CartScreen;