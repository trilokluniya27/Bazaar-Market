import React, { useEffect, useState, useContext, useRef } from 'react';
import {
  View,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import { CartContext } from '../../Custom Component Screens/CartContext';
import { Modalize } from 'react-native-modalize';
import ProductCard from './ProductCard'; // ✅ Make sure this is a default export

const PRODUCT_API_URL =
  'https://ddottt6z7ccpe0a-apexdb.adb.me-jeddah-1.oraclecloudapps.com/ords/otrix/oc_pos_items_v/';

const BestSellerProducts = ({ timer = '00:00:00' }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [countdown, setCountdown] = useState(1800);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const modalRef = useRef();

  const {
    addToCart,
    getCartItemQuantity,
    incrementItemQuantity,
    decrementItemQuantity,
    toggleWishlist,
    isWishlisted,
  } = useContext(CartContext);

  const fetchProducts = async (isRefresh = false) => {
    if (!isRefresh) setLoading(true);
    try {
      const res = await axios.get(PRODUCT_API_URL);
      setProducts(res.data.items || []);
    } catch (err) {
      console.error('Product API error:', err);
    } finally {
      if (!isRefresh) setLoading(false);
      if (isRefresh) setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchProducts(true);
  };

  const openDetail = (item) => {
    setSelectedProduct(item);
    modalRef.current?.open();
  };

  return (
    <View style={{ paddingVertical: 10 }}>
      {loading ? (
        <FlatList
          data={Array.from({ length: 6 })}
          horizontal
          keyExtractor={(item, index) => `shimmer-${index}`}
          renderItem={() => (
            <View
              style={{
                width: 140,
                height: 170,
                backgroundColor: '#eee',
          
                marginRight: 12,
              }}
            />
          )}
          showsHorizontalScrollIndicator={false}
        />
      ) : (
        <FlatList
          data={products}
          horizontal
          renderItem={({ item }) => (
            <ProductCard item={item} onPress={openDetail} />
          )}
          keyExtractor={(item, index) => `${item.item_id}-${index}`}
          refreshing={refreshing}
          onRefresh={onRefresh}
          showsHorizontalScrollIndicator={false}
          initialNumToRender={6}
          maxToRenderPerBatch={10}
          removeClippedSubviews={true}
          windowSize={5}
        />
      )}

     
    </View>
  );
};

export default BestSellerProducts;
