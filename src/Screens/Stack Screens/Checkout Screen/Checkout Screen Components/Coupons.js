import React from 'react';
import { View,Text, TextInput, TouchableOpacity } from 'react-native';

const Coupons = ({ coupon, setCoupon, couponApplied, setCouponApplied }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>Apply Coupon</Text>
      <View style={styles.rowBetween}>
        <TextInput
          placeholder="Enter code"
          style={styles.input}
          value={coupon}
          onChangeText={setCoupon}
        />
        <TouchableOpacity onPress={() => setCouponApplied(true)} style={styles.couponBtn}>
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Apply</Text>
        </TouchableOpacity>
      </View>
      {couponApplied && (
        <View style={styles.appliedTag}>
          <Text style={{ color: 'green' }}>✓ Coupon Applied</Text>
        </View>
      )}
    </View>
  );
};

const styles = {
  card: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f1f1f1',
    padding: 10,
    fontSize: 14,
    marginTop: 4,
    color: '#333',
  },
  couponBtn: {
    backgroundColor: '#00b894',
    paddingHorizontal: 16,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    marginLeft: 10,
  },
  appliedTag: {
    marginTop: 6,
    backgroundColor: '#eafaf1',
    padding: 6,
  },
};

export default Coupons;
