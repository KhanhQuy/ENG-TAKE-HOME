import { TextInput, StyleSheet } from 'react-native';

interface SearchInputProps {
  value: string;
  onChangeText: (text: string) => void;
}

export default function SearchInput({ value, onChangeText }: SearchInputProps) {
  return (
    <TextInput
      style={[styles.input, { textAlign: 'center' }]}
      placeholder="Search for a movie..."
      placeholderTextColor="#888"
      value={value}
      onChangeText={onChangeText}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#bfdbfe', // blue-200
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 16,
    width: 256,
    fontSize: 16,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
}); 