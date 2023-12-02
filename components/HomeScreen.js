import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { BookmarkIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import WeatherContainer from './WeatherContainer';

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState('Beef');
  // Your other state variables...

  const handleChangeCategory = (category) => {
    setActiveCategory(category);
  };

  const handleBookmarkPress = () => {
    // Handle bookmark press action here
    console.log('Bookmark icon pressed!');
    // Add your logic for handling the press event
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50, paddingTop: 14, paddingHorizontal: 16 }}
      >
        {/* Avatar and bookmark icon */}
        <View style={styles.header}>
          <Image source={require('../assets/avatar.png')} style={styles.avatar} />
          <TouchableOpacity onPress={handleBookmarkPress}>
            <BookmarkIcon size={30} color="gray" /> {/* Use BookmarkIcon instead of BellIcon */}
          </TouchableOpacity>
        </View>

        {/* Greetings and punchline */}
        <View style={styles.greetings}>
          <Text style={{ fontSize: 16, color: 'black' }}>Hello, Noman!</Text>
          <Text style={styles.boldText}>Make your own food,</Text>
          <Text style={styles.boldText}>
            stay at <Text style={{ color: 'orange' }}>home</Text>
          </Text>
        </View>

        {/* Search bar */}
        

        {/* Weather Container */}
        <View style={styles.middleContent}>
          <WeatherContainer />
        </View>

        {/* Categories */}
        <View>
          {/* Render your categories here */}
        </View>

        {/* Recipes */}
        <View>
          {/* Render your recipes here */}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    height: 40,
    width: 40,
  },
  greetings: {
    marginBottom: 12,
  },
  boldText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    marginBottom: 12,
  },
  input: {
    flex: 1,
    fontSize: 14,
    paddingLeft: 8,
    paddingVertical: 6,
  },
  searchIconContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 6,
  },
  middleContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  // Add more styles as needed...
});
