import React from 'react';
import { Text,StyleSheet, Pressable } from 'react-native';
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
    justifyContent: 'center',
    paddingVertical: 9,
    paddingHorizontal:20,
    borderRadius: 8,
    borderColor: colors.secondary_green,
    borderWidth:1.5,
    elevation: 3,
    backgroundColor: colors.backgroundColor,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: colors.secondary_green,
  },
});