import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SectionHeader = ({ title, onSeeAll, products = [] }) => {
  const navigation = useNavigation();

  const handleSeeAll = () => {
    if (onSeeAll) {
      onSeeAll();
    } else {
      navigation.navigate('AllProductsScreen', {
        sectionTitle: title,
        products, // ✅ pass current section products
      });
    }
  };

  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <TouchableOpacity onPress={handleSeeAll}>
        <Text style={styles.seeAll}>See all</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  seeAll: {
    color: '#f44',
  },
});

export default SectionHeader;
