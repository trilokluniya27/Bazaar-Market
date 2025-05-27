// PaymentPage.js

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const PaymentPage = ({ route, navigation }) => {
  const { totalAmount } = route.params;  // Get totalAmount passed from CheckoutScreen
  const [selectedPayment, setSelectedPayment] = useState('Cash on Delivery');

  const handlePayment = () => {
    // Here you can handle the payment logic
    navigation.navigate('CheckoutScreen', { selectedPayment });  // Pass selectedPayment back to CheckoutScreen
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>Choose Payment Method</Text>

        <View style={styles.paymentOptionsContainer}>
          <TouchableOpacity onPress={() => setSelectedPayment('Cash on Delivery')} style={styles.paymentOption}>
            <Text style={selectedPayment === 'Cash on Delivery' ? styles.selectedOptionText : styles.paymentOptionText}>
              Cash on Delivery
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelectedPayment('Credit Card')} style={styles.paymentOption}>
            <Text style={selectedPayment === 'Credit Card' ? styles.selectedOptionText : styles.paymentOptionText}>
              Credit Card
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelectedPayment('UPI')} style={styles.paymentOption}>
            <Text style={selectedPayment === 'UPI' ? styles.selectedOptionText : styles.paymentOptionText}>
              UPI
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.paymentButton} onPress={handlePayment}>
          <Text style={styles.paymentButtonText}>Pay Now ₹{totalAmount}</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 40,
  },
  scrollContainer: {
    paddingBottom: 80,
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  paymentOptionsContainer: {
    marginBottom: 30,
  },
  paymentOption: {
    backgroundColor: '#00b894',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    opacity: 0.9,
  },
  selectedOptionText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  paymentOptionText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  paymentButton: {
    backgroundColor: '#ff6347',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  paymentButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PaymentPage;
