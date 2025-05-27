import React, { useState, useEffect, useLayoutEffect, useContext } from 'react';
import {
  View,
  StatusBar,
  useColorScheme,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  withTiming,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import Voice from '@react-native-voice/voice';
import { SafeAreaView } from 'react-native-safe-area-context';

import SearchBar from '../Bottom Tab Home Components/SearchBar';
import HomeCategoryScroll from '../Bottom Tab Home Components/HomeCategoryScroll';
import DealBannerSlider from '../Bottom Tab Home Components/DealBannerSlider';
import SectionHeader from '../Bottom Tab Home Components/SectionHeader';
import FloatingCartButton from '../Bottom Tab Home Components/FloatingCartButton';
import BestSellerProducts from '../Bottom Tab Home Components/BestSellerProducts';

import { CartContext } from '../../Custom Component Screens/CartContext';

export default function BazaarHomeScreen({ navigation }) {
  const theme = useColorScheme();
  const [timer, setTimer] = useState(1800);
  const [voiceText, setVoiceText] = useState('');
  const [loading, setLoading] = useState(true);
  const [productList, setProductList] = useState([]);

  const { totalItems, totalAmount } = useContext(CartContext);

  const scrollY = useSharedValue(0);
  const prevScrollY = useSharedValue(0);
  const headerTranslateY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      const currentY = event.contentOffset.y;
      if (currentY > prevScrollY.value && currentY > 50) {
        headerTranslateY.value = withTiming(-90);
      } else {
        headerTranslateY.value = withTiming(0);
      }
      prevScrollY.value = currentY;
      scrollY.value = currentY;
    },
  });

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: headerTranslateY.value }],
  }));

  const floatingCartStyle = useAnimatedStyle(() => ({
    transform: [{ scale: 1 }],
  }));

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    const fetchProducts = async () => {
      try {
        const res = await fetch(
          'https://ddottt6z7ccpe0a-apexdb.adb.me-jeddah-1.oraclecloudapps.com/ords/otrix/oc_pos_items_v/'
        );
        const json = await res.json();
        setProductList(json.items || []);
      } catch (err) {
        console.error('API fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();

    Voice.onSpeechResults = e => {
      const spoken = e.value?.[0] || '';
      setVoiceText(spoken);
    };

    return () => {
      clearInterval(interval);
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const startVoice = async () => {
    try {
      await Voice.start('en-US');
    } catch (e) {
      console.error(e);
    }
  };

  const formatTime = s => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}m ${secs}s`;
  };

  const sections = [
   
    {
      title: 'Hot deals',
      products: productList,
    },
  ];



  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme === 'dark' ? '#000' : '#fff' }}>
      <View style={styles.container}>
        <StatusBar backgroundColor="#0070b7" barStyle="light-content" />

        <Animated.View style={[styles.animatedHeader, headerAnimatedStyle]}>
          <LinearGradient
            colors={['#0070b7', '#0070b7']}
            style={{ flex: 1, justifyContent: 'center', paddingTop: 5 }}>
            <SearchBar
              voiceText={voiceText}
              setVoiceText={setVoiceText}
              startVoice={startVoice}
              onBarcodePress={() => navigation.navigate('BarcodeScanner')}
            />
          </LinearGradient>
        </Animated.View>
        <Animated.ScrollView
          contentContainerStyle={styles.scrollContent}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}>
          {loading ? (
            <ActivityIndicator size="large" color="#0070b7" style={{ marginTop: 30 }} />
          ) : (
            <>
              <HomeCategoryScroll />
              <DealBannerSlider />
              {sections.map((section, index) => (
                <View key={index}>
                  <SectionHeader
                    title={section.title}
                    onSeeAll={() =>
                      navigation.navigate('AllProductsScreen', {
                        sectionTitle: section.title,
                        products: section.products,
                      })
                    }
                  />
                  {/* You can render products here as a horizontal scroll or FlatList */}
                </View>
              ))}
              <BestSellerProducts timer={formatTime(timer)} />
            </>
          )}
        </Animated.ScrollView>
        {totalItems > 0 && (
          <FloatingCartButton
            totalItems={totalItems}
            totalAmount={totalAmount}
            onPress={() => navigation.navigate('Cart Screen')}
            animatedStyle={floatingCartStyle}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  animatedHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 90,
    zIndex: 1000,
    elevation: 5,
    overflow: 'hidden',
  },
  scrollContent: {
    paddingTop: 100,
    paddingBottom: 120,
  },
});





