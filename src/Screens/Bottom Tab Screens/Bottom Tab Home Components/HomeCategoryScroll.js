import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

const CATEGORY_API_URL =
  'https://ddottt6z7ccpe0a-apexdb.adb.me-jeddah-1.oraclecloudapps.com/ords/otrix/oc_mm_item_types_v/';

const HomeCategoryScroll = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const fetchCategories = async () => {
    try {
      const response = await axios.get(CATEGORY_API_URL);
      setCategories(response.data.items || []);
    } catch (error) {
      console.error('API Fetch Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
       navigation.navigate('CategoryProducts', {
  selectedCategory: item.item_type,
})
      }
      style={styles.cardWrapper}
    >
      <LinearGradient
        colors={['#f5f7fa', '#c3cfe2']}
        style={styles.card}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Image
          source={{ uri: item.image_path }}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.title} numberOfLines={2}>{item.item_type}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#ff00a6" style={{ marginTop: 40 }} />;
  }

  return (
    <FlatList
      data={categories}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderItem}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingLeft: 12,
    paddingRight: 6,
  },
  cardWrapper: {
    marginRight: 12,
    borderRadius: 10,
    overflow: 'hidden',
    
    backgroundColor: '#fff',
  },
  card: {
    width: 80,
    height: 90,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginBottom: 6,
  },
  title: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
});

export default HomeCategoryScroll;
