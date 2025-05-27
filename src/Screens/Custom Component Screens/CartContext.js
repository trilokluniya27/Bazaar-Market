import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [deliverySlot, setDeliverySlot] = useState('ASAP (30 mins)');
  const [tipAmount, setTipAmount] = useState(0);
  const [deliveryNote, setDeliveryNote] = useState('');



  // ✅ Add to cart
  const addToCart = (item) => {
    setCart(prev => {
      const exists = prev.find(p => String(p.item_id) === String(item.item_id));
      if (exists) {
        return prev.map(p =>
          String(p.item_id) === String(item.item_id)
            ? { ...p, quantity: item.quantity }
            : p
        );
      }
      return [...prev, item];
    });
  };


  // ✅ Remove from cart
  const removeFromCart = (itemId) => {
    setCart(prev => prev.filter(item => String(item.item_id) !== String(itemId)));
  };

  // ✅ Update cart item quantity manually
  const updateCartItemQuantity = (itemId, newQuantity) => {
    setCart(prev =>
      prev.map(item =>
        String(item.item_id) === String(itemId)
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };


  // ✅ Increment quantity
  const incrementItemQuantity = (item) => {
    setCart(prev =>
      prev.map(p =>
        String(p.item_id) === String(item.item_id)
          ? { ...p, quantity: (p.quantity || 1) + 1 }
          : p
      )
    );
  };

  // ✅ Decrement quantity
  const decrementItemQuantity = (item) => {
    setCart(prev =>
      prev
        .map(p =>
          String(p.item_id) === String(item.item_id)
            ? { ...p, quantity: (p.quantity || 1) - 1 }
            : p
        )
        .filter(p => p.quantity > 0)
    );
  };

  // ✅ Get item quantity
  const getCartItemQuantity = (itemId) => {
    const item = cart.find(i => String(i.item_id) === String(itemId));
    return item?.quantity || 0;
  };

  // ✅ Wishlist toggle
  const toggleWishlist = async (item) => {
    let updated;
    if (wishlist.find(i => i.item_id === item.item_id)) {
      updated = wishlist.filter(i => i.item_id !== item.item_id);
    } else {
      updated = [...wishlist, item];
    }
    setWishlist(updated);
    await AsyncStorage.setItem('wishlist', JSON.stringify(updated));
  };

  const isWishlisted = (id) => wishlist.some(i => i.item_id === id);

  // ✅ Global totals
  const totalItems = cart.reduce((sum, i) => sum + (i.quantity || 1), 0);
  const totalAmount = cart.reduce((sum, i) => sum + (i.price || 0) * (i.quantity || 1), 0);

  // ✅ Global data fetch
  const fetchGlobalData = async () => {
    try {
      const catRes = await axios.get('https://ddottt6z7ccpe0a-apexdb.adb.me-jeddah-1.oraclecloudapps.com/ords/otrix/oc_mm_item_types_v/');
      const prodRes = await axios.get('https://ddottt6z7ccpe0a-apexdb.adb.me-jeddah-1.oraclecloudapps.com/ords/otrix/oc_pos_items_v/');
      setAllCategories(catRes.data?.items || []);
      setAllProducts(prodRes.data?.items || []);
    } catch (err) {
      console.log('Global Data Error:', err);
    }
  };

  // ✅ Load cart from storage on start
  useEffect(() => {
    const loadCart = async () => {
      const storedCart = await AsyncStorage.getItem('cart');
      if (storedCart) setCart(JSON.parse(storedCart));
    };
    loadCart();
  }, []);

  // ✅ Save cart to storage
  useEffect(() => {
    AsyncStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const clearCart = () => {
    setCart([]);
  };
  const handleAdd = (product) => {
    const productWithQty = { ...product, quantity: 1, item_id: product.item_id || product.id };
    addToCart(productWithQty);
  };
  return (
    <CartContext.Provider
      value={{
        cart,
        clearCart,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        incrementItemQuantity,
        decrementItemQuantity,
        getCartItemQuantity,
        address,
        setAddress,
        totalItems,
        totalAmount,
        wishlist,
        toggleWishlist,
        isWishlisted,
        allCategories,
        allProducts,
        deliverySlot,
        setDeliverySlot,
        tipAmount,
        setTipAmount,
        deliveryNote,

        setDeliveryNote,



      }}
    >
      {children}
    </CartContext.Provider>
  );
};