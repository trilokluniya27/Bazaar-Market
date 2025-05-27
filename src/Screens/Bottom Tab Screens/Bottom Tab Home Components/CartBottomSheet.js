import React, { useContext, useRef } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { CartContext } from '../context/CartContext';
import { Modalize } from 'react-native-modalize';

const CartBottomSheet = React.forwardRef((props, ref) => {
  const { cart, removeFromCart, totalAmount } = useContext(CartContext);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>{item.item_name}</Text>
      <Text>₹{item.price} × {item.quantity}</Text>
      <TouchableOpacity onPress={() => removeFromCart(item.item_id)}>
        <Text style={{ color: 'red' }}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <Modalize ref={ref} snapPoint={400}>
      <View style={styles.container}>
        <Text style={styles.title}>Your Cart</Text>
        <FlatList
          data={cart}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
        <Text style={styles.total}>Total: ₹{totalAmount}</Text>
      </View>
    </Modalize>
  );
});

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  item: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 8 },
  total: { marginTop: 16, fontSize: 16, fontWeight: 'bold', color: '#222' },
});

export default CartBottomSheet;
