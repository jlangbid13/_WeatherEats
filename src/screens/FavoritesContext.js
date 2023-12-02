// FavoritesContext.js
import React, { createContext, useContext, useState } from 'react';

// Create the context
const FavoritesContext = createContext();

// Create the provider
const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    const addToFavorites = (item) => {
        setFavorites([...favorites, item]);
    };

    const removeFromFavorites = (itemId) => {
        setFavorites(favorites.filter((item) => item.id !== itemId));
    };

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites, setFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

// Create a custom hook for using the context
const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

export { FavoritesProvider, useFavorites, FavoritesContext };