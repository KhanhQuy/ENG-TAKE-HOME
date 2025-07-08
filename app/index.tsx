import { Stack } from 'expo-router';
import { View, Text, TextInput, Image, ScrollView, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import { searchMovies, Movie } from '../utils/tmdb';

export default function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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

  return (
    <>
      <Stack.Screen options={{ title: 'Welcome' }} />
      <View className="flex-1 items-center justify-center ">
        <TextInput
          className="border border-gray-300 rounded px-4 py-2 mb-4 w-64"
          placeholder="Search for a movie..."
          value={query}
          onChangeText={setQuery}
        />
        {loading && <ActivityIndicator size="small" color="#888" />}
        {error ? <Text className="text-red-500">{error}</Text> : null}
        <ScrollView className="w-64 max-h-96">
          {results.map((movie: Movie) => (
            <View key={movie.id} className="flex-row items-center mb-2">
              {movie.poster_path ? (
                <Image
                  source={{ uri: `https://image.tmdb.org/t/p/w92${movie.poster_path}` }}
                  style={{ width: 46, height: 69, borderRadius: 4, marginRight: 8 }}
                />
              ) : null}
              <Text className="flex-1">{movie.title}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </>
  );
}
