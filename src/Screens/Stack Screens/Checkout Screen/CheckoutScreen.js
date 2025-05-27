import React, { useContext, useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Alert, SafeAreaView } from 'react-native';
import { CartContext } from '../../Custom Component Screens/CartContext';
import axios from 'axios';

import DeliveryAddress from './Checkout Screen Components/DeliveryAddress';
import PaymentMethodSection from './Checkout Screen Components/PaymentMethodSection';
import DeliveryInfo from './Checkout Screen Components/DeliveryInfo';
import BillingSummary from './Checkout Screen Components/BillingSummary';
import PlaceOrderButton from './Checkout Screen Components/PlaceOrderButton';

const CheckoutScreen = ({ navigation, route }) => {
  const { cart, address, setAddress, clearCart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const [invoiceNo, setInvoiceNo] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState('COD');

  const incomingAddress = route.params?.selectedAddress;
  const coupon = route.params?.coupon || '';
  const isGift = route.params?.isGift || false;

  const totalAmount = cart.reduce(
    (acc, item) => acc + (item.price || 0) * (item.quantity || 1),
    0,
  );
  const originalTotal = cart.reduce(
    (acc, item) =>
      acc + (item.original_price || item.price) * (item.quantity || 1),
    0,
  );
  const totalSavings = originalTotal - totalAmount;
  const totalQty = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);
  const totalPrice = cart.reduce((acc, item) => acc + (item.price || 0), 0);
  const totalDiscount = cart.reduce((acc, item) => acc + (item.discount || 0), 0);

  const deliveryCharge = totalAmount > 499 ? 0 : 40;
  const couponDiscount = coupon ? 30 : 0;
  const discount = selectedPayment === 'COD' ? 0 : couponDiscount;
  const payableAmount = totalAmount + deliveryCharge - discount;
  const paymentStatus = selectedPayment === 'COD' ? 'Pending' : 'paid';

  const deliveryDate = new Date(
    Date.now() + 3 * 24 * 60 * 60 * 1000,
  ).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });

  useEffect(() => {
    if (incomingAddress) setAddress(incomingAddress);
  }, [incomingAddress]);

  useEffect(() => {
    if (route.params?.selectedPayment) {
      setSelectedPayment(route.params.selectedPayment);
    }
  }, [route.params?.selectedPayment]);

  const placeOrder = async () => {
    setLoading(true);
    if (!address?.details || cart.length === 0) {
      Alert.alert(
        'Error',
        'Please enter an address and add items to the cart before placing an order.',
      );
      setLoading(false);
      return;
    }

    const generatedInvoiceNo = Math.floor(1000 + Math.random() * 9000);
    const usedIds = new Set();
    const generateUniqueId = () => {
      let id;
      do {
        id = Math.floor(1000 + Math.random() * 9000);
      } while (usedIds.has(id));
      usedIds.add(id);
      return id;
    };

    const orderData = {
      invoice_no: generatedInvoiceNo,
      app_id: 193,
      store_id: cart[0]?.store_id || 1,
      user_id: 101,
      company_id: 162,
      address: address?.details || 'N/A',
      qty: totalQty,
      price: totalPrice,
      discount: totalDiscount,
      net_amount: totalAmount,
      amount: payableAmount,
      delivery_charge: deliveryCharge,
      invoice_date: new Date().toISOString(),
      order_date: new Date().toISOString(),
      status: 'Open',
      Shipping_Address: address?.details || 'N/A',
      city: 'Dewas',
      mobile_no: address?.phone || '8224054220',
      customer_name: address?.name || 'Trilok Luniya',
      email: 'trilokluniya@gmail.com',
      payment_method: selectedPayment,
      delivery_status: 'Pending',
      payment_status: paymentStatus,
      source: 'Smart POS',
    };

    try {
      const headerResponse = await axios.post(
        'https://ddottt6z7ccpe0a-apexdb.adb.me-jeddah-1.oraclecloudapps.com/ords/otrix/oc_pos_order_headers/',
        orderData,
      );

      const headerId =
        headerResponse.data?.id || headerResponse.data?.rows?.[0]?.id;
      if (!headerId) throw new Error('Header ID not returned.');
      console.log('🆔 Header ID:', headerId);

      const items = cart.map(item => {
        const uniqueId = generateUniqueId();
        return {
          store_id: item.store_id,
          invoice_header_id: headerId,
          item_type_id: item.item_type_id || 1,
          item_id: item.item_id || uniqueId,
          store_item_id: item.store_item_id || null,
          item_category: item.item_category || 'General',
          item_code: item.item_code || `AUTO_${uniqueId}`,
          item_name: item.item_name || 'Product',
          remarks: 'From app',
          barcode: item.barcode,
          cost: item.cost || 1,
          qty: item.quantity || 1,
          price: item.price || 1,
          amount: item.amount || (item.quantity || 1) * (item.price || 1),
          discount: item.discount || 0,
          tax_amount: 0,
          net_amount: (item.quantity || 1) * (item.price || 1),
          available_qty: item.available_qty || 0,
          balance_qty: item.balance_qty || 0,
          status: item.status || 'Confirmed',
          payment_method: selectedPayment,
          delivery_status: 'open',
          payment_status: paymentStatus,
          primary_flag: 'Y',
          company_id: 162,
          app_id: 193,
        };
      });

      for (const item of items) {
        await axios.post(
          'https://ddottt6z7ccpe0a-apexdb.adb.me-jeddah-1.oraclecloudapps.com/ords/otrix/oc_pos_order_lines/',
          item,
        );
      }

      setInvoiceNo(generatedInvoiceNo);
      setLoading(false);
      clearCart();
      navigation.navigate('OrderSuccessScreen', {
        invoiceNo: generatedInvoiceNo,
        totalAmount,
        deliveryCharge,
        deliveryDate,
        cartItems: cart,
        isGift,
        coupon,
      });

      const formattedOrder = {
        invoiceNo: generatedInvoiceNo,
        status: 'pending',
        amount: payableAmount,
        items: cart.map(item => ({
          item_name: item.item_name,
          quantity: item.quantity || 1,
          price: item.price,
        })),
      };

      navigation.navigate('MyOrdersScreen', {
        orders: [formattedOrder],
      });
    } catch (error) {
      console.error('❌ Order failed:', error);
      Alert.alert('Error', 'Order could not be placed.');
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <DeliveryAddress address={address} navigation={navigation} />
        <PaymentMethodSection
          selectedPayment={selectedPayment}
          setSelectedPayment={setSelectedPayment}
          totalAmount={totalAmount}
          discount={discount}
          deliveryCharge={deliveryCharge}
        />
        <DeliveryInfo cart={cart} deliveryDate={deliveryDate} />
        <BillingSummary
          originalTotal={originalTotal}
          totalSavings={totalSavings}
          deliveryCharge={deliveryCharge}
          payableAmount={payableAmount}
          couponDiscount={couponDiscount}
        />
      </ScrollView>

      <View style={styles.footer}>
        <PlaceOrderButton loading={loading} onPress={placeOrder} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingBottom: 120, // So content doesn't hide under button
    padding: 20,
  },
  footer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    paddingBottom: 10,
  },
});

export default CheckoutScreen;
