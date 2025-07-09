import { View, Text, Image, Modal, Pressable, ScrollView } from 'react-native';
import { Movie } from '../utils/tmdb';

interface MovieModalProps {
  visible: boolean;
  movie: Movie | null;
  onClose: () => void;
}

export default function MovieModal({ visible, movie, onClose }: MovieModalProps) {
  if (!movie) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black bg-opacity-60 px-4">
        <View className="bg-white p-6 rounded-xl w-full max-w-sm shadow-lg border border-blue-100">
          <ScrollView showsVerticalScrollIndicator={false}>
            {movie.poster_path && (
              <Image
                source={{ uri: `https://image.tmdb.org/t/p/w185${movie.poster_path}` }}
                style={{ width: 80, height: 120, alignSelf: 'center', borderRadius: 8, marginBottom: 12 }}
              />
            )}
            <Text className="text-xl font-bold mb-4 text-center text-blue-800">{movie.title}</Text>
            
            {/* Original Title */}
            {movie.original_title && movie.original_title !== movie.title && (
              <Text className="text-sm text-gray-600 mb-2 text-center italic">
                Original: {movie.original_title}
              </Text>
            )}
            
            {/* Release Date */}
            <View className="flex-row justify-between items-center mb-2 bg-gray-50 p-2 rounded">
              <Text className="font-semibold text-gray-700">Release Date:</Text>
              <Text className="text-gray-600">{movie.release_date || 'N/A'}</Text>
            </View>
            
            {/* Rating */}
            <View className="flex-row justify-between items-center mb-2 bg-gray-50 p-2 rounded">
              <Text className="font-semibold text-gray-700">Rating:</Text>
              <Text className="text-gray-600">⭐ {movie.vote_average?.toFixed(1) || 'N/A'}</Text>
            </View>
            
            {/* Vote Count */}
            <View className="flex-row justify-between items-center mb-2 bg-gray-50 p-2 rounded">
              <Text className="font-semibold text-gray-700">Votes:</Text>
              <Text className="text-gray-600">{movie.vote_count?.toLocaleString() || 'N/A'}</Text>
            </View>
            
            {/* Popularity */}
            <View className="flex-row justify-between items-center mb-2 bg-gray-50 p-2 rounded">
              <Text className="font-semibold text-gray-700">Popularity:</Text>
              <Text className="text-gray-600">🔥 {movie.popularity?.toFixed(1) || 'N/A'}</Text>
            </View>
            
            {/* Language */}
            <View className="flex-row justify-between items-center mb-2 bg-gray-50 p-2 rounded">
              <Text className="font-semibold text-gray-700">Language:</Text>
              <Text className="text-gray-600 text-uppercase">{movie.original_language || 'N/A'}</Text>
            </View>
            
            {/* Adult Content Warning */}
            {movie.adult && (
              <View className="mb-2 bg-red-50 p-2 rounded border border-red-200">
                <Text className="text-red-600 text-sm text-center font-semibold">⚠️ Adult Content</Text>
              </View>
            )}
            
            {/* Overview */}
            <View className="mb-3">
              <Text className="font-semibold text-gray-700 mb-1">Overview:</Text>
              <Text className="text-sm text-gray-800 leading-5">
                {movie.overview || 'No description available.'}
              </Text>
            </View>
            
            {/* Genre IDs (if available) */}
            {movie.genre_ids && movie.genre_ids.length > 0 && (
              <View className="mb-3">
                <Text className="font-semibold text-gray-700 mb-1">Genres:</Text>
                <Text className="text-sm text-gray-600">
                  {movie.genre_ids.join(', ')}
                </Text>
              </View>
            )}
          </ScrollView>
          
          <Pressable onPress={onClose} className="bg-blue-700 rounded px-4 py-2 self-center mt-3">
            <Text className="text-white font-bold text-base">Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
} 