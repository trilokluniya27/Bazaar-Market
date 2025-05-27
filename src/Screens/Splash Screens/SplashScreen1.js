
import React, { useState, useEffect } from 'react';
import { View, Image } from 'react-native';

const SplashScreen1 = ({ navigation }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      navigation.navigate('BottomScreen');
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:'white' }}>
      {isVisible && ( 
        <Image
        source={require('../../Images/Splash1.jpeg')}
        style={{ width: '100%', height: '50%' }} />
      )}
    </View>
  );
};

export default SplashScreen1;