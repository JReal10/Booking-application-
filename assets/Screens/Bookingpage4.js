import * as React from 'react';
import { Text,View, StyleSheet,SafeAreaView,Image,StatusBar} from 'react-native';
import colors from '../Colors/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FowardButton from '../Components/FowardButton';

function Bookingpage4({navigation}) {

  return (
    <View style = {styles.Container}>
      <SafeAreaView>
          <View style = {styles.Container1}>
            <Text style = {styles.Header}>BOOKING CONFIRMED!</Text>
            <FontAwesome name= 'check-circle' size = {122.4}style = {styles.FontAwesome}/> 
            <Text style = {styles.Text1}>Check your profile for booking details. Contact xxx-xxx-xxxx for any enquiries, more details on contact page.</Text>
          </View>

          <View style ={styles.FowardButton}>
              <FowardButton title = 'CONTINUE' onPress={() => navigation.navigate('Tab')}/>
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
    color: colors.text_brown
  },
  FontAwesome: 
  {
    padding:50, 
    color:colors.secondary_green
  },

  Text1:
  {
    padding: 40,
    textAlign: 'center',
    fontSize:18,
    color: colors.text_brown,
    marginTop:7,
  },
  FowardButton:
  {
    marginTop:'40%',
  }
})

export default Bookingpage4