// WelcomeScreen.js
import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

const WelcomeScreen = () => {
  const ring1padding = useSharedValue(0);
  const ring2padding = useSharedValue(0);

  const navigation = useNavigation();

  useEffect(() => {
    ring1padding.value = 0;
    ring2padding.value = 0;
    setTimeout(() => (ring1padding.value = withSpring(ring1padding.value + hp(5))), 100);
    setTimeout(() => (ring2padding.value = withSpring(ring2padding.value + hp(5.5))), 300);

    setTimeout(() => {
      console.log('Navigating to HomeScreen');
      navigation.navigate('Home');
    }, 2500);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.centerContainer}>
        {/* Logo image with rings */}
        <Animated.View style={[styles.ring, { padding: ring2padding }]}>
          <Animated.View style={[styles.ring, { padding: ring1padding }]}>
            <Image source={require('../assets/WeatherEats.png')} style={styles.logo} />
          </Animated.View>
        </Animated.View>

        {/* Title and punchline */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>WeatherEats</Text>
          <Text style={styles.subtitle}>Food is always right</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffaa00',
    justifyContent: 'center',
  },
  centerContainer: {
    alignItems: 'center',
  },
  ring: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 999,
  },
  logo: {
    width: hp(20),
    height: hp(20),
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(2),
  },
  title: {
    fontSize: hp(7),
    fontWeight: 'bold',
    color: 'white',
    marginBottom: hp(2),
  },
  subtitle: {
    fontSize: hp(2),
    fontWeight: 'medium',
    color: 'white',
  },
});

export default WelcomeScreen;
