import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import colors from '../Colors/colors';

const windowWidth = Dimensions.get('window').width;
const windowWidth80 = (windowWidth * 0.85);
const windowHeight = (Dimensions.get('window').height) * 0.022;

export default function Button(props) {
  const { onPress, title = 'Save',backgroundColor, size,fontFamilly} = props;

  return (
    <TouchableOpacity
    onPress={onPress}
    style={[
      styles.appButtonContainer,
      size === "sm" && {
        paddingHorizontal: 8,
        paddingVertical: 6,
        elevation: 6,
      },
      backgroundColor && { backgroundColor }
    ]}
  >
    <View style = {styles.ButtonWrapper}>
    <Text style={[styles.appButtonText, size === "sm" && { fontSize: 14 }]}>
      {title}
    </Text>
    </View>
    

  </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: windowHeight,
    paddingHorizontal: 24,
    width: windowWidth80
  },
  appButtonText: {
    fontSize: 18,
    flex: 1,
    textAlign: 'center',
    color: "#fff",
    fontWeight: "bold",

  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: colors.text_white,
  },
  ButtonWrapper:
  {
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'row',
  },
});