import * as React from 'react';
import { Text,View, StyleSheet,SafeAreaView,TouchableOpacity, ScrollView,StatusBar } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import colors from '../Colors/colors';
import AppLoading from 'expo-app-loading';
import useFonts from '../Hooks/useFonts';
import { database } from '../Config/firebase';
import { getDoc,doc } from 'firebase/firestore';
import { useState,useEffect }from 'react';

function ClientSettingpage({navigation}){

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
    <View style ={styles.Container}>
      <SafeAreaView style = {styles.contentContainer}>
      <StatusBar barStyle={'dark-content'}></StatusBar>
        <ScrollView>
          <View style = {styles.appoContainer}>
          <View>
          <Text style = {styles.headerStyle}>Setting</Text>
          </View>
          <View style = {styles.ContentContainer2}>
          <View style = {styles.TextContainer3}>
          <Text style = {styles.TextStyle}>Privacy Policy</Text>
          </View>
          <View style = {styles.TextContainer3}>
          <Text style = {styles.TextStyle}>Terms & Conditions</Text>
          </View>
          <View style = {styles.TextContainer3}>
          <Text style = {styles.TextStyle}>About us</Text>
          </View>
        </View>
          </View>
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
  contentContainer:
  {
    height:'100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor:colors.background,
  },
  headerStyle:
  {
    textAlign:'center',
    fontSize:18,
    fontFamily:'Merriweather-Regular',
    color: colors.text_brown,
  },
  subTextStyle:
  {
    textAlign:'center',

  },
  subTextWrapper:
  {
    paddingVertical:'20%',
    opacity:0.5,
  },
  headerWrapper:
  {
    backgroundColor:colors.secondary_green,
    paddingVertical:2,
  },
  appoContainer:
  {
    padding:20,
  },
  ContentContainer:
  {
    backgroundColor: '#EEEEEE',
    marginVertical:29.5,
    marginHorizontal:21,
    borderRadius: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 5,
    paddingRight:20,
    paddingVertical:15,
  },
  TextContainer:
  {
    flexDirection:'row',
    alignItems:'center',
  },
  TextStyle:
  {
    marginLeft:10,
    fontSize: 18,
    color: colors.text_brown,
    fontFamily:'Merriweather-Regular'
  },
  TextStyle2:{
    marginLeft:10,
    fontSize: 18,
    color: colors.text_brown,
    fontFamily:'Poppins-Regular'

  },
  ContentContainer2:
  {
    backgroundColor: '#EEEEEE',
    marginBottom: 29.5,
    marginHorizontal:21,
    borderRadius: 8,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    paddingLeft: 5,
    paddingRight:20,
    paddingVertical:25,
  },
  TextContainer2: 
  {
    flexDirection:'row',
    alignItems:'center',
    marginLeft:'3%',
    marginTop: '5%',
    marginBottom: '3%'
  },
  TextContainer3:
  {
    flexDirection:'row',
    alignItems:'center',
    marginLeft:'3%',
    marginTop: '3%',
    marginBottom: '5%'
  },
})


export default ClientSettingpage;