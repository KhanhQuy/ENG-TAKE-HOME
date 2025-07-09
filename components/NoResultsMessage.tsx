import { View, Text } from 'react-native';

export default function NoResultsMessage() {
  return (
    <View className="justify-center items-center py-12 px-4">
      <Text className="text-gray-500 text-lg text-center font-medium mb-2">
        There are no movies that matched your query.
      </Text>
      <Text className="text-gray-400 text-sm text-center">
        Try searching for a different movie title.
      </Text>
    </View>
  );
} 