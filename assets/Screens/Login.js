import * as React from 'react';
import { Text,View, StyleSheet,SafeAreaView,ImageBackground,Keyboard,KeyboardAvoidingView, TouchableOpacity,TouchableWithoutFeedback,Dimensions} from 'react-native';
import Button from '../Components/CustomButton';
import colors from '../Colors/colors';
import { TextInput } from 'react-native-gesture-handler';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Authentication } from '../Config/firebase';
import { useState } from 'react';
import useFonts from '../Hooks/useFonts';
import AppLoading from 'expo-app-loading';
 
const { width, height } = Dimensions.get('window');

function Login({navigation}){ //Main componenets for the login screen

  // Initialize state variables for authentication
  const [IsReady, SetIsReady] = useState(false);
  const [error, setError] = useState(false)
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

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

  //Function to Authenticate user 
  const LogInUser = () => {
    //Authenticate user with a built in authentication function in firebase
    signInWithEmailAndPassword(Authentication,email,password)
    .then((re) => 
    {
    }) 
    .catch(error => {
      //Error checking, if there are errors the React Hook set Error is set to true.
      if (error.code === 'auth/email-already-in-use') {
        setError(true);
      }
      if (error.code === 'auth/invalid-email') {
        setError(true);
      }
      if (error.code === 'auth/user-not-found') {
        setError(true);
      }
      if (error.code === 'auth/wrong-password') {
        setError(true);
      }
    });
  };

  //The UI componenet part of the screen
  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style = {styles.Container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ImageBackground source={require('../Images/image60.png')}  style = {styles.ImageBackground}>
          <SafeAreaView style = {styles.SafeAreaView}/>
            <View style = {styles.overlayContainer}>
              <View style = {styles.ImageContainer}>
                <Text style = {styles.Sharon}>SHARON</Text>
                <View style = {styles.LoginContent}>

                  {(error == false)?//An UI of an error input text is displyed if the React hook error is true
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
  
                  <View>
                  <TouchableOpacity onPress={() => navigation.navigate('fp')}>
                    <Text style = {styles.fpTextStyle}>
                      Forgot Password?
                    </Text>
                    </TouchableOpacity>
                  </View>

                  <Button title = {'LOGIN'} backgroundColor = {colors.secondary_green} onPress = {() => {LogInUser()}} fontFamily= {'Poppins-Regular'}></Button>

                  <TouchableOpacity onPress={() => navigation.navigate('Signup')} style = {styles.textPos}>
                  <View style = {styles.TextView}>
                  <Text style = {styles.TextWrapper1}>Already Have An Account?</Text>
                  <Text style = {styles.TextWrapper2}>Sign Up</Text>
                  </View>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => navigation.navigate('adminLogin')}>
                  <View style = {styles.TextView}>
                  <Text style = {styles.TextWrapper1}>ADMIN LOGIN</Text>
                  </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          <SafeAreaView style = {{opacity:0}}/>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

//Stylesheet for the UI components
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
    width: width,
    height: height,
    resizeMode: 'stretch',
    overflow: "hidden",
  },
  ImageContainer:
  {
    height:height,
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'space-between',

  },
  Sharon:
  {
    fontSize:height * 0.05,
    marginTop:height * 0.04,
    fontFamily:'DancingScript',
    color:colors.text_white,
  },
  LoginContent:
  {
    paddingTop:height * 0.02,
    borderTopLeftRadius:23,
    borderTopRightRadius:23,
    backgroundColor:colors.background,
    width:width,
    height:height * 0.7,
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
  overlayContainer:{
    flex:1,
    backgroundColor: '#C7B39E20'
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
  TextView:
  {
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    paddingBottom:height * 0.02,
  },
  TextWrapper1:
  {
    color: colors.text_brown,
    fontSize:height * 0.015,
    fontFamily:'Poppins-Regular'
  },
  TextWrapper2:
  {
    color:'#AF3000',
    marginLeft:width * 0.01,
    fontWeight:'bold',
    fontSize:height * 0.015,
    fontFamily:'Poppins-Regular'
  },
  fpTextStyle:
  {
    color: colors.text_brown,
    fontSize:height * 0.015,
    fontFamily:'Poppins-Regular',
    paddingTop: height * 0.01,
    paddingBottom:height * 0.05,
  },
  errorText:{
    color:'#cc0000'
  },
  SafeAreaView:
  {
    backgroundColor:'#C7B39E20'
  },
  textPos:{
    marginTop:height * 0.06 
  }
})

export default Login;
