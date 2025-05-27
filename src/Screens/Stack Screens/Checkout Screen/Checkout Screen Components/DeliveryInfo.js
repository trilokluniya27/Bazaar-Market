import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';

const DeliveryInfo = ({ cart, deliveryDate }) => {
  const totalQty = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);

  return (
    <Animatable.View animation="fadeInUp" delay={300} duration={700} style={styles.card}>
      <View style={styles.cardHeader}>
        <Icon name="truck-fast-outline" size={20} color="#0070b7" />
        <Text style={styles.cardTitle}>Delivery</Text>
      </View>
      <Text style={styles.cardText}>📅 Estimated on {deliveryDate}</Text>
      <Text style={styles.cardText}>🛒 {cart.length} items • {totalQty} Qty</Text>
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
  cardText: {
    fontSize: 15,
    color: '#555',
  },
});

export default DeliveryInfo;
