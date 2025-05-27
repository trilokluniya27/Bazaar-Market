import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';

const PaymentMethodSection = ({ selectedPayment, setSelectedPayment, totalAmount, discount , deliveryCharge}) => {
 const options = [
  { label: 'Cash On Delivery', value: 'COD', price: totalAmount },
  { label: 'Online', value: 'ONLINE', price: totalAmount - discount },
  
];


  return (
    <Animatable.View animation="fadeInUp" delay={200} duration={700} style={styles.card}>
      <View style={styles.cardHeader}>
        <Icon name="credit-card-outline" size={20} color="#0070b7" />
        <Text style={styles.cardTitle}>Select Payment Method</Text>
      </View>
      {options.map((option, i) => (
        <TouchableOpacity
          key={i}
          style={[styles.paymentOption, selectedPayment === option.value && styles.paymentSelected]}
          onPress={() => setSelectedPayment(option.value)}
        >
          <Text style={styles.paymentLabel}>{option.label}</Text>
          <Text style={styles.paymentAmount}>₹{option.price.toFixed(2)}</Text>
          <Icon
            name={selectedPayment === option.value ? 'check-circle' : 'checkbox-blank-circle-outline'}
            size={22}
            color={selectedPayment === option.value ? 'red' : '#ccc'}
          />
        </TouchableOpacity>
      ))}
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    elevation: 3,
    marginBottom: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#333',
  },
  paymentOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  paymentSelected: {
    backgroundColor: '#fce4ec',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  paymentLabel: {
    fontSize: 16,
    color: '#333',
  },
  paymentAmount: {
    fontSize: 15,
    color: '#888',
  },
});

export default PaymentMethodSection;
