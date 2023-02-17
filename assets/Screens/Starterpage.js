import * as React from 'react';
import { Text,View, StyleSheet,SafeAreaView,KeyboardAvoidingView, TouchableOpacity} from 'react-native';
import colors from '../Colors/colors';
import { useState } from 'react';
import useFonts from '../Hooks/useFonts';
import AppLoading from 'expo-app-loading';
import Button from '../Components/LogoButton';

function Starterpage({navigation}) {

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
    <View style = {styles.Container}>
      <SafeAreaView style = {styles.backgroundContainer}>
        <Text style = {styles.Sharon}>Sharon</Text>
        <View style = {styles.ButtonWrapper}>
        <Button title = {'CUSTOMER'} backgroundColor = {colors.background} onPress = {()=>navigation.navigate('Login')}></Button>
        <View style= {styles.blankSpace}></View>
        <Button title = {'CLIENT'} backgroundColor = {colors.background} onPress = {()=>navigation.navigate('cLogin')}></Button>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create
({
  Container:
  { 
    flex: 1,
  },
  backgroundContainer:
  {
    height:'100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor:colors.primary_brown,
  },
  Sharon:
  {
    fontSize:42,
    paddingTop:'20%',
    fontFamily:'DancingScript',
    color:colors.text_white,
  },
  ButtonWrapper:{
    paddingBottom:'20%'
  },
  blankSpace:{
    paddingTop:'5%'
  }
})

export default Starterpage;
