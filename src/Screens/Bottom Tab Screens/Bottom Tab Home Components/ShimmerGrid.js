import React from 'react';
import { View, StyleSheet, Dimensions, FlatList } from 'react-native';

const { width } = Dimensions.get('window');

const ShimmerGrid = ({ count = 6 }) => {
  const shimmerItems = Array.from({ length: count });

  return (
    <FlatList
      data={shimmerItems}
      keyExtractor={(_, index) => `shimmer-${index}`}
      numColumns={2}
      scrollEnabled={false}
      renderItem={() => (
        <View style={styles.card} />
      )}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    width: (width - 140) / 2,
    height: 170,
    backgroundColor: '#eee',
    borderRadius: 10,
    margin: 8,
  },
});

export default ShimmerGrid;
