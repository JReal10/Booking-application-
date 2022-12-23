import React from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import colors from '../Colors/colors';

export default function Button(props) {
  const { onPress, title = 'Save' } = props;
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal:20,
    borderRadius: 8,
    elevation: 3,
    backgroundColor: colors.secondary_green,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: colors.text_white,
  },
});