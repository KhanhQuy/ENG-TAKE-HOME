import { View, Text, Image, Pressable } from 'react-native';
import { Movie } from '../utils/tmdb';

interface MovieListItemProps {
  movie: Movie;
  onPress: (movie: Movie) => void;
}

export default function MovieListItem({ movie, onPress }: MovieListItemProps) {
  return (
    <Pressable onPress={() => onPress(movie)}>
      <View className="flex-row items-center mb-3 p-3 bg-white rounded-lg shadow border border-blue-50 mx-2">
        {movie.poster_path ? (
          <Image
            source={{ uri: `https://image.tmdb.org/t/p/w92${movie.poster_path}` }}
            style={{ width: 45, height: 68, borderRadius: 8, marginRight: 12 }}
          />
        ) : null}
        <View className="flex-1">
          <Text className="font-bold text-base mb-1 text-blue-800">{movie.title}</Text>
          <Text className="text-xs text-gray-600 mb-1">Release: {movie.release_date || 'N/A'}</Text>
          <Text className="text-xs text-gray-600 mb-1">Rating: {movie.vote_average || 'N/A'}</Text>
          <Text className="text-xs text-gray-700 leading-4" numberOfLines={2}>{movie.overview || 'No description.'}</Text>
        </View>
      </View>
    </Pressable>
  );
} 