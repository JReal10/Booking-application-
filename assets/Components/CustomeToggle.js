import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import colors from '../Colors/colors';

export default function CustomToggle(props) {
  const {title = 'Save' } = props;
  return (
    <TouchableOpacity style={styles.button} onPress={props.toggleSwitch}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    paddingVertical: 20,
    marginTop:20,
    borderRadius: 23,
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