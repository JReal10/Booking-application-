import * as React from 'react';
import { Text,View, StyleSheet,SafeAreaView,Image,StatusBar} from 'react-native';
import colors from '../Colors/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import useFonts from '../Hooks/useFonts';
import Button from '../Components/CustomButton';

function Bookingpage4({navigation}) {

  useFonts();

  return (
    <View style = {styles.Container}>
      <SafeAreaView>
          <View style = {styles.Container1}>
            <Text style = {styles.Header}>BOOKING CONFIRMED</Text>
            <FontAwesome name= 'check-circle' size = {122.4}style = {styles.FontAwesome}/> 
            <Text style = {styles.Text1}>Check your profile for booking details. Contact xxx-xxx-xxxx for any enquiries, more details on contact page.</Text>
          </View>

          <View style ={styles.Button}>
              <Button title = 'CONTINUE' backgroundColor = {colors.secondary_green} fontFamilly = {"Poppins-SemiBold"} onPress={() => navigation.navigate('Tab')}/>
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
  Container1: 
  {
    marginHorizontal:12,
    alignItems: 'center'
  },
  Header:
  {
    padding:50,
    fontSize:24,
    fontWeight:'bold',
    color: colors.text_brown,
    fontFamily:'Merriweather-Bold'
  },
  FontAwesome: 
  {
    padding:50, 
    color:colors.secondary_green
  },
  Text1:
  {
    fontFamily:'Poppins-Regular',
    paddingHorizontal: 40,
    paddingVertical:30,
    textAlign: 'center',
    fontSize:18,
    color: colors.text_brown,
    marginTop:7,
  },
  Button:
  {
    marginTop:'40%',
    alignItems:'center',
  }
})

export default Bookingpage4