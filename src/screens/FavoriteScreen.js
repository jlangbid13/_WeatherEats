// FavoritesScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';


const FavoriteScreen = ({ route }) => {
  const { favorites } = route.params || [];
  const favoriteItems = Array.isArray(favorites) ? favorites : [];
  const navigation = useNavigation();

  const handleFavoriteItemClick = (item) => {
    // Navigate to the detailed recipe screen with the selected favorite item
    navigation.navigate('RecipeDetail', { ...item });
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={true}
      onRequestClose={() => { navigation.goBack() }}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Favorites</Text>
        <ScrollView>
          {favoriteItems.length > 0 ? (
            favoriteItems.map((favorite) => (
              <TouchableOpacity
                key={favorite.id}
                onPress={() => navigation.push('RecipeDetail', { ...favorite })}
                style={styles.favoriteItem}
              >
                <Image
                  source={{ uri: favorite.image }}
                  style={styles.favoriteImage}
                />
                <Text>{favorite.Name}</Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.noFavoritesText}>No favorites available.</Text>
          )}
        </ScrollView>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBackButton}>
          <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="#0077B6" />
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  favoriteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  favoriteImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  noFavoritesText: {
    textAlign: 'center',
    marginTop: 10,
  },
  goBackButton: {
    marginTop: 20,
    alignItems: 'center',
  },
});

export default FavoriteScreen;
