import * as React from 'react';
import { Text,View, StyleSheet,SafeAreaView,TouchableOpacity, ScrollView,StatusBar,TextInput } from 'react-native';
import colors from '../Colors/colors';
import AppLoading from 'expo-app-loading';
import useFonts from '../Hooks/useFonts';
import { database } from '../Config/firebase';
import { getDoc,doc } from 'firebase/firestore';
import Button from '../Components/CustomButton';
import { useState,useEffect }from 'react';

function ClientAddMenu({navigation}){

  const [IsReady, SetIsReady] = useState(false);
  const [courseName, setCourseName] = useState("");
  const [courseTime, setCourseTime] = useState("");
  const [coursePrice, setCoursePrice] = useState("");
  const [courseDesc,setCourseDesc] = useState(""); 


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
    <View style ={styles.Container}>
      <SafeAreaView style = {styles.SafeAreaView}>
      <View style = {styles.contentContainer}>
      <StatusBar barStyle={'dark-content'}></StatusBar>
        <ScrollView>
          <View style = {styles.Inputs}>
            <Text style = {styles.inputHeader}>Course Name</Text>
            <TextInput placeholder = 'enter course name...' 
            value={courseName}
            onChangeText={(courseName) => setEmail(setCourseName(courseName))} style = {styles.EmailInput}
            autoCorrect = {false}
            autoCapitalize = 'none'/>
        </View>
        <View style = {styles.inputWrapper3}>
        <View style = {styles.Inputs}>
            <Text style = {styles.inputHeader}>Course Name</Text>
            <TextInput placeholder = 'enter course name...' 
            value={courseName}
            onChangeText={(courseName) => setEmail(courseName)} style = {styles.InputWrapper2}
            autoCorrect = {false}
            autoCapitalize = 'none'/>
        </View>
        <View style = {styles.Inputs}>
            <Text style = {styles.inputHeader}>Course Name</Text>
            <TextInput placeholder = 'enter course name...' 
            value={courseName}
            onChangeText={(courseName) => setEmail(courseName)} style = {styles.InputWrapper2}
            autoCorrect = {false}
            autoCapitalize = 'none'/>
        </View>
        </View>
        <View style = {styles.Inputs}>
            <Text style = {styles.inputHeader}>Course Name</Text>
            <TextInput placeholder = 'enter course name...' 
            value={courseName}
            onChangeText={(courseName) => setEmail(courseName)} style = {styles.EmailInput}
            autoCorrect = {false}
            autoCapitalize = 'none'/>
        </View>
        <Button title = {'ADD MENU'} backgroundColor = {colors.secondary_green} fontFamily= {'Poppins-Regular'}></Button>
        
        <Text style = {styles.HeaderStyle}>Menu</Text>
        <View>
        </View>
        </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
}
const styles = StyleSheet.create
({
  Container:
  {
    flex:1,
  },
  SafeAreaView:
  {
    backgroundColor:colors.background,
  },
  contentContainer:
  {
    paddingTop:20,
    borderTopLeftRadius:23,
    borderTopRightRadius:23,
    backgroundColor:colors.background,
    width:'100%',
    height:'100%',
    paddingHorizontal:30,
    flexDirection:'column',
  },
  EmailInput:
  {
    backgroundColor:'#DFDFDF',
    borderRadius:8,
    fontSize:16,
    height:45,
    paddingLeft:10,
    fontFamily:'Poppins-Regular'

  },
  InputWrapper2:
  {
    backgroundColor:'#DFDFDF',
    borderRadius:8,
    fontSize:16,
    height:45,
    width:'100%',
    paddingLeft:10,
    fontFamily:'Poppins-Regular'
  },
  inputWrapper3:
  {
    justifyContent:"space-between",
    flexDirection:'row',
  },
  Inputs:
  {
    paddingVertical: 5,
    fontFamily:'Poppins-Regular'
  },
  inputHeader:
  {
    fontSize:15,
    color:colors.text_brown,
    paddingBottom:9,
    fontFamily:'Merriweather-Regular'
  },
  HeaderStyle:
  {
    paddingVertical:'6%',
    fontSize:18,
    color:colors.text_brown,
    fontFamily:'Merriweather-Regular'

  }

})


export default ClientAddMenu;