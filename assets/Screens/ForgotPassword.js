import * as React from 'react';
import { Text,View, StyleSheet,SafeAreaView,KeyboardAvoidingView,TouchableWithoutFeedback,Keyboard,Dimensions,TouchableOpacity } from 'react-native';
import colors from '../Colors/colors';
import { TextInput } from 'react-native-gesture-handler';
import Button from '../Components/CustomButton';
import { Authentication } from '../Config/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import useFonts from '../Hooks/useFonts';
import { useState } from 'react';
import AppLoading from 'expo-app-loading';

const { width, height } = Dimensions.get('window');
 
function ForgotPassword({navigation}) {
  const [IsReady, SetIsReady] = useState(false);  // Initializes a state variable for checking if the app is ready
  const [error, setError] = useState(false);      // Initializes a state variable for handling login errors
  const [email,setEmail] = useState('');          // Initializes a state variable for storing the user's email
  const FetchFonts = async () => {                // Declares an asynchronous function for fetching fonts
    await useFonts();                             // Calls a custom hook for loading fonts
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

  function handleResetPassword(email) {
    sendPasswordResetEmail(Authentication,email)
      .then(() => {
        console.log('Password reset email sent successfully');
      })
      .catch(error => {
        console.error(error);
      });
  }

  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style = {styles.Container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView>
          <View style = {styles.LoginContent}>
            <Text style = {styles.Sharon}>Enter your email address</Text>

            {(error == false)?
            <View>
              <View style = {styles.Inputs}>
                <TextInput placeholder = 'Email ID' 
                value={email}
                onChangeText={(email) => setEmail(email)} style = {styles.EmailInput}
                autoCorrect = {false}
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
                <Text style = {styles.errorText}>Invalid email address</Text>

              </View>
              }
            <View style = {styles.blankSpace}></View>

            <Button onPress ={()=> handleResetPassword(email)} title = {'continue'} backgroundColor = {colors.secondary_green} fontFamily= {'Poppins-Regular'}></Button>

            <TouchableOpacity onPress={() => navigation.navigate('Login')} style = {styles.textPos}>
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
    fontSize:height * 0.03,
    fontWeight:'bold',
    color:colors.primary_brown,
    fontFamily:'Poppins-Regular',
    textAlign:'center',
    marginVertical: height * 0.04
  },
  LoginContent:
  {
    paddingHorizontal:width * 0.08,
    flexDirection:'column',
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

})

export default ForgotPassword;