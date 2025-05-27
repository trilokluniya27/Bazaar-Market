import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';

const PlaceOrderButton = ({ loading, onPress }) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.orderButton} onPress={onPress} disabled={loading}>
        {loading ? (
          <View style={styles.loadingWrapper}>
            <ActivityIndicator size="small" color="#fff" style={{ marginRight: 8 }} />
            <Text style={styles.orderText}>Placing Order...</Text>
          </View>
        ) : (
          <Text style={styles.orderText}>Place Order</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flex:1
  },
  orderButton: {
    backgroundColor: 'green',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  orderText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default PlaceOrderButton;
