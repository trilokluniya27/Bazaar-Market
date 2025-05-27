import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';

const DeliveryAddress = ({ address, navigation }) => {
  return (
    <Animatable.View animation="fadeInUp" delay={100} duration={700} style={styles.card}>
      <View style={styles.cardHeader}>
        <Icon name="map-marker-radius" size={20} color="#0070b7" />
        <Text style={styles.cardTitle}>Delivery Address</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Select Delivery Address')}>
          <Text style={styles.changeLink}>Change</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.cardText}>{address?.name || 'Trilok Lunia'}</Text>
      <Text style={styles.cardText}>{address?.details || 'No address provided'}</Text>
      <Text style={styles.cardText}>{address?.phone || '+91 8224054220'}</Text>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
   
    marginBottom: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    marginLeft: 10,
  },
  changeLink: {
    color: 'red',
    fontWeight: 'bold',
  },
  cardText: {
    fontSize: 15,
    color: '#555',
  },
});

export default DeliveryAddress;
