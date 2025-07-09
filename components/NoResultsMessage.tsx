import { View, Text, StyleSheet } from 'react-native';

export default function NoResultsMessage() {
  return (
    <View style={styles.container}>
      <Text style={styles.mainText}>
        There are no movies that matched your query.
      </Text>
      <Text style={styles.subText}>
        Try searching for a different movie title.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 48,
    paddingHorizontal: 16,
  },
  mainText: {
    color: '#6b7280', // gray-500
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '500',
    marginBottom: 8,
  },
  subText: {
    color: '#9ca3af', // gray-400
    fontSize: 14,
    textAlign: 'center',
  },
}); 