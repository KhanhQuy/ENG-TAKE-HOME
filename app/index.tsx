import { Stack } from 'expo-router';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import { searchMovies, Movie } from '../utils/tmdb';
import MovieListItem from '../components/MovieListItem';
import MovieModal from '../components/MovieModal';
import SearchInput from '../components/SearchInput';
import NoResultsMessage from '../components/NoResultsMessage';

export default function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (query.trim()) {
        setLoading(true);
        setError('');
        searchMovies(query)
          .then(setResults)
          .catch(() => setError('Failed to fetch movies'))
          .finally(() => setLoading(false));
      } else {
        setResults([]);
      }
    }, 500); // debounce 500ms
    return () => clearTimeout(handler);
  }, [query]);

  const openModal = (movie: Movie) => {
    setSelectedMovie(movie);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedMovie(null);
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Movie Search' }} />
      <View className="flex-1 items-center justify-start pt-6 bg-gray-100">
        <Text className="text-2xl font-bold mb-4 text-blue-700">Movie Search</Text>
        
        <SearchInput value={query} onChangeText={setQuery} />
        
        {loading && <ActivityIndicator size="small" color="#2563eb" className="mb-2" />}
        {error ? <Text className="text-red-500 text-sm mb-2">{error}</Text> : null}
        
        {/* No results message */}
        {!loading && !error && query.trim() && results.length === 0 && (
          <NoResultsMessage />
        )}
        
        {/* Results list */}
        {results.length > 0 && (
          <ScrollView 
            className="w-full max-w-md" 
            contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: 8 }}
            showsVerticalScrollIndicator={false}
          >
            {results.map((movie: Movie) => (
              <MovieListItem key={movie.id} movie={movie} onPress={openModal} />
            ))}
          </ScrollView>
        )}
        
        <MovieModal 
          visible={modalVisible} 
          movie={selectedMovie} 
          onClose={closeModal} 
        />
      </View>
    </>
  );
}
