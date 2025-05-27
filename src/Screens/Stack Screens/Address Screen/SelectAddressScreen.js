import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SelectAddressScreen = ({ navigation }) => {
  const address = {
    title: 'Vikas nagar',
    type: 'HOME',
    details: '159 LIG shankar , Vikas nagar, Dewas 455001',
    name: 'Trilok lunia',
    phone: '8224054220',
    distance: '500m away from your current location',
  };

  const handleSelectAddress = () => {
    navigation.navigate('CheckoutScreens', { selectedAddress: address });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Select Delivery Address</Text>

      <TouchableOpacity style={styles.addNewBtn}>
        <Text style={styles.addNewText}>+ Add new address</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>Or</Text>
      <Text style={styles.selectSaved}>Select from saved addresses</Text>

      <View style={styles.addressCardWrapper}>
        <Text style={styles.sectionTitle}>Current Delivery Address</Text>
        <TouchableOpacity
          onPress={handleSelectAddress}>
          <View style={styles.addressCard}>
            <View style={styles.addressRow}>
              <Icon name="map-marker-outline" size={22} color="#333" style={{ marginRight: 8 }} />
              <Text style={styles.addressTitle}>{address.title}</Text>
              <Text style={styles.typeTag}>{address.type}</Text>
            </View>
            <Text style={styles.addressDetails}>{address.details}</Text>
            <Text style={styles.name}>{address.name}</Text>
            <Text style={styles.phone}>{address.phone}</Text>

            <TouchableOpacity style={styles.editBtn}>
              <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>

            <Text style={styles.distance}>{address.distance}</Text>
          </View>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  addNewBtn: {
    borderWidth: 1.5,
    borderColor: '#E91E63',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 12,
  },
  addNewText: {
    color: '#E91E63',
    fontWeight: '600',
    fontSize: 16,
  },
  orText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#999',
  },
  selectSaved: {
    textAlign: 'center',
    fontSize: 16,
    marginVertical: 8,
    color: '#333',
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
    color: '#444',
  },
  addressCardWrapper: {
    marginTop: 8,
  },
  addressCard: {
    borderWidth: 1.2,
    borderColor: '#E91E63',
    borderRadius: 10,
    padding: 14,
    backgroundColor: '#fff',
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  addressTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 6,
  },
  typeTag: {
    backgroundColor: '#eee',
    color: '#666',
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  addressDetails: {
    fontSize: 14,
    color: '#555',
    marginVertical: 4,
  },
  name: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
  },
  phone: {
    fontSize: 14,
    color: '#444',
    marginBottom: 10,
  },
  editBtn: {
    borderWidth: 1,
    borderColor: '#E91E63',
    paddingHorizontal: 16,
    paddingVertical: 5,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  editText: {
    color: '#E91E63',
    fontWeight: '600',
    fontSize: 14,
  },
  distance: {
    marginTop: 10,
    color: '#007bff',
    fontSize: 13,
  },
});

export default SelectAddressScreen;
