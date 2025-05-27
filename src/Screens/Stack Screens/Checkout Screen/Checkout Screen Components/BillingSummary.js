import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';

const BillingSummary = ({ originalTotal, totalSavings, deliveryCharge, payableAmount }) => {
  return (
    <Animatable.View animation="fadeInUp" delay={400} duration={700} style={styles.card}>
      <Text style={styles.title}>Billing Summary</Text>
      <View style={styles.row}><Text>Item Total</Text><Text>₹{originalTotal.toFixed(2)}</Text></View>
      <View style={styles.row}><Text style={{ color: '#4CAF50' }}>You Saved</Text><Text style={{ color: '#4CAF50' }}>₹{totalSavings.toFixed(2)}</Text></View>
      <View style={styles.row}><Text>Delivery</Text><Text>{deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}</Text></View>
      <View style={styles.row}><Text>Total</Text><Text>₹{payableAmount.toFixed(2)}</Text></View>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    elevation: 3,
    marginBottom: 30,
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
});

export default BillingSummary;
