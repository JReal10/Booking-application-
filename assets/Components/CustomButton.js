import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';

const { width, height } = Dimensions.get('window');

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
    paddingVertical: height * 0.022,
    paddingHorizontal: width * 0.02,
    width: width * 0.85
  },
  appButtonText: {
    fontSize: height * 0.02,
    flex: 1,
    textAlign: 'center',
    color: "#fff",
    fontWeight: "bold",

  },
  ButtonWrapper:
  {
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'row',
  },
});