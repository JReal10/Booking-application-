import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import colors from '../Colors/colors';
import useFonts from '../Hooks/useFonts';
import AppLoading from 'expo-app-loading';
import { useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const windowWidth = Dimensions.get('window').width;
const windowWidth80 = (windowWidth * 0.85);

export default function Button(props) {
  const { onPress, title = 'Save',backgroundColor, size,logo} = props;

  const [IsReady, SetIsReady] = useState(false);

  const FetchFonts = async () => {
    await useFonts();
  };

  if (!IsReady) {
    return (
      <AppLoading
        startAsync={FetchFonts}
        onFinish={() => SetIsReady(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

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
    <FontAwesome style = {styles.LogoWrapper} name = {logo} size = {28}/>
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
    paddingVertical: 20,
    paddingHorizontal: 24,
    width: windowWidth80,
    shadowColor: colors.text_brown,
    shadowOpacity: 0.5,
    elevation: 5,
  },
  appButtonText: {
    fontSize: 20,
    flex: 1,
    textAlign: 'center',
    color: "#fff",
    fontWeight: "bold",
    color:colors.text_brown,
    fontFamily:'Poppins-SemiBold'
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
  LogoWrapper:
  {
    color:'white',
  },
});