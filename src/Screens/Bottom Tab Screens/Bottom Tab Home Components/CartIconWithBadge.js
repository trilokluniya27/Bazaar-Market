import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // or any icon lib
import { CartContext } from '../../Custom Component Screens/CartContext'; // adjust path
import { useNavigation } from '@react-navigation/native';

const CartIconWithBadge = () => {
  const { totalItems } = useContext(CartContext);
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Cart Screen')}>
      <View style={styles.container}>
        <Icon name="cart-outline" size={26} color="#000" />
        {totalItems > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{totalItems}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  badge: {
    position: 'absolute',
    right: 2,
    top: 2,
    backgroundColor: 'red',
    borderRadius: 10,
    paddingHorizontal: 5,
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default CartIconWithBadge;
