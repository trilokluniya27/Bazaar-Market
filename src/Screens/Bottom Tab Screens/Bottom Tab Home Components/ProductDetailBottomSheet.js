import React, { useRef } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Modalize } from 'react-native-modalize';

const ProductDetailBottomSheet = React.forwardRef(({ product, onAddToCart }, ref) => {
  if (!product) return null;

  return (
    <Modalize ref={ref} adjustToContentHeight>
      <View style={styles.content}>
        <Image source={product.image} style={styles.image} />
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>₹{product.price} <Text style={styles.mrp}>₹{product.mrp}</Text></Text>
        <TouchableOpacity style={styles.addBtn} onPress={() => onAddToCart(product)}>
          <Text style={styles.addBtnText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </Modalize>
  );
});

const styles = StyleSheet.create({
  content: { padding: 20, alignItems: 'center' },
  image: { width: 150, height: 150, resizeMode: 'contain', marginBottom: 10 },
  title: { fontSize: 18, fontWeight: 'bold', textAlign: 'center' },
  price: { fontSize: 16, color: '#f44', marginTop: 8 },
  mrp: { textDecorationLine: 'line-through', color: '#888', fontSize: 14 },
  addBtn: { backgroundColor: '#00c853', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8, marginTop: 16 },
  addBtnText: { color: '#fff', fontWeight: 'bold' },
});

export default ProductDetailBottomSheet;
