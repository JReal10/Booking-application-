import * as React from 'react';
import { Text,View, StyleSheet,SafeAreaView,TouchableOpacity, ImageBackground} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import colors from '../Colors/colors';
import AppLoading from 'expo-app-loading';
import useFonts from '../Hooks/useFonts';
import {useState} from 'react';

function HomeScreen({navigation}){

  const [IsReady, SetIsReady] = useState(false);// initialize state variable refreshing with true

  //A function to load fonts
  const FetchFonts = async () => {
    await useFonts();
  };

  //Loads the font if React Hook "isReady" is true, if not displays loading screen till it's true.
  if (!IsReady) {
    return (
      <AppLoading
        startAsync={FetchFonts}
        onFinish={() => SetIsReady(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  //The UI componenet part of the screen
  return (
    <View style ={styles.Container}>
      <SafeAreaView>
        <TouchableOpacity onPress={() => navigation.navigate('Booking1')}>
          <View style = {styles.ImageContainer}>
            <ImageBackground source = {require('../Images/image23.png')}
            style = {styles.ImageStyle}>
            <View style = {styles.overlayContainer}>
            <View style = {styles.TextContainer}>
            <Text style = {styles.TextStyle}>Book</Text>
            </View>
            <View style = {styles.IconStyle}>
            <FontAwesome5 name = 'arrow-circle-right' size = {40} color = {colors.secondary_green}/>
            </View>
            </View>
            </ImageBackground>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Gallery')}>
          <View style = {styles.ImageContainer2}>
          <ImageBackground source = {require('../Images/image58.png')}
            style = {styles.ImageStyle}>
            <View style = {styles.overlayContainer}>
            <View style = {styles.TextContainer}>
            <Text style = {styles.TextStyle}>Gallery</Text>
            </View>
            <View style = {styles.IconStyle}>
            <FontAwesome5 name = 'arrow-circle-right' size = {40} color = {colors.secondary_green}/>
            </View>
            </View>
            </ImageBackground>
          </View>
        </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Contact')} >
          <View style = {styles.ImageContainer2}>
          <ImageBackground source = {require('../Images/image56.png')}
            style = {styles.ImageStyle}>
            <View style = {styles.overlayContainer}>
            <View style = {styles.TextContainer}>
            <Text style = {styles.TextStyle}>Contact</Text>
            </View>
            <View style = {styles.IconStyle}>
            <FontAwesome5 name = 'arrow-circle-right' size = {40} color = {colors.secondary_green}/>
            </View>
            </View>
            </ImageBackground>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

//Stylesheet for the UI components
const styles = StyleSheet.create
({
  Container:
  {
    flex:1
  },
  ImageContainer:
  {
    marginTop: 30,
    marginHorizontal:15,
    paddingVertical:10,
    alignItems:'center',
    backgroundColor: colors.background,
    borderRadius:8,
  },
  ImageContainer2:
  {
    marginTop: 20,
    marginHorizontal:15,
    paddingVertical:10,
    alignItems:'center',
    backgroundColor: colors.background,
    borderRadius:8,
  },
  ImageStyle:
  {
    width: 362,
    height:193,
  },
  TextStyle:
  {
    fontSize: 40,
    color: colors.text_brown,
    fontFamily: 'Poppins-Medium'
  },
  TextContainer:
  {
    paddingTop:5,
    paddingLeft:20,
  },
  IconStyle:
  {
    alignItems:'flex-end',
    marginTop:'22%',
    marginHorizontal: '5%'
  },
  overlayContainer:{
    flex:1,
    backgroundColor: '#C7B39E40'
  },
})


export default HomeScreen;