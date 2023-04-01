import * as React from 'react';
import { Text,View, StyleSheet,SafeAreaView,KeyboardAvoidingView,TouchableWithoutFeedback,Keyboard } from 'react-native';
import colors from '../Colors/colors';
import { TextInput } from 'react-native-gesture-handler';
import Button from '../Components/CustomButton';
import { Authentication } from '../Config/firebase';
import useFonts from '../Hooks/useFonts';
import { useState } from 'react';
import AppLoading from 'expo-app-loading';
import { signInWithEmailAndPassword } from 'firebase/auth';

 
function Adminlogin({navigation}) {
  const [IsReady, SetIsReady] = useState(false);
  const [isLoggedIn,setIsLoggedIn] = useState(false)
  const [error, setError] = useState(false)
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  const FetchFonts = async () => {
    await useFonts();
  };

    const LogInUser = () =>
    {
      signInWithEmailAndPassword(Authentication,email,password)
      .then((re) => 
     {
        setIsLoggedIn(true);
      }) 
      .catch(error => {
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
                <Text style = {styles.Sharon}>Client Login</Text>

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
    fontSize:42,
    marginTop:'10%',
    fontWeight:'bold',
    color:colors.primary_brown,
    fontFamily:'DancingScript',
    textAlign:'center',
    marginBottom:'20%'
  },
  LoginContent:
  {
    paddingHorizontal:'7%',
    flexDirection:'column',
    },
  inputHeader:
  {
    fontSize:18,
    color:colors.text_brown,
    paddingBottom:'1%',
    fontFamily:'Merriweather-Regular'
  },
  Inputs:
  {
    paddingVertical: '4%',
    fontFamily:'Poppins-Regular'
  },
  EmailInput:
  {
    backgroundColor:'#DFDFDF',
    borderRadius:8,
    fontSize:16,
    paddingVertical:'4%',
    paddingLeft:'4%',
    fontFamily:'Poppins-Regular'

  },
  PasswordInput:
  {
    borderWidth:1,
    paddingVertical:'4%',
    paddingLeft:'4%',
    borderRadius:8,
    fontSize:16,
    borderColor:'#DFDFDF',
    fontFamily:'Poppins-Regular'

  },
  LogoView:
  {
    flexDirection:'column',
    paddingHorizontal: '4%',
    marginTop:'6%',
    marginBottom:'5%',
    alignItems:'center'
  },
  LogoWrapper:{
    marginBottom:'3%',
  },
  TextView:
  {
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    paddingBottom:'5%',
  },
  TextWrapper1:
  {
    color: colors.text_brown,
    fontSize:15,
    fontFamily:'Poppins-Regular'
  },
  TextWrapper2:
  {
    marginLeft:'2%',
    color:'#AF3000',
    fontWeight:'bold',
    fontSize:15,
    fontFamily:'Poppins-Regular'
  },
  blankSpace:
  {
    marginTop:'10%',
  },
  errorPasswordInput:
  {
    borderWidth:1,
    height:50,
    paddingLeft:10,
    borderRadius:8,
    fontSize:16,
    borderColor:'#cc0000',
    fontFamily:'Poppins-Regular'
  },
  errorEmailInput:
  {
    backgroundColor:'#cc000020',
    borderWidth:1,
    height:50,
    paddingLeft:10,
    borderRadius:8,
    fontSize:16,
    borderColor:'#cc0000',
    fontFamily:'Poppins-Regular'
  },
  errorText:{
    color:'#cc0000'
  },
  fpTextStyle:
  {
    color: colors.text_brown,
    fontSize:15,
    fontFamily:'Poppins-Regular',
    paddingTop: 5,
    paddingBottom:5,
  }
})

export default Adminlogin;
