import { TextInput } from 'react-native';

interface SearchInputProps {
  value: string;
  onChangeText: (text: string) => void;
}

export default function SearchInput({ value, onChangeText }: SearchInputProps) {
  return (
    <TextInput
      className="border border-blue-200 rounded-lg px-3 py-2 mb-4 w-64 text-base bg-white shadow"
      placeholder="Search for a movie..."
      placeholderTextColor="#888"
      value={value}
      onChangeText={onChangeText}
      style={{ textAlign: 'center' }}
    />
  );
} 