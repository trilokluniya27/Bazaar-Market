import React, { useState, useRef } from 'react';
import { View, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { RNCamera } from 'react-native-camera';
import ProductDetailBottomSheet from './ProductDetailBottomSheet';


const BarcodeScannerScreen = ({ navigation }) => {
  const [scanned, setScanned] = useState(false);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const bottomSheetRef = useRef(null);

  const onBarCodeRead = async (event) => {
    if (scanned) return;
    setScanned(true);
    setLoading(true);

    const barcode = event.data;
    try {
      const response = await fetch(
        `https://ddottt6z7ccpe0a-apexdb.adb.me-jeddah-1.oraclecloudapps.com/ords/otrix/oc_pos_item_barcodes_v/?q={"barcode":"${barcode}"}`
      );
      const json = await response.json();

      if (json.items && json.items.length > 0) {
        const item = json.items[0];
        const matchedProduct = {
          id: item.item_id,
          title: item.item_name,
          price: item.price|| '10',
          mrp: item.mrp || item.price,
          image: { uri: item.image_path || 'https://i.pinimg.com/736x/09/09/46/09094699eebb653e821c69fadb107153.jpg' },
        };
        setProduct(matchedProduct);
        setLoading(false);
        setTimeout(() => bottomSheetRef.current?.open(), 300);
      } else {
        Alert.alert('Not Found', 'Koi product nahi mila is barcode ke liye.');
        navigation.goBack();
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Product fetch karte waqt error aaya.');
      navigation.goBack();
    }
  };

  const handleAddToCart = (product) => {
    // TODO: Cart add logic
    Alert.alert('Added to Cart', `${product.title} cart me add ho gaya.`);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {loading && (
        <ActivityIndicator size="large" color="#f44" style={styles.loader} />
      )}
      <RNCamera
        style={styles.camera}
        onBarCodeRead={onBarCodeRead}
        captureAudio={false}
        type={RNCamera.Constants.Type.back}
        androidCameraPermissionOptions={{
          title: 'Camera Permission',
          message: 'Barcode scan karne ke liye camera chahiye',
          buttonPositive: 'OK',
          buttonNegative: 'Cancel',
        }}
      />
      <ProductDetailBottomSheet
        ref={bottomSheetRef}
        product={product}
        onAddToCart={handleAddToCart}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: { flex: 1, width: '100%' },
  loader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -20 }, { translateY: -20 }],
    zIndex: 10,
  },
});

export default BarcodeScannerScreen;
