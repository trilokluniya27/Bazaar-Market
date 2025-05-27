import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const SearchBar = ({ voiceText, setVoiceText, startVoice, onBarcodePress }) => (
  <View style={styles.searchWrapper}>
    <MaterialIcons name="search" size={25} color="black" />
    <TextInput
      placeholder="Search Products...."
      value={voiceText}
      onChangeText={setVoiceText}
      style={styles.searchInput}
    />
    <TouchableOpacity style={{ marginRight: 17 }} onPress={startVoice}>
      <MaterialIcons name="settings-voice" size={25} color="black" />
    </TouchableOpacity>
    <TouchableOpacity style={{ marginRight: 7 }} onPress={onBarcodePress}>
      <MaterialIcons name="qr-code-scanner" size={25} color="black" />
    </TouchableOpacity>
  </View>
);



const styles = StyleSheet.create({
  searchWrapper: {
    paddingRight: 5,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    backgroundColor: '#ffffff',
    borderRadius: 3,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    padding: 12,
  },
});
export default SearchBar;