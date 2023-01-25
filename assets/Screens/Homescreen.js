import * as React from 'react';
import { Text,View, StyleSheet,SafeAreaView,TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useState } from 'react';
import colors from '../Colors/colors';

function HomeScreen({navigation}) {
  return (
    <View style ={styles.Container}>
      <SafeAreaView>
        <ScrollView>
        <View style = {styles.ImageContainer}>
          <ImageBackground source = {require('../Images/image23.png')}
          style = {styles.ImageStyle}>
          <View style = {styles.TextContainer}>
          <Text style = {styles.TextStyle}>BOOK</Text>
          </View>
          <View style = {styles.IconStyle}>
          <FontAwesome5 name = 'arrow-circle-right' size = {40} color = {colors.secondary_green} onPress={() => navigation.navigate('Booking1')}/>
          </View>
          </ImageBackground>
        </View>

        <View style = {styles.ImageContainer2}>
        <ImageBackground source = {require('../Images/image58.png')}
          style = {styles.ImageStyle}>
          <View style = {styles.TextContainer}>
          <Text style = {styles.TextStyle}>Gallery</Text>
          </View>
          <View style = {styles.IconStyle}>
          <FontAwesome5 name = 'arrow-circle-right' size = {40} color = {colors.secondary_green} onPress={() => navigation.navigate('Gallery')}/>
          </View>
          </ImageBackground>
        </View>

        <View style = {styles.ImageContainer2}>
        <ImageBackground source = {require('../Images/image56.png')}
          style = {styles.ImageStyle}>
          <View style = {styles.TextContainer}>
          <Text style = {styles.TextStyle}>Contact</Text>
          </View>
          <View style = {styles.IconStyle}>
          <FontAwesome5 name = 'arrow-circle-right' size = {40} color = {colors.secondary_green} onPress={() => navigation.navigate('Contact')}/>
          </View>
          </ImageBackground>
        </View>
        <View style = {styles.TabNavSpace}></View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
const styles = StyleSheet.create
({
  Container:
  {
    flex:1
  },
  TabNavSpace: 
  {
    paddingVertical:40,
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
    //fontFamily: 'Poppins-SemiBold'
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
})


export default HomeScreen;