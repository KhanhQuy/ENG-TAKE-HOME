import { View, Text, Image, Pressable } from 'react-native';
import { Movie } from '../utils/tmdb';

interface MovieListItemProps {
  movie: Movie;
  onPress: (movie: Movie) => void;
}

export default function MovieListItem({ movie, onPress }: MovieListItemProps) {
  return (
    <Pressable onPress={() => onPress(movie)} testID="movie-list-item">
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12, padding: 12, backgroundColor: 'white', borderRadius: 8, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4, borderWidth: 1, borderColor: '#e0e7ff', marginHorizontal: 8 }}>
        {movie.poster_path ? (
          <Image
            source={{ uri: `https://image.tmdb.org/t/p/w92${movie.poster_path}` }}
            style={{ width: 45, height: 68, borderRadius: 8, marginRight: 12 }}
          />
        ) : null}
        <View style={{ flex: 1 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 4, color: '#1e40af' }}>{movie.title}</Text>
          <Text style={{ fontSize: 12, color: '#4b5563', marginBottom: 4 }}>Release: {movie.release_date || 'N/A'}</Text>
          <Text style={{ fontSize: 12, color: '#4b5563', marginBottom: 4 }}>Rating: {movie.vote_average || 'N/A'}</Text>
          <Text style={{ fontSize: 12, color: '#374151', lineHeight: 16 }} numberOfLines={2}>{movie.overview || 'No description.'}</Text>
        </View>
      </View>
    </Pressable>
  );
} 