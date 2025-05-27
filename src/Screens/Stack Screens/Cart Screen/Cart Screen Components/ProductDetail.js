import React, { useContext, useState } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CartContext } from '../../../Custom Component Screens/CartContext';

const ProductDetail = ({ route }) => {
    const { product } = route.params;
    const { addToCart, getCartItemQuantity } = useContext(CartContext);
    const navigation = useNavigation();

    const itemId = product.item_id || product.id;
    const cartQty = getCartItemQuantity(itemId);
    const [quantity, setQuantity] = useState(cartQty || 1);
    const [isInCart, setIsInCart] = useState(cartQty > 0);


    const handleIncrement = () => {
        setQuantity(q => q + 1);
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(q => q - 1);
        } else {
            setIsInCart(false);
            setQuantity(1);
        }
    };

    const handleAddToCart = () => {
        const itemToAdd = {
            ...product,
            item_id: itemId,
            quantity: quantity,
        };
        addToCart(itemToAdd);
        setIsInCart(true);
    };



    const handleBuyNow = () => {
        const itemToBuy = {
            ...product,
            item_id: itemId,
            quantity: isInCart ? quantity : 1,
        };
        addToCart(itemToBuy);
        navigation.navigate('Cart Screen');
    };



    return (
        <SafeAreaView style={styles.safe}>
            <ScrollView style={styles.scroll}>
                <Image source={{ uri: product.item_image || product.image_path }} style={styles.image} />
                <View style={styles.content}>
                    <Text style={styles.name}>{product.item_name}</Text>
                    <Text style={styles.price}>₹{product.price}</Text>
                    <Text style={styles.mrp}>MRP: ₹{(product.price * 1.2).toFixed(0)}</Text>
                    <Text style={styles.discount}>20% OFF</Text>
                </View>
            </ScrollView>

            <View style={styles.bottomBar}>
                {isInCart ? (
                    <View style={styles.qtyControlBar}>
                        <TouchableOpacity onPress={handleDecrement} style={styles.qtyBtn}>
                            <Text style={styles.qtyText}>−</Text>
                        </TouchableOpacity>
                        <Text style={styles.qtyValue}>{quantity}</Text>
                        <TouchableOpacity onPress={handleIncrement} style={styles.qtyBtn}>
                            <Text style={styles.qtyText}>＋</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <TouchableOpacity style={styles.addCartBtn} onPress={handleAddToCart}>
                        <Text style={styles.btnText}>ADD TO CART</Text>
                    </TouchableOpacity>
                )}

                <TouchableOpacity style={styles.buyNowBtn} onPress={handleBuyNow}>
                    <Text style={styles.btnText}>BUY NOW</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default ProductDetail;

const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: '#fff' },
    scroll: { flex: 1 },
    image: {
        width: '100%',
        height: 300,
        resizeMode: 'contain',
        backgroundColor: '#fff',
    },
    content: {
        padding: 16,
        backgroundColor: '#f9f9f9',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        marginTop: -10,
    },
    name: { fontSize: 18, fontWeight: 'bold', marginBottom: 6 },
    price: { fontSize: 20, fontWeight: 'bold', color: '#0aaf60', marginBottom: 4 },
    mrp: { fontSize: 16, color: '#555', textDecorationLine: 'line-through' },
    discount: { color: '#d32f2f', fontWeight: 'bold' },
    bottomBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 12,
        borderTopWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#fff',
    },
    addCartBtn: {
        flex: 1,
        backgroundColor: '#ffa000',
        padding: 12,
        marginRight: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    buyNowBtn: {
        flex: 1,
        backgroundColor: '#fb641b',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    btnText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
    qtyControlBar: {
        flex: 1,
        marginRight: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 16,
        paddingVertical: 10,
    },
    qtyBtn: {
        backgroundColor: '#ddd',
        paddingHorizontal: 16,
        paddingVertical: 5,
        borderRadius: 5,
    },
    qtyText: { fontSize: 20, fontWeight: 'bold' },
    qtyValue: { fontSize: 18, fontWeight: 'bold', minWidth: 24, textAlign: 'center' },
});