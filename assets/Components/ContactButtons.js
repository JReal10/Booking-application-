import React from 'react';
import { Text, View, StyleSheet, Pressable,Dimensions } from 'react-native';
import colors from '../Colors/colors';

const { width, height } = Dimensions.get('window');

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
    paddingVertical: height * 0.01,
    marginHorizontal:width * 0.29,
    borderRadius: 8,
    elevation: 3,
    backgroundColor: colors.secondary_green,
  },
  text: {
    fontSize: height * 0.02,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: colors.text_white,
  },
});