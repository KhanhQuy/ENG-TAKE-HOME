import { Stack } from 'expo-router';
import { View, Text, TextInput, Image, ScrollView, ActivityIndicator, Modal, Pressable } from 'react-native';
import { useState, useEffect } from 'react';
import { searchMovies, Movie } from '../utils/tmdb';

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
        <TextInput
          className="border border-blue-200 rounded-lg px-3 py-2 mb-4 w-64 text-base bg-white shadow"
          placeholder="Search for a movie..."
          placeholderTextColor="#888"
          value={query}
          onChangeText={setQuery}
        />
        {loading && <ActivityIndicator size="small" color="#2563eb" className="mb-2" />}
        {error ? <Text className="text-red-500 text-sm mb-2">{error}</Text> : null}
        <ScrollView className="w-full max-w-md px-1" contentContainerStyle={{ paddingBottom: 20 }}>
          {results.map((movie: Movie) => (
            <Pressable key={movie.id} onPress={() => openModal(movie)}>
              <View className="flex-row items-center mb-3 p-2 bg-white rounded-lg shadow border border-blue-50">
                {movie.poster_path ? (
                  <Image
                    source={{ uri: `https://image.tmdb.org/t/p/w92${movie.poster_path}` }}
                    style={{ width: 40, height: 60, borderRadius: 6, marginRight: 8 }}
                  />
                ) : null}
                <View className="flex-1">
                  <Text className="font-bold text-base mb-0.5 text-blue-800">{movie.title}</Text>
                  <Text className="text-xs text-gray-600 mb-0.5">Release: {movie.release_date || 'N/A'}</Text>
                  <Text className="text-xs text-gray-600 mb-0.5">Rating: {movie.vote_average || 'N/A'}</Text>
                  <Text className="text-xs text-gray-700" numberOfLines={2}>{movie.overview || 'No description.'}</Text>
                </View>
              </View>
            </Pressable>
          ))}
        </ScrollView>
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={closeModal}
        >
          <View className="flex-1 justify-center items-center bg-black bg-opacity-60">
            <View className="bg-white p-4 rounded-lg w-11/12 max-w-xs shadow border border-blue-100">
              {selectedMovie && (
                <>
                  {selectedMovie.poster_path && (
                    <Image
                      source={{ uri: `https://image.tmdb.org/t/p/w185${selectedMovie.poster_path}` }}
                      style={{ width: 70, height: 105, alignSelf: 'center', borderRadius: 8, marginBottom: 10 }}
                    />
                  )}
                  <Text className="text-lg font-bold mb-2 text-center text-blue-800">{selectedMovie.title}</Text>
                  <Text className="text-base text-gray-700 mb-1 text-center">Release: {selectedMovie.release_date || 'N/A'}</Text>
                  <Text className="text-base text-gray-700 mb-2 text-center">Rating: {selectedMovie.vote_average || 'N/A'}</Text>
                  <Text className="mb-3 text-xs text-center text-gray-800">{selectedMovie.overview || 'No description.'}</Text>
                  <Pressable onPress={closeModal} className="bg-blue-700 rounded px-4 py-2 self-center">
                    <Text className="text-white font-bold text-base">Close</Text>
                  </Pressable>
                </>
              )}
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
}
