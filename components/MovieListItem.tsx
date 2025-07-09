import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { Movie } from '../utils/tmdb';

interface MovieListItemProps {
  movie: Movie;
  onPress: (movie: Movie) => void;
}

export default function MovieListItem({ movie, onPress }: MovieListItemProps) {
  return (
    <Pressable onPress={() => onPress(movie)}>
      <View style={styles.container}>
        {movie.poster_path ? (
          <Image
            source={{ uri: `https://image.tmdb.org/t/p/w92${movie.poster_path}` }}
            style={styles.poster}
          />
        ) : null}
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.meta}>Release: {movie.release_date || 'N/A'}</Text>
          <Text style={styles.meta}>Rating: {movie.vote_average || 'N/A'}</Text>
          <Text style={styles.overview} numberOfLines={2}>{movie.overview || 'No description.'}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    padding: 12,
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#dbeafe',
    marginHorizontal: 8,
  },
  poster: {
    width: 45,
    height: 68,
    borderRadius: 8,
    marginRight: 12,
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
    color: '#1e40af',
  },
  meta: {
    fontSize: 12,
    color: '#4b5563',
    marginBottom: 4,
  },
  overview: {
    fontSize: 12,
    color: '#374151',
    lineHeight: 16,
  },
}); 