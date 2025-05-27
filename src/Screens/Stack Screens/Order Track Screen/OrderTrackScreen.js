import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import StepIndicator from 'react-native-step-indicator';

const labels = ['Order Placed', 'Packed', 'Shipped', 'Out for Delivery', 'Delivered'];
const customStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 35,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#4CAF50',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#4CAF50',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#4CAF50',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#4CAF50',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#2196F3',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 14,
  stepIndicatorLabelCurrentColor: '#fff',
  stepIndicatorLabelFinishedColor: '#fff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: '#2196F3',
};

const OrderTrackScreen = () => {
  const currentStep = 2; // 🛠 Update dynamically if needed

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📦 Track Your Order</Text>
      <StepIndicator
        customStyles={customStyles}
        currentPosition={currentStep}
        labels={labels}
        stepCount={labels.length}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0D47A1',
    marginBottom: 20,
  },
});

export default OrderTrackScreen;
