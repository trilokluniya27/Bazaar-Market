import React from 'react';
import {View, TouchableOpacity, Text, Animated} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useEffect, useRef} from 'react';

import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import SignupScreen from '../Screens/User Authentication Screens/SignupScreen';
import SignInScreen from '../Screens/User Authentication Screens/SignInScreen';

import SearchScreen from '../Screens/Bottom Tab Screens/Bottom Tab Search Screen/SearchScreen';
import CategoryScreen from '../Screens/Bottom Tab Screens/Bottom Tab Plus Screen/CategoryScreen';
import AccountScreen from '../Screens/Bottom Tab Screens/Bottom Tab Account Screen/AccountScreen';
import MyOrderScreen from '../Screens/Bottom Tab Screens/Bottom Tab My Order Screen/MyOrderScreen';

import SplashScreen1 from '../Screens/Splash Screens/SplashScreen1';

import HomeScreen from '../Screens/Bottom Tab Screens/Bottom Tab Home Screen/HomeScreen';

import BarcodeScannerScreen from '../Screens/Bottom Tab Screens/Bottom Tab Home Components/BarcodeScannerScreen';
import CartIconWithBadge from '../Screens/Bottom Tab Screens/Bottom Tab Home Components/CartIconWithBadge';

import OrderSuccessScreen from '../Screens/Stack Screens/Order Success Screen/OrderSuccessScreen';
import PaymentPage from '../Screens/Stack Screens/Payment Page Screen/PaymentPage';

import CheckoutScreen from '../Screens/Stack Screens/Checkout Screen/CheckoutScreen';
import CartScreen from '../Screens/Stack Screens/Cart Screen/CartScreen';
import SelectAddressScreen from '../Screens/Stack Screens/Address Screen/SelectAddressScreen';


import AllProductsScreen from '../Screens/Bottom Tab Screens/Bottom Tab Home Components/AllProductsScreen';
import CategoryProductsScreen from '../Screens/Stack Screens/Category Products Screen/CategoryProductsScreen';
import InvoiceScreen from '../Screens/Stack Screens/Invoice Screen/InvoiceScreen';
import OrderTrackScreen from '../Screens/Stack Screens/Order Track Screen/OrderTrackScreen';
import ProductDetail from '../Screens/Stack Screens/Cart Screen/Cart Screen Components/ProductDetail';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// 🔹 Custom Animated Tab Bar with Top Border Animation
const CustomTabBar = ({state, descriptors, navigation}) => {
  const borderAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(borderAnim, {
      toValue: state.index * 83, // Moves the border to the active tab
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [state.index]);

  return (
    <View
      style={{
        height: 70, // ✅ Missing comma added here
        backgroundColor: 'rgb(255, 255, 255)', // Light transparent background
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 10,
        position: 'relative',
        borderTopWidth: 1,
        borderColor: '#ddd',
      }}>
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          left: borderAnim,
          width: 75,
          height: 4,
          backgroundColor: '#734f96',
          borderRadius: 2,
        }}
      />

      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label = options.tabBarLabel ?? route.name;
        const isFocused = state.index === index;

        const iconSize = isFocused ? 24 : 20;
        const iconColor = isFocused ? '#734f96' : 'gray';

        const IconComponent = () => {
          switch (route.name) {
            case 'Home':
              return (
                <Icon name="home-outline" size={iconSize} color={iconColor} />
              );
            case 'Search':
              return <Icon name="search" size={iconSize} color={iconColor} />;
            case 'Categories':
              return (
                <Icon name="grid-outline" size={iconSize} color={iconColor} />
              );
            case 'My Order':
              return (
                <Icon name="bag-outline" size={iconSize} color={iconColor} />
              );
            case 'Account':
              return (
                <MaterialCommunityIcons
                  name="account-outline"
                  size={iconSize}
                  color={iconColor}
                />
              );
            default:
              return <Icon name="circle" size={iconSize} color={iconColor} />;
          }
        };
        return (
          <TouchableOpacity
            key={index}
            onPress={() => navigation.navigate(route.name)}
            style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
            {IconComponent()}
            <Text style={{color: iconColor, fontSize: isFocused ? 14 : 12}}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
function BottomNavigator() {
  return (
    <Tab.Navigator tabBar={props => <CustomTabBar {...props} />}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerRight: () => <CartIconWithBadge />,
          title: 'Bazzar Market',
        }}
      />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen
        name="Categories"
        component={CategoryScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen name="My Order" component={MyOrderScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
}

const AllNestedNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Splash1">
      <Stack.Screen
        name="Splash1"
        options={{headerShown: false}}
        component={SplashScreen1}
      />
      <Stack.Screen name="SignUp" component={SignupScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen
        name="BottomScreen"
        options={{headerShown: false}}
        component={BottomNavigator}
      />
      <Stack.Screen name="BarcodeScanner" component={BarcodeScannerScreen} />
      <Stack.Screen name="Cart Screen" component={CartScreen} />
      <Stack.Screen
        name="Select Delivery Address"
        component={SelectAddressScreen}
      />
      <Stack.Screen name="CheckoutScreens" component={CheckoutScreen} />
      <Stack.Screen name="PaymentPage" component={PaymentPage} />
      <Stack.Screen name="OrderSuccessScreen" component={OrderSuccessScreen} />
      
      <Stack.Screen
        name="AllProductsScreen"
        component={AllProductsScreen}
        options={{title: 'Hot deals'}}
      />
      <Stack.Screen
        name="CategoryProducts"
        component={CategoryProductsScreen}
        options={{title: 'Products'}}
      />
      <Stack.Screen name="InvoiceScreen" component={InvoiceScreen} />
      <Stack.Screen name="OrderTrackScreen" component={OrderTrackScreen} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
    </Stack.Navigator>
  );
};
export default AllNestedNavigation;