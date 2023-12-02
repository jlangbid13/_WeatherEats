import { View, Text, Image } from 'react-native'
import React, { useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

export default function WelcomeScreen() {

    const ring1padding = useSharedValue(0);
    const ring2padding = useSharedValue(0);

    const navigation = useNavigation();

    useEffect(()=>{
        ring1padding.value = 0;
        ring2padding.value = 0;
        setTimeout(()=> ring1padding.value = withSpring(ring1padding.value+hp(2)), 100);
        setTimeout(()=> ring2padding.value = withSpring(ring2padding.value+hp(4)), 300);

        setTimeout(()=> navigation.navigate('Home'), 2500)
    },[])
  return (
    <View style={{backgroundColor: "#0077B6", flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <StatusBar style="light" />

      {/* logo image with rings */}
      <Animated.View className="bg-white/20 rounded-full" style={{padding: ring2padding}}>
        <Animated.View className="bg-white/20 rounded-full" style={{padding: ring1padding}}>
            <Image source={require('../../assets/images/custom-logo.png')}
                style={{width: hp(30), height: hp(30)}} />
        </Animated.View>
      </Animated.View>

      {/* title and punchline */}
      <View className="flex items-center space-y-2">
        <Text style={{fontSize: hp(7)}} className="font-bold text-white tracking-widest">
            WeatherEats
        </Text>
      </View>
    </View>
  )
}