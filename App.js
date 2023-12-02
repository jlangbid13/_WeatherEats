import AppNavigation from './src/navigation';
import { FavoritesProvider } from './src/screens/FavoritesContext';

export default function App() {
  return (
    <FavoritesProvider>
      <AppNavigation />
    </FavoritesProvider>
  );
}