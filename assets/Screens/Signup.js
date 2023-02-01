import * as React from 'react';
import { Text,View, StyleSheet,SafeAreaView,ImageBackground, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import colors from '../Colors/colors';
import { TextInput } from 'react-native-gesture-handler';
import LoginButton from '../Components/LoginButton';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
 import { createUserWithEmailAndPassword } from "firebase/auth";
 import { Authentication } from '../Config/firebase';
 import { database } from '../Config/firebase';
 import { doc, setDoc} from 'firebase/firestore';
 import useFonts from '../Hooks/useFonts';
 import { useState } from 'react';

function Signup({navigation,props}) {

  useFonts();

  const [isSignedIn, setIsSignedIn] = useState(true)
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [name,setName] = useState('')

  const AddData = async (UserName,UserEmail) => {

    const Ref = doc(database, "Booking_User");
    const data = {
      name: UserName,
      email: UserEmail
    };
   
    await setDoc(Ref, data)
  };

    const RegisterUser = () =>
    {
      createUserWithEmailAndPassword(Authentication,email,password )
      .then((re) => {
        console.log(re);
        setIsSignedIn(true);
      })
      .catch((re) =>{
        console.log(re);
    })

    AddData(name,email);
    }
  
  return (
    <View style ={styles.Container}>
      <SafeAreaView>
      <ImageBackground
          source={require('../Images/image59.png')} resizeMode= {'stretch'} style = {styles.ImageBackground}>
        <StatusBar style="dark-content"/>
        <View style = {styles.ImageContainer}>
        <Text style = {styles.Sharon}>SHARON</Text>
            <View style = {styles.LoginContent}>
              <View style = {styles.Inputs}>
                <Text style = {styles.inputHeader}>Name</Text>

                <TextInput placeholder = 'name' value = {name}
                onChangeText={(name) => setName(name)} style = {styles.EmailInput}/>
              </View>
              <View style = {styles.Inputs}>
                <Text style = {styles.inputHeader}>Email</Text>
                <TextInput placeholder = 'Email ID' value = {email} onChangeText={(email) => setEmail(email)}  style = {styles.EmailInput}/>
              </View>
              <View style = {styles.Inputs}>
                <Text style = {styles.inputHeader}>Password</Text>
                <TextInput placeholder = 'Password' value=  {password}
                onChangeText={password => setPassword(password)} style = {styles.PasswordInput} secureTextEntry
                autoCorrect ={false}autoCapitalize = 'none'/>
              </View>
              <LoginButton title = {'SIGNUP'} onPress = {() => RegisterUser()}></LoginButton>
              <View style = {styles.Divider}>
              <View style = {styles.Line}/>
              <Text>OR</Text>
              <View style = {styles.Line}/>
              </View>

              <View style = {styles.FontView}>
              <FontAwesome name = {'facebook'} size = {36}/>
              <FontAwesome name = {'google'} size = {36}/>
              <FontAwesome name = {'twitter'} size = {36}/>
              </View>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <View style = {styles.TextView}>
                  <Text style = {styles.TextWrapper1}>Already Have An Account?</Text>

                  <Text style = {styles.TextWrapper2}>Log in</Text>
                  </View>
              </TouchableOpacity>
            </View>
        </View>
        
        </ImageBackground>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create
({
  Container:
  { 
    flex:1,
    flexDirection:'column',
    backgroundColor:colors.background
  },
  ImageBackground:
  {
    width: '100%',
    height: '100%',
  },
  ImageContainer:
  {
    height:'100%',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'space-between',

  },
  Sharon:
  {
    fontSize:42,
    marginTop:40,
    fontWeight:'bold',
    color:colors.text_white,
    fontFamily:'DancingScript'
  },
  LoginContent:
  {
    paddingTop:20,
    borderTopLeftRadius:23,
    borderTopRightRadius:23,
    backgroundColor:colors.background,
    width:'100%',
    paddingHorizontal:30,
    flexDirection:'column',
  },
  inputHeader:
  {
    fontSize:18,
    color:colors.text_brown,
    paddingBottom:9,
    fontFamily:'Merriweather-Regular'
  },
  Inputs:
  {
    paddingVertical: 10,
    fontFamily:'Poppins-Regular'
  },
  EmailInput:
  {
    backgroundColor:'#DFDFDF',
    borderRadius:8,
    fontSize:16,
    height:50,
    paddingLeft:10,
    fontFamily:'Poppins-Regular'

  },
  PasswordInput:
  {
    borderWidth:1,
    height:50,
    paddingLeft:10,
    borderRadius:8,
    fontSize:16,
    borderColor:'#DFDFDF',
    fontFamily:'Poppins-Regular'

  },
  Divider:
  {
    marginTop:25,
    marginBottom:30,
    justifyContent:'space-between',
    alignItems:'center',
    flexDirection:'row',
    paddingHorizontal:10,
    fontFamily:'Poppins-Regular'

  },
  Line:
  {
    borderWidth:1,
    width:'45%',
    borderColor:'#DFDFDF'
  },
  FontView:
  {
    justifyContent:'space-between',
    flexDirection:'row',
    paddingHorizontal: 10,
    marginBottom:30,
    alignItems:'center'
  },
  TextView:
  {
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    paddingBottom:10,
  },
  TextWrapper1:
  {
    color: colors.text_brown,
    fontSize:15,
    fontFamily:'Poppins-Regular'
  },
  TextWrapper2:
  {
    marginLeft:5,
    color:'#AF3000',
    fontWeight:'bold',
    fontSize:15,
    fontFamily:'Poppins-Regular'
  }
})

export default Signup;
