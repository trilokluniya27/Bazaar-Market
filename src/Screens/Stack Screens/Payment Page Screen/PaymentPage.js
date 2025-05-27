import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import { RadioButton } from 'react-native-paper'; // Import from react-native-paper for RadioButton

const PaymentPage = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('Cash On Delivery');

  const paymentMethods = [
    
    { name: 'PhonePe', icon: require('../../../Images/S3.jpg') },
  
    { name: 'Cash On Delivery', icon: null }
  ];

  const renderPaymentItem = ({ item }) => (
    <TouchableOpacity
      style={styles.paymentCard}
      onPress={() => setSelectedPaymentMethod(item.name)}
    >
      <View style={styles.paymentCardContent}>
        <RadioButton
          value={item.name}
          status={selectedPaymentMethod === item.name ? 'checked' : 'unchecked'}
          onPress={() => setSelectedPaymentMethod(item.name)}
          color="#4CAF50"
        />
        {item.icon && <Image source={item.icon} style={styles.icon} />}
        <Text style={styles.paymentText}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Select Payment Method</Text>

      <FlatList
        data={paymentMethods}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderPaymentItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />

      {selectedPaymentMethod === 'Cash On Delivery' && (
        <View style={styles.cashOnDelivery}>
          <Text style={styles.cashOnDeliveryText}>Cash On Delivery</Text>
          <Text style={styles.tipText}>
            Tip: For a safer and contactless experience, we recommend using an online payment method.
          </Text>
        </View>
      )}

      <TouchableOpacity style={styles.placeOrderButton}>
        <Text style={styles.placeOrderText}>Place Order</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#4CAF50',
  },
  paymentCard: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  paymentCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentText: {
    fontSize: 16,
    marginLeft: 12,
    fontWeight: '600',
    color: '#333',
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 8,
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 12,
  },
  cashOnDelivery: {
    marginTop: 30,
    backgroundColor: '#fff4e5',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#f0c14b',
  },
  cashOnDeliveryText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#f39c12',
  },
  tipText: {
    fontSize: 14,
    color: '#555',
  },
  placeOrderButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 40,
  },
  placeOrderText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PaymentPage;
