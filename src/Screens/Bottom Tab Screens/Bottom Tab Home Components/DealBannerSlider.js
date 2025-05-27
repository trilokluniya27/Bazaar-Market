import React from 'react';
import { FlatList, Image, View, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const banners = [
  { id: '1', image: require('../../../Images/banner1.jpg') },
  { id: '2', image: require('../../../Images/banner2.jpg') },
  { id: '3', image: require('../../../Images/banner3.jpg') },
];

export default function DealBannerSlider() {
  return (
    <FlatList
      data={banners}
      horizontal
      showsHorizontalScrollIndicator={false}
      pagingEnabled
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Image source={item.image} style={styles.image} resizeMode="cover" />
      )}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: { paddingVertical: 10 },
  image: { width: width - 30, height: 150, borderRadius: 12, marginHorizontal: 15,resizeMode:'cover' },
});
