import * as React from 'react';
import { Text,View, StyleSheet,SafeAreaView,KeyboardAvoidingView,TouchableWithoutFeedback,Keyboard,Dimensions,TouchableOpacity } from 'react-native';
import colors from '../Colors/colors';
import { TextInput } from 'react-native-gesture-handler';
import Button from '../Components/CustomButton';
import { Authentication } from '../Config/firebase';
import useFonts from '../Hooks/useFonts';
import { useState } from 'react';
import AppLoading from 'expo-app-loading';
import { signInWithEmailAndPassword } from 'firebase/auth';

const { width, height } = Dimensions.get('window');
 
function Adminlogin({navigation}) {
  const [IsReady, SetIsReady] = useState(false);  // Initializes a state variable for checking if the app is ready
  const [error, setError] = useState(false);      // Initializes a state variable for handling login errors
  const [email,setEmail] = useState('');          // Initializes a state variable for storing the user's email
  const [password,setPassword] = useState('');    // Initializes a state variable for storing the user's password
  
  const FetchFonts = async () => {                // Declares an asynchronous function for fetching fonts
    await useFonts();                             // Calls a custom hook for loading fonts
  };
  
  const LogInUser = () =>                          // Declares a function for logging in a user
  {
    signInWithEmailAndPassword(Authentication,email,password)   // Calls Firebase's signInWithEmailAndPassword method with the user's email and password as parameters
    .then((re) => { })                            // Handles a successful login
    .catch(error => {                             // Handles a login error
      if (error.code === 'auth/email-already-in-use') {   // Checks if the error code is related to a user already being registered with the email
        setError(true);                           // Sets the error state variable to true
      }
      if (error.code === 'auth/invalid-email') {   // Checks if the error code is related to an invalid email format
        setError(true);                           // Sets the error state variable to true
      }
      if (error.code === 'auth/user-not-found') {  // Checks if the error code is related to a user not being found with the given email
        setError(true);                           // Sets the error state variable to true
      }
      if (error.code === 'auth/wrong-password') {  // Checks if the error code is related to an incorrect password
        setError(true);                           // Sets the error state variable to true
      }
    });
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
    <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style = {styles.Container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView>
          <View style = {styles.LoginContent}>
            <Text style = {styles.Sharon}>Admin Login</Text>

            {(error == false)?
            <View>
              <View style = {styles.Inputs}>
                <Text style = {styles.inputHeader}>Email</Text>
                <TextInput placeholder = 'Email ID' 
                value={email}
                onChangeText={(email) => setEmail(email)} style = {styles.EmailInput}
                autoCorrect = {false}
                autoCapitalize = 'none'/>
              </View>
              <View style = {styles.Inputs}>
                <Text style = {styles.inputHeader}>Password</Text>
                <TextInput 
                placeholder = 'Password' 
                value = {password}
                onChangeText={(password) => setPassword(password)} 
                style = {styles.PasswordInput}
                secureTextEntry
                autoCorrect ={false}
                autoCapitalize = 'none'/>
              </View> 
            </View>:
              <View>
                <View style = {styles.Inputs}>
                  <Text style = {styles.inputHeader}>Email</Text>
                  <TextInput placeholder = 'Email ID' 
                  value={email}
                  onChangeText={(email) => setEmail(email)} style = {styles.errorEmailInput}
                  autoCorrect = {false}
                  autoCapitalize = 'none'/>
                </View>
                <Text style = {styles.errorText}>Wrong password or email address</Text>

                <View style = {styles.Inputs}>
                  <Text style = {styles.inputHeader}>Password</Text>
                  <TextInput 
                  placeholder = 'Password' 
                  value = {password}
                  onChangeText={(password) => setPassword(password)} 
                  style = {styles.errorPasswordInput}
                  secureTextEntry
                  autoCorrect ={false}
                  autoCapitalize = 'none'/>
                </View>
                <Text style = {styles.errorText}>Wrong password or email address</Text>
              </View>
              }
              <Text style = {styles.fpTextStyle}>
              Forgot Password?
            </Text>
            <View style = {styles.blankSpace}></View>

            <Button onPress ={()=> LogInUser()} title = {'Login'} backgroundColor = {colors.secondary_green} fontFamily= {'Poppins-Regular'}></Button>

            <TouchableOpacity onPress={() => navigation.navigate('Login')} style = {styles.textPos}>
              <Text style = {styles.TextWrapper1}>Customer Login</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
  Sharon:
  {
    fontSize:height * 0.05,
    fontWeight:'bold',
    color:colors.primary_brown,
    fontFamily:'DancingScript',
    textAlign:'center',
    marginVertical: height * 0.04
  },
  LoginContent:
  {
    paddingHorizontal:width * 0.08,
    flexDirection:'column',
  },
  inputHeader:
  {
    fontSize:height * 0.02,
    color:colors.text_brown,
    paddingBottom:height * 0.01,
    fontFamily:'Merriweather-Regular'
  },
  Inputs:
  {
    paddingVertical: height * 0.015,
    fontFamily:'Poppins-Regular'
  },
  EmailInput:
  {
    backgroundColor:'#DFDFDF',
    borderRadius:8,
    fontSize:height * 0.015,
    height:height * 0.05,
    paddingLeft:width * 0.02,
    fontFamily:'Poppins-Regular'
  },
  PasswordInput:
  {
    borderWidth:1,
    borderRadius:8,
    fontSize:height * 0.015,
    height:height * 0.05,
    paddingLeft:width * 0.02,
    borderColor:'#DFDFDF',
    fontFamily:'Poppins-Regular'
  },
  errorPasswordInput:
  {
    borderWidth:1,
    borderRadius:8,
    fontSize:height * 0.015,
    height:height * 0.05,
    paddingLeft:width * 0.02,
    borderColor:'#cc0000',
    fontFamily:'Poppins-Regular'
  },
  errorEmailInput:
  {
    backgroundColor:'#cc000020',
    borderWidth:1,
    borderRadius:8,
    fontSize:height * 0.015,
    height:height * 0.05,
    paddingLeft:width * 0.02,
    borderColor:'#cc0000',
    fontFamily:'Poppins-Regular'
  },
  errorText:{
    color:'#cc0000'
  },
  fpTextStyle:
  {
    color: colors.text_brown,
    fontSize:height * 0.015,
    fontFamily:'Poppins-Regular',
    paddingTop: height * 0.01,
    paddingBottom:height * 0.05,
  },
  TextWrapper1:
  {
    color: colors.text_brown,
    fontSize:height * 0.015,
    fontFamily:'Poppins-Regular',
    textAlign:'center'
  },
  textPos:{
    marginTop:height * 0.03 
  }
})

export default Adminlogin;
