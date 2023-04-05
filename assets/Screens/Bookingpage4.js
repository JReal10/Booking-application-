import * as React from 'react';
import { Text,View, StyleSheet,SafeAreaView,Dimensions} from 'react-native';
import colors from '../Colors/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Button from '../Components/CustomButton';

const { width, height } = Dimensions.get('window');


function Bookingpage4({navigation}) {

  //The UI componenet part of the screen
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

//Stylesheet for the UI components
const styles = StyleSheet.create
({
  Container: 
  {
    flex:1,
  },
  Container1: 
  {
    marginHorizontal:width * 0.01,
    alignItems: 'center'
  },
  Header:
  {
    padding:height * 0.05,
    fontSize:height * 0.03,
    fontWeight:'bold',
    color: colors.text_brown,
    fontFamily:'Merriweather-Bold'
  },
  FontAwesome: 
  {
    padding:height * 0.05, 
    color:colors.secondary_green
  },
  Text1:
  {
    fontFamily:'Poppins-Regular',
    paddingHorizontal: width * 0.04,
    paddingVertical:height * 0.04,
    textAlign: 'center',
    fontSize:height * 0.02,
    color: colors.text_brown,
    marginTop:height * 0.01,
  },
  Button:
  {
    marginTop:height * 0.2,
    alignItems:'center',
  }
})

export default Bookingpage4