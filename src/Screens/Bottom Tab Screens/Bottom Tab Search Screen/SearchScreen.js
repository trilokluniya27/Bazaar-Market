import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
import Voice from '@react-native-voice/voice';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CartContext } from '../../Custom Component Screens/CartContext';
const API_URL = 'https://ddottt6z7ccpe0a-apexdb.adb.me-jeddah-1.oraclecloudapps.com/ords/otrix/oc_pos_items_v/';

const SearchScreen = ({ navigation }) => {
  const [voiceText, setVoiceText] = useState('');
  const [products, setProducts] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);

  const limit = 25;

  useEffect(() => {
    Voice.onSpeechResults = (e) => {
      const spoken = e.value?.[0] || '';
      setVoiceText(spoken);
      setIsListening(false);
    };
    Voice.onSpeechEnd = () => setIsListening(false);
    loadRecentSearches();
    fetchProducts(0);
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const fetchProducts = async (startOffset) => {
    if (allLoaded) return;
    try {
      if (startOffset === 0) setLoading(true);
      else setIsFetchingMore(true);
      const res = await axios.get(`${API_URL}?limit=${limit}&offset=${startOffset}`);
      let items = res.data?.items || [];
      items = items.map(item => ({
        ...item,
        mrp: item.mrp || Math.round(item.price * 1.5),
      }));
      if (items.length < limit) setAllLoaded(true);
      setProducts(prev => [...(startOffset === 0 ? [] : prev), ...items]);
      setOffset(prev => prev + limit);
    } catch (e) {
      console.error('Error loading products:', e);
    } finally {
      setLoading(false);
      setIsFetchingMore(false);
    }
  };

  const loadRecentSearches = async () => {
    const saved = await AsyncStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  };

  const saveSearch = async (term) => {
    let updated = [term, ...recentSearches.filter(t => t !== term)].slice(0, 5);
    setRecentSearches(updated);
    await AsyncStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  const startVoice = async () => {
    try {
      setIsListening(true);
      await Voice.start('en-US');
      setTimeout(() => Voice.stop(), 7000);
    } catch (e) {
      console.error(e);
    }
  };

  const handleAISearch = async () => {
    try {
      const keyword = voiceText.toLowerCase().trim();
      if (!keyword) {
        alert("Please type or speak something to search.");
        return;
      }
      setLoading(true);
      await saveSearch(keyword);
      const res = await axios.get(`${API_URL}?limit=1000`);
      let items = res.data?.items || [];
      items = items.map(item => ({
        ...item,
        mrp: item.mrp || Math.round(item.price * 1.5),
      }));
      const filtered = items.filter(p =>
        p.item_name?.toLowerCase().includes(keyword)
      );
      setProducts(filtered);
      setAllLoaded(true);
    } catch (error) {
      console.error('Search error:', error);
      alert('Search failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const ProductCard = ({ item }) => {
    const discount = Math.round(((item.mrp - item.price) / item.mrp) * 100);
    return (
      <View style={styles.cardContainer}>
        <View style={styles.discountTag}>
          <Text style={styles.discountText}>{discount}% OFF</Text>
        </View>
        <Image
          source={{ uri: item.image_path || 'https://via.placeholder.com/100' }}
          style={styles.cardImage}
        />
        <TouchableOpacity style={styles.addButton}>
          <MaterialIcons name="add" size={20} color="#00A676" />
        </TouchableOpacity>
        <Text style={styles.cardName}>{item.item_name}</Text>
        <Text style={styles.cardQuantity}>{item.packaging || '1 Piece'}</Text>
        <View style={styles.priceRow}>
          <Text style={styles.newPrice}>₹{item.price}</Text>
          <Text style={styles.oldPrice}>₹{item.mrp}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.searchWrapper}>
        <TextInput
          placeholder="Search Products"
          value={voiceText}
          onChangeText={setVoiceText}
          style={styles.searchInput}
        />
        <TouchableOpacity style={styles.icon} onPress={startVoice}>
          <MaterialIcons name="settings-voice" size={25} color="#900" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('BarcodeScanner')}>
          <MaterialIcons name="qr-code-scanner" size={25} color="#900" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon} onPress={handleAISearch}>
          <MaterialIcons name="search" size={25} color="#900" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.aiButton} onPress={handleAISearch}>
        <Text style={styles.aiButtonText}>🎯 AI Search</Text>
      </TouchableOpacity>

      {recentSearches.length > 0 && (
        <View style={{ marginHorizontal: 15, marginTop: 10 }}>
          <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>Recent Searches:</Text>
          <FlatList
            horizontal
            data={recentSearches}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => setVoiceText(item)}
                style={{
                  backgroundColor: '#eee',
                  paddingHorizontal: 10,
                  paddingVertical: 6,
                  borderRadius: 20,
                  marginRight: 10,
                }}
              >
                <Text>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}

      {loading ? (
        <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
          {[...Array(4)].map((_, index) => (
            <ShimmerPlaceholder
              key={index}
              style={styles.cardContainer}
              LinearGradient={LinearGradient}
            />
          ))}
        </View>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ paddingBottom: 100 }}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between', marginHorizontal: 10 }}
          renderItem={({ item }) => <ProductCard item={item} />}
          onEndReached={() => fetchProducts(offset)}
          onEndReachedThreshold={0.5}
          ListFooterComponent={isFetchingMore ? (
            <View style={{ padding: 15, alignItems: 'center' }}>
              <ActivityIndicator size='large' color="#900" />
            </View>
          ) : null}
        />
      )}
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    margin: 10,
    borderRadius: 8,
    paddingHorizontal: 10
  },
  searchInput: { flex: 1, padding: 12 },
  icon: { marginLeft: 10 },
  aiButton: {
    marginHorizontal: 20,
    marginVertical: 10,
    backgroundColor: '#900',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  aiButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  cardContainer: {
    width: '47%',
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
    position: 'relative'
  },
  discountTag: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#FF4500',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    zIndex: 1,
  },
  discountText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  cardImage: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#f9f9f9'
  },
  addButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#00A676',
    borderRadius: 15,
    padding: 3,
  },
  cardName: { fontSize: 14, fontWeight: '600', color: '#333' },
  cardQuantity: { fontSize: 12, color: '#666', marginBottom: 5 },
  priceRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  newPrice: { fontSize: 14, fontWeight: 'bold', color: '#000' },
  oldPrice: { fontSize: 12, color: '#888', textDecorationLine: 'line-through' },
});
