import * as React from 'react';
import { Text,View, StyleSheet,SafeAreaView,ImageBackground,Pressable, } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import colors from '../Colors/colors';
import { TextInput } from 'react-native-gesture-handler';
import LoginButton from '../Components/LoginButton';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Authentication } from '../Config/firebase';

function Login({navigation}) {

  //const {login} = React.useContext(AuthContext)

  const [isLoggedIn,setIsLoggedIn] = React.useState(false)
  const [email,setEmail] = React.useState('')
  const [password,setPassword] = React.useState('')
  const [userToken, setUserToken] = React.useState(null);

    const LogInUser = () =>
    {
      signInWithEmailAndPassword(Authentication,email,password)
      .then((re) => 
     {
        setIsLoggedIn(true);
        console.log('working')
        
      })
      .catch((re) =>
      {
        console.log(re);
      })
    }

  return (
    <View style ={styles.Container}>
      <SafeAreaView>
      <ImageBackground
          source={require('../Images/image60.png')} resizeMode= {'stretch'} style = {styles.ImageBackground}>
        <StatusBar style="dark-content"/>
        <View style = {styles.ImageContainer}>
        <Text style = {styles.Sharon}>SHARON</Text>
            <View style = {styles.LoginContent}>
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
              <LoginButton title = {'LOGIN'} onPress = {() => {LogInUser()}}/>
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
              <View style = {styles.TextView}>
              <Text style = {styles.TextWrapper1}>Already Have An Account?</Text>
              <Pressable onPress={() => navigation.navigate('Signup')}>
              <Text style = {styles.TextWrapper2}>Sign Up</Text>
              </Pressable>
              </View>
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
    fontSize:36,
    marginTop:40,
    fontWeight:'bold',
    color:colors.text_white,
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
  },
  Inputs:
  {
    paddingVertical: 10
  },
  EmailInput:
  {
    backgroundColor:'#DFDFDF',
    borderRadius:8,
    fontSize:16,
    height:50,
    paddingLeft:10,
  },
  PasswordInput:
  {
    borderWidth:1,
    height:50,
    paddingLeft:10,
    borderRadius:8,
    fontSize:16,
    borderColor:'#DFDFDF'
  },
  Divider:
  {
    marginTop:25,
    marginBottom:30,
    justifyContent:'space-between',
    alignItems:'center',
    flexDirection:'row',
    paddingHorizontal:10,
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
    fontSize:15
  },
  TextWrapper2:
  {
    marginLeft:5,
    color:'#AF3000',
    fontWeight:'bold',
    fontSize:15
  }
})

export default Login;
