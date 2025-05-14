import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

type Props = {
  title: string;
  onPress: () => void;
}

export const ButtonComponent = ({ title, onPress }: Props) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    width: '100%',
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});