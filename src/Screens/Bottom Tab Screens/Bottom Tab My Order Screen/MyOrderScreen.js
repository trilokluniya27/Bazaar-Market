import React, { useContext, useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { CartContext } from '../../Custom Component Screens/CartContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';

const MyOrderScreen = () => {
  const navigation = useNavigation();
  const { addToCart } = useContext(CartContext);
  const [orders, setOrders] = useState([]);

  // ✅ Load orders from AsyncStorage
  useFocusEffect(
    useCallback(() => {
      const fetchOrders = async () => {
        try {
          const stored = await AsyncStorage.getItem('orderHistory');
          if (stored) setOrders(JSON.parse(stored));
        } catch (e) {
          console.error('Error loading orders:', e);
        }
      };
      fetchOrders();
    }, [])
  );

  // ✅ Reorder logic
  const handleReorder = items => {
    items.forEach(item => {
      addToCart(item);
    });
    Alert.alert('Reorder Complete', 'Items added to your cart!');
    navigation.navigate('Cart Screen');
  };

  // ✅ Cancel logic (update same row)
const handleCancel = (order) => {
  Alert.alert('Cancel Order', `Cancel order #${order.invoiceNo}?`, [
    { text: 'No' },
    {
      text: 'Yes',
      onPress: async () => {
        try {
          const url = `https://ddottt6z7ccpe0a-apexdb.adb.me-jeddah-1.oraclecloudapps.com/ords/otrix/order_api/oc_pos_order_headers/${order.id}/Cancelled`;

          console.log("✅ Final Cancel URL:", url);
          const res = await axios.put(url);  // ✅ No body required

          const updated = orders.map(o =>
            o.id === order.id ? { ...o, status: 'Cancelled' } : o
          );
          setOrders(updated);
          await AsyncStorage.setItem('orderHistory', JSON.stringify(updated));

          Alert.alert('✅ Cancelled', `Order #${order.invoiceNo} cancelled.`);
        } catch (error) {
          console.error('❌ Cancel Error:', error.response?.data || error.message);
          Alert.alert('Cancel Failed', 'Something went wrong while cancelling.');
        }
      },
    },
  ]);
};



  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.invoice}>Invoice #: {item.invoiceNo}</Text>
        <Text
          style={[
            styles.status,
            item.status?.toLowerCase() === 'cancelled' && styles.cancelled,
          ]}
        >
          {item.status?.toUpperCase()}
        </Text>
      </View>

      <FlatList
        data={item.items}
        scrollEnabled={false}
        keyExtractor={(i, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <Text numberOfLines={1} style={styles.itemName}>
              {item.item_name} x{item.quantity}
            </Text>
            <Text style={styles.itemPrice}>₹{item.price}</Text>
          </View>
        )}
      />

      <Text style={styles.total}>Total: ₹{item.amount}</Text>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.reorderButton}
          onPress={() => handleReorder(item.items)}
        >
          <Icon name="autorenew" size={18} color="#fff" />
          <Text style={styles.reorderText}>Reorder</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.cancelButton,
            item.status?.toLowerCase() === 'cancelled' && {
              backgroundColor: '#ccc',
            },
          ]}
          onPress={() => {
            if (item.status?.toLowerCase() !== 'cancelled') {
              handleCancel(item, orders, setOrders);
            }
          }}
          disabled={item.status?.toLowerCase() === 'cancelled'}
        >
          <Icon name="cancel" size={18} color="#fff" />
          <Text style={styles.cancelText}>
            {item.status?.toLowerCase() === 'cancelled'
              ? 'Already Cancelled'
              : 'Cancel'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <FlatList
      data={orders}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={styles.container}
      ListEmptyComponent={<Text style={styles.empty}>No orders found.</Text>}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#F1F8FF',
    flexGrow: 1,
  },
  card: {
    backgroundColor: '#fff',
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  invoice: {
    fontWeight: 'bold',
    color: '#333',
  },
  status: {
    paddingHorizontal: 8,
    borderRadius: 5,
    fontSize: 12,
    fontWeight: 'bold',
  },
  cancelled: {
    backgroundColor: '#F8D7DA',
    color: '#721C24',
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  itemName: {
    color: '#555',
    flex: 1,
    marginRight: 10,
  },
  itemPrice: {
    color: '#333',
  },
  total: {
    fontWeight: 'bold',
    fontSize: 15,
    marginTop: 10,
    color: '#000',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  reorderButton: {
    flexDirection: 'row',
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
    gap: 6,
  },
  reorderText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cancelButton: {
    flexDirection: 'row',
    backgroundColor: '#F44336',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
    gap: 6,
  },
  cancelText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  empty: {
    textAlign: 'center',
    marginTop: 40,
    color: '#999',
    fontSize: 16,
  },
});

export default MyOrderScreen;
