import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const TipSlider = ({ tipAmount, setTipAmount }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>Support Your Delivery Partner</Text>
      <View style={styles.tipSliderContainer}>
        {[0, 10, 20, 30].map((tip) => (
          <TouchableOpacity
            key={tip}
            onPress={() => setTipAmount(tip)}
            style={[
              styles.tipSliderChip,
              tipAmount === tip && styles.tipSliderChipActive,
            ]}
          >
            <Text
              style={[
                styles.tipSliderText,
                tipAmount === tip && styles.tipSliderTextActive,
              ]}
            >
              {tip === 0 ? 'No Tip' : `₹${tip}`}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    
   
    padding: 16,
    
    
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  tipSliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  tipSliderChip: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    
    backgroundColor: '#f1f1f1',
    marginRight: 10,
  },
  tipSliderChipActive: {
    backgroundColor: '#00b894',
  },
  tipSliderText: {
    fontSize: 13,
    color: '#333',
  },
  tipSliderTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default TipSlider;
