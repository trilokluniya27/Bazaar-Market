import React, { useContext } from 'react';
import { TouchableOpacity, Text, StyleSheet, Image, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { CartContext } from '../../Custom Component Screens/CartContext';
import Ionicons from 'react-native-vector-icons/Ionicons';

const FloatingCartButton = ({ animatedStyle, totalItems, totalAmount, onPress }) => {
  const { cart } = useContext(CartContext);
  const lastThreeItems = [...cart].slice(-3);

  return (
    <Animated.View style={[styles.floatingCartBtn, animatedStyle]}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.cartButtonContent}>
        
        <View style={styles.imageRow}>
          {lastThreeItems.map((item, index) => (
            <Image
              key={index}
              source={{ uri: item.image_path }}
              style={[styles.cartItemImage, { marginLeft: index === 0 ? 0 : -10 }]}
            />
          ))}
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.floatingCartText}>View Cart</Text>
          <Text style={styles.floatingCartText}>{totalItems} ITEMS</Text>
        </View>

        {/* ✅ Right arrow icon */}
        <Ionicons name="chevron-forward" size={20} color="#fff" style={styles.arrowIcon} />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  floatingCartBtn: {
    position: 'absolute',
    bottom: 10,
    backgroundColor: '#0070b7',
    borderRadius: 30,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  cartButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartItemImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: '#fff',
  },
  textContainer: {
    marginLeft: 12,
    marginRight: 8,
  },
  floatingCartText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  arrowIcon: {
    marginLeft: 8,
  },
});

export default FloatingCartButton;
