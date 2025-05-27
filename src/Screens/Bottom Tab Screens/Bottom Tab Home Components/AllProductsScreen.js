import React, { useState, useEffect, useLayoutEffect, useContext } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useAnimatedStyle } from 'react-native-reanimated';
import { CartContext } from '../../Custom Component Screens/CartContext';
import { useRoute } from '@react-navigation/native';
import ProductCard from '../Bottom Tab Home Components/ProductCard'; // adjust the path if needed
import FloatingCartButton from './FloatingCartButton';

const AllProductsScreen = ({navigation}) => {
  const route = useRoute();
  const sectionTitle = route?.params?.sectionTitle || 'All Products';
  const products = route?.params?.products || [];
 const floatingCartStyle = useAnimatedStyle(() => ({
    transform: [{ scale: 1 }],
  }));
  const { totalItems, totalAmount } = useContext(CartContext);
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{sectionTitle}</Text>
      <FlatList
        data={products}
        numColumns={2}
        keyExtractor={(item) => item.item_id?.toString()}
        renderItem={({ item }) => (
          <ProductCard item={item} />
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
         {totalItems > 0 && (
          <FloatingCartButton
            totalItems={totalItems}
            totalAmount={totalAmount}
            onPress={() => navigation.navigate('Cart Screen')}
            animatedStyle={floatingCartStyle}
          />
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingLeft: 5,
  },
});

export default AllProductsScreen;
