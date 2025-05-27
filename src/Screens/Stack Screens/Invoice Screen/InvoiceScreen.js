import React from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';

const InvoiceScreen = ({ route }) => {
  const {
    invoiceNo,
    items,
    totalAmount,
    deliveryCharge,
    coupon,
    grandTotal,
  } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🧾 Invoice</Text>
      <Text style={styles.invoice}>Invoice No: {invoiceNo}</Text>

      <FlatList
        data={items}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <Text style={styles.itemName}>
              {item.item_name} x{item.quantity}
            </Text>
            <Text style={styles.itemPrice}>₹{item.price * item.quantity}</Text>
          </View>
        )}
        scrollEnabled={false}
      />

      <View style={styles.summary}>
        <View style={styles.row}>
          <Text style={styles.label}>Subtotal:</Text>
          <Text style={styles.value}>₹{totalAmount}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Delivery:</Text>
          <Text style={styles.value}>₹{deliveryCharge}</Text>
        </View>
        {coupon ? (
          <View style={styles.row}>
            <Text style={styles.label}>Coupon Discount:</Text>
            <Text style={styles.value}>- ₹30</Text>
          </View>
        ) : null}
        <View style={styles.divider} />
        <View style={styles.row}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalLabel}>₹{grandTotal}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0D47A1',
    marginBottom: 10,
  },
  invoice: {
    fontSize: 16,
    marginBottom: 15,
    color: '#555',
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 6,
  },
  itemName: {
    color: '#333',
    fontSize: 15,
  },
  itemPrice: {
    color: '#333',
    fontSize: 15,
  },
  summary: {
    marginTop: 20,
    backgroundColor: '#F1F8FF',
    padding: 15,
    borderRadius: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  label: {
    fontSize: 15,
    color: '#555',
  },
  value: {
    fontSize: 15,
    color: '#555',
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 8,
  },
  totalLabel: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default InvoiceScreen;
