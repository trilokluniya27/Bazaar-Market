// ✅ CategoryProductsScreen.js — Final Version with Category API Integration

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import ShimmerGrid from './ShimmerGrid';
import ProductCard from './ProductCard';

const { width } = Dimensions.get('window');
const CATEGORY_API_URL = 'https://ddottt6z7ccpe0a-apexdb.adb.me-jeddah-1.oraclecloudapps.com/ords/otrix/oc_mm_item_types_v/';

const CategoryProductsScreen = ({ route }) => {
  const { selectedCategory } = route.params;
  const [products, setProducts] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [activeSubcategory, setActiveSubcategory] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [availableCategories, setAvailableCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, [selectedCategory]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(CATEGORY_API_URL);
      setAvailableCategories(response.data.items || []);
    } catch (error) {
      console.error('Category API Fetch Error:', error);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        'https://ddottt6z7ccpe0a-apexdb.adb.me-jeddah-1.oraclecloudapps.com/ords/otrix/oc_pos_items_v/'
      );

      const all = res.data.items || [];

      console.log('📦 Selected Category:', selectedCategory);
      console.log('📊 Sample Product:', all[0]);

      const catProducts = all.filter(p =>
        (p.item_type || '').toLowerCase().includes((selectedCategory || '').toLowerCase())
      );

      console.log('🎯 Category Match:', catProducts.length);

      setProducts(catProducts);

      const uniqueSubcategories = [...new Set(catProducts.map(p => p.subcategory || 'Others'))];
      setSubcategories(uniqueSubcategories);
      setActiveSubcategory(uniqueSubcategories[0] || 'Others');

    } catch (err) {
      console.error('API error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const filtered = products.filter(p => (p.subcategory || 'Others') === activeSubcategory);
    setFilteredProducts(filtered);
  }, [activeSubcategory, products]);

  return (
    <View style={styles.container}>
      <View style={styles.leftColumn}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {subcategories.map(sub => (
            <TouchableOpacity
              key={sub}
              onPress={() => setActiveSubcategory(sub)}
              style={[styles.subcategoryBtn, activeSubcategory === sub && styles.activeBtn]}
            >
              <Text style={[styles.subcategoryText, activeSubcategory === sub && styles.activeText]}>
                {sub}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.rightColumn}>
        {loading ? (
          <ShimmerGrid count={6} />
        ) : filteredProducts.length > 0 ? (
          <FlatList
            data={filteredProducts}
            renderItem={({ item }) => <ProductCard item={item} />}
            keyExtractor={(item) => item.item_id.toString()}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            initialNumToRender={6}
            maxToRenderPerBatch={10}
            removeClippedSubviews={true}
            windowSize={5}
          />
        ) : (
          <View style={{ padding: 20, alignItems: 'center' }}>
            <Text style={{ fontSize: 16, color: '#666' }}>🚫 No Products Found</Text>
            <Text style={{ fontSize: 13, color: '#aaa', marginTop: 6 }}>
              Try a different subcategory or go back.
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: 'row' },
  leftColumn: {
    width: 100,
    backgroundColor: '#f1f1f1',
    paddingVertical: 10,
  },
  subcategoryBtn: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginVertical: 4,
    borderRadius: 8,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  activeBtn: {
    backgroundColor: '#ff4d6d',
  },
  subcategoryText: {
    fontSize: 12,
    color: '#555',
  },
  activeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  rightColumn: {
    flex: 1,
    padding: 8,
    backgroundColor: '#fff',
  },
});

export default CategoryProductsScreen;
