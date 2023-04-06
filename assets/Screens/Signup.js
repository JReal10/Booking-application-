import * as React from 'react';
import { Text,View, StyleSheet,SafeAreaView,Dimensions, TouchableOpacity,KeyboardAvoidingView,TouchableWithoutFeedback,Keyboard } from 'react-native';
import colors from '../Colors/colors';
import { TextInput } from 'react-native-gesture-handler';
import Button from '../Components/CustomButton';
 import { createUserWithEmailAndPassword } from "firebase/auth";
 import { Authentication } from '../Config/firebase';
 import { database } from '../Config/firebase';
 import { doc, setDoc} from 'firebase/firestore';
 import useFonts from '../Hooks/useFonts';
 import { useState } from 'react';
 import AppLoading from 'expo-app-loading';

 const { width, height } = Dimensions.get('window');
 
function Signup({navigation}) {

  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [emailUsed, setEmailUsed] = useState(false)
  const [invalidEmail, setInvalidEmail] = useState(false)
  const [name,setName] = useState('')
  const [UserID,setUserID] = useState('')
  const [IsReady, SetIsReady] = useState(false);
  const [nameError, SetNameError] = useState(true);

  const FetchFonts = async () => {
    await useFonts();
  };

  const AddData = async (UserName,UserEmail,userID) => {

    const Ref = doc(database, "Booking_User", userID);
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
        AddData(name,email,re.user.uid)
        setUserID(re.user.uid)
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          setEmailUsed(true);
        }
        if (error.code === 'auth/invalid-email') {
          setInvalidEmail(true);
        }
        SetNameError(true)
      });
    }

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
                <Text style = {styles.Sharon}>Create Account</Text>
                <View style = {styles.Inputs}>
                  <Text style = {styles.inputHeader}>First Name</Text>
                  <TextInput placeholder = 'name' value = {name}
                  onChangeText={(name) => setName(name)} style = {styles.EmailInput}/>
                </View>
                {(name.length < 0 && nameError == true)?
                <View style = {styles.Inputs}>
                  <Text style = {styles.inputHeader}>Last Name</Text>
                  <TextInput placeholder = 'name' value = {name}
                  onChangeText={(name) => setName(name)} style = {styles.errorEmailInput}/>
                </View>:
                <View style = {styles.Inputs}>
                  <Text style = {styles.inputHeader}>Last Name</Text>
                  <TextInput placeholder = 'name' value = {name}
                  onChangeText={(name) => setName(name)} style = {styles.EmailInput}/>
                </View> }

                {(invalidEmail == true)?
                <View>
                <View style = {styles.Inputs}>
                  <Text style = {styles.inputHeader}>Email</Text>
                  <TextInput placeholder = 'Email ID' value = {email} onChangeText={(email) => setEmail(email)}  style = {styles.errorEmailInput}/>
                </View>

                <Text style = {styles.errorText}>Wrong password or email address</Text>
                </View>
                    :(emailUsed == true)?
                <View>
                  <View style = {styles.Inputs}>
                    <Text style = {styles.inputHeader}>Email</Text>
                    <TextInput placeholder = 'Email ID' value = {email} onChangeText={(email) => setEmail(email)}  style = {styles.errorEmailInput}/>
                  </View>

                  <Text style = {styles.errorText}>Email address already used</Text>
                  </View>
                  :
                    <View style = {styles.Inputs}>
                    <Text style = {styles.inputHeader}>Email</Text>
                    <TextInput placeholder = 'Email ID' value = {email} onChangeText={(email) => setEmail(email)}  style = {styles.EmailInput}/>
                </View>
                }

                <View style = {styles.Inputs}>
                  <Text style = {styles.inputHeader}>Password</Text>
                  <TextInput placeholder = 'Password' value=  {password}
                  onChangeText={password => setPassword(password)} style = {styles.PasswordInput} secureTextEntry
                  autoCorrect ={false}autoCapitalize = 'none'/>
                </View>

                <View style = {styles.blankSpace}></View>

                <Button title = {'SIGN UP'} backgroundColor = {colors.secondary_green} onPress = {() => {RegisterUser()}} fontFamily= {'Poppins-Regular'}></Button>

                <TouchableOpacity onPress={() => navigation.navigate('Login')} style = {styles.textPos}>
                    <View style = {styles.TextView}>
                    <Text style = {styles.TextWrapper1}>Already Have An Account?</Text>

                    <Text style = {styles.TextWrapper2}>Log in</Text>
                    </View>
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
  blankSpace:
  {
    marginTop:height * 0.05,
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
  textPos:{
    marginTop:height * 0.03 
  }
})

export default Signup;
