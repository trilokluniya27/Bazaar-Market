import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const DeliverySlotPicker = ({ deliverySlots = [], selectedSlot, setSelectedSlot, timeRemaining, setTimeRemaining }) => {
  
  // Ensure deliverySlots is always an array to avoid "undefined" errors
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>Choose Delivery Slot</Text>

      {/* If deliverySlots is empty, display a message */}
      {deliverySlots.length === 0 ? (
        <Text>No delivery slots available</Text>
      ) : (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {deliverySlots.map((slot) => (
            <TouchableOpacity
              key={slot}
              onPress={() => {
                setSelectedSlot(slot);
                setTimeRemaining(30 * 60); // Reset timer on slot change
              }}
              style={[
                styles.slotChip,
                selectedSlot === slot && styles.slotChipActive,
              ]}
            >
              <Text
                style={[
                  styles.slotChipText,
                  selectedSlot === slot && styles.slotChipTextActive,
                ]}
              >
                {slot}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      {/* Show Countdown Timer if ASAP is selected */}
      {selectedSlot === 'ASAP (30 mins)' && (
        <Text style={styles.timerText}>
          {timeRemaining > 0
            ? `Time Remaining: ${formatTime(timeRemaining)}`
            : 'ASAP Delivery Available!'}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 10,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  slotChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#f1f1f1',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  slotChipActive: {
    backgroundColor: '#00b894',
  },
  slotChipText: {
    color: '#555',
    fontSize: 14,
  },
  slotChipTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  timerText: {
    fontSize: 14,
    color: '#ff6347',
    marginTop: 10,
    fontWeight: 'bold',
  },
});

export default DeliverySlotPicker;
