import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { CartContext } from '../../Custom Component Screens/CartContext';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const ProductCard = ({ item, onPress }) => {
  const {
    cart,
    addToCart,
    getCartItemQuantity,
    incrementItemQuantity,
    decrementItemQuantity,
  } = useContext(CartContext);

  const [qty, setQty] = useState(0);

  useEffect(() => {
    const currentQty = getCartItemQuantity(item.item_id);
    setQty(currentQty);
  }, [cart]);

  return (
    <View style={styles.cardWrapper}>
      <TouchableOpacity onPress={() => onPress(item)}>
        <Image
          source={
            item.image_path
              ? { uri: item.image_path }
              : require('../../../Images/Noimages.jpeg')
          }
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.weightBox}>
          <Text style={styles.weightText}>{item.weight || '1 kg'}</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.deliveryRow}>
        <Icon name="flash-outline" size={14} color="#555" />
        <Text style={styles.deliveryText}>7 MINS</Text>
      </View>

      <Text numberOfLines={1} style={styles.name}>
        {item.item_name}
      </Text>

      <Text style={styles.offerText}>{item.discount || '10%'} OFF</Text>

      <View style={styles.priceRow}>
        <Text style={styles.discountedPrice}>₹{item.price}</Text>
        <Text style={styles.originalPrice}>
          ₹{item.original_price || item.price + 10}
        </Text>
      </View>

      <View style={styles.bottomControl}>
        {qty > 0 ? (
          <View style={styles.qtyContainer}>
            <TouchableOpacity
              onPress={() => decrementItemQuantity(item)}
              style={styles.qtyButton}>
              <Text style={styles.qtyText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.qtyCount}>{qty}</Text>
            <TouchableOpacity
              onPress={() => incrementItemQuantity(item)}
              style={styles.qtyButton}>
              <Text style={styles.qtyText}>+</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => addToCart({ ...item, quantity: 1 })}
            style={styles.cartButton}>
            <Text style={styles.cartText}>Add</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  cardWrapper: {
    width: 130,
    backgroundColor: '#fff',
    

    padding: 10,
    marginRight: 12,

  },
  image: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    backgroundColor: '#fff',
  },
  weightBox: {
    position: 'absolute',
    top: 5,
    left: 5,
    backgroundColor: '#fff',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,

  },
  weightText: {
    fontSize: 10,
    color: '#333',
    fontWeight: '600',
  },
  deliveryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  deliveryText: {
    fontSize: 11,
    color: '#777',
    marginLeft: 4,
  },
  name: {
    fontSize: 13,
    fontWeight: '600',
    marginTop: 4,
    color: '#222',
  },
  offerText: {
    fontSize: 11,
    color: '#e74c3c',
    marginTop: 2,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  discountedPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2ecc71',
  },
  originalPrice: {
    fontSize: 12,
    color: '#888',
    textDecorationLine: 'line-through',
    marginLeft: 6,
  },
  bottomControl: {
    marginTop: 8,
  },
  cartButton: {
    backgroundColor: '#0070b7',
    paddingVertical: 6,
    borderRadius: 6,
  },
  cartText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 13,
    fontWeight: '600',
  },
  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f1f1f1',
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 6,
  },
  qtyButton: {
    backgroundColor: '#ddd',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  qtyText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  qtyCount: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingHorizontal: 6,
    color: '#333',
  },
});
