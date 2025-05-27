import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const CategoryScreen = () => {
  const [categories, setCategories] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const CATEGORY_API =
    'https://ddottt6z7ccpe0a-apexdb.adb.me-jeddah-1.oraclecloudapps.com/ords/otrix/oc_mm_item_types_v/?limit=1000';
  const PRODUCT_API =
    'https://ddottt6z7ccpe0a-apexdb.adb.me-jeddah-1.oraclecloudapps.com/ords/otrix/oc_pos_items_v/?limit=1000';

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [catRes, prodRes] = await Promise.all([
        axios.get(CATEGORY_API),
        axios.get(PRODUCT_API),
      ]);

      // ✅ Extract unique category names
      const uniqueCategories = Array.from(
        new Map(catRes.data.items.map(item => [item.item_category, item])).values()
      );

      // ✅ Extract unique products (based on id)
      const uniqueProducts = Array.from(
        new Map(prodRes.data.items.map(item => [item.id, item])).values()
      );

      setCategories(uniqueCategories);
      setAllProducts(uniqueProducts);
      setSelectedCategory(uniqueCategories[0]?.item_category || '');
    } catch (error) {
      console.error('API Fetch Error:', error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Filter products matching selectedCategory safely
  const filteredProducts = selectedCategory
    ? allProducts.filter(
        item =>
          item.item_category?.toString().trim().toLowerCase() ===
          selectedCategory.toString().trim().toLowerCase()
      )
    : allProducts;

  return (
    <View style={styles.container}>
      {/* Left Category Sidebar */}
      <View style={styles.sidebar}>
        <FlatList
          data={categories}
          keyExtractor={item => item.item_category}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.categoryItem,
                selectedCategory.toLowerCase() === item.item_category.toLowerCase() &&
                  styles.categoryItemActive,
              ]}
              onPress={() => setSelectedCategory(item.item_category)}
            >
              <Image source={{ uri: item.image_path }} style={styles.categoryIcon} />
              <Text style={styles.categoryText}>{item.item_category}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Right Product Grid */}
      <View style={styles.products}>
        {loading ? (
          <View style={styles.loaderWrapper}>
            {[1, 2, 3, 4].map(i => (
              <View key={i} style={styles.shimmerBox} />
            ))}
          </View>
        ) : filteredProducts.length === 0 ? (
          <View style={styles.noProductBox}>
            <Text style={styles.noProductText}>No products in this category</Text>
          </View>
        ) : (
          <FlatList
            data={filteredProducts}
            keyExtractor={item => item.id.toString()}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => navigation.navigate('ProductDetail', { product: item })}
                style={styles.productCard}
              >
                <Image source={{ uri: item.image_path }} style={styles.productImage} />
                <Text style={styles.productName}>{item.item_name}</Text>
                <Text style={styles.productPrice}>₹{item.price}</Text>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </View>
  );
};

export default CategoryScreen;

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: 'row', backgroundColor: '#f5f5f5' },

  // Sidebar styles
  sidebar: { width: 100, backgroundColor: '#fff', borderRightWidth: 1, borderColor: '#eee' },
  categoryItem: {
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  categoryItemActive: {
    backgroundColor: '#e8f5e9',
    borderLeftWidth: 4,
    borderColor: '#0aaf60',
  },
  categoryIcon: { width: 40, height: 40, marginBottom: 5 },
  categoryText: { fontSize: 12, textAlign: 'center' },

  // Product styles
  products: { flex: 1, padding: 10 },
  productCard: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 5,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 2,
  },
  productImage: { width: 80, height: 80, resizeMode: 'contain' },
  productName: { fontSize: 14, fontWeight: '600', marginTop: 5 },
  productPrice: { fontSize: 13, color: '#0aaf60' },

  // Loader
  loaderWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  shimmerBox: {
    width: '48%',
    height: 150,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    marginBottom: 10,
  },

  // No product
  noProductBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noProductText: {
    fontSize: 16,
    color: 'gray',
  },
});