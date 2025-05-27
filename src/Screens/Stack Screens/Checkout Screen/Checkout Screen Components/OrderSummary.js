import React from 'react';
import { View, FlatList, Text, Image } from 'react-native';

const OrderSummary = ({ cart }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>Order Summary</Text>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.item_id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <Image
              source={item.image_path ? { uri: item.image_path } : require('../../../../Images/Noimages.jpeg')}
              style={styles.itemImage}
            />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.itemName}>{item.item_name}</Text>
              <Text style={styles.itemQty}>Qty: {item.quantity}</Text>
            </View>
            <Text style={styles.itemPrice}>₹{item.price * item.quantity}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = {
  card: {
    backgroundColor: '#fff',
    
    marginVertical: 8,
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
   
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  itemRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 6 },
  itemImage: { width: 48, height: 48,  backgroundColor: '#eee' },
  itemName: { fontSize: 14, fontWeight: '600', color: '#333' },
  itemQty: { fontSize: 13, color: '#666' },
  itemPrice: { fontWeight: 'bold', color: '#000', fontSize: 14 },
};

export default OrderSummary;
