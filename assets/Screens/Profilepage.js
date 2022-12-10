import * as React from 'react';
import { Text,View, StyleSheet,SafeAreaView,ScrollView} from 'react-native';
import colors from '../Colors/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { signOut } from 'firebase/auth';
import { Authentication } from '../Config/firebase';

function Profilepage() {

   const logout =() =>
   {
     signOut(Authentication)
     .then((re) => 
     {
       setIsLoggedIn = false;
     }).catch
     {
     }

   }

  return (
    <View style = {styles.ScreenContainer}>
      <SafeAreaView>
      <ScrollView>
        <View style = {styles.ContentContainer}>
        <View style = {styles.TextContainer}>
          <MaterialIcons name = 'account-circle' size = {60} color = '#839A7F' />
          <Text style = {styles.ProfileName}>Jamie Ogundiran</Text>
          </View>
          <Text>Edit</Text>

        </View>

        <View style = {styles.ContentContainer2}>
          <View style = {styles.TextContainer2}>
          <MaterialCommunityIcons name = 'calendar-month' size = {32} color = '#839A7F' />
          <Text style = {styles.ProfileName}>Appointments</Text>
          </View>
          <View style = {styles.TextContainer2}>
          <MaterialCommunityIcons name = 'account-multiple' size = {32} color = '#839A7F'/>
          <Text style = {styles.ProfileName}>Refferal</Text>
          </View>
        </View>

        <View style = {styles.ContentContainer2}>
          <View style = {styles.TextContainer2}>
          <MaterialIcons name = 'payment' size = {32} color = '#839A7F'/>
          <Text style = {styles.ProfileName}>Payment</Text>
          </View>
          <View style = {styles.TextContainer2}>
          <MaterialIcons name = 'notifications' size = {32} color = '#839A7F'/>
          <Text style = {styles.ProfileName}>Notifications</Text>
          </View>
        </View>
        
        <View style = {styles.ContentContainer2}>
          <View style = {styles.TextContainer3}>
          <Text style = {styles.ProfileName}>Privacy Policy</Text>
          </View>
          <View style = {styles.TextContainer3}>
          <Text style = {styles.ProfileName}>Terms & Conditions</Text>
          </View>
          <View style = {styles.TextContainer3}>
          <Text style = {styles.ProfileName}>About us</Text>
          </View>
        </View>

        <View style = {styles.LogOutContainer}>
          <Text onPress={()=>{logout()}} style = {styles.ProfileName}>Log Out</Text>
          <Text style = {styles.ProfileName}>Delete Account</Text>
        </View>
      </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create
({
  ScreenContainer: 
  {
    flex: 1 
  },
  ContentContainer:
  {
    backgroundColor: '#EEEEEE',
    marginVertical:29.5,
    marginHorizontal:21,
    borderRadius: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 5,
    paddingRight:20,
    paddingVertical:10,
  },
  TextContainer:
  {
    flexDirection:'row',
    alignItems:'center',
  },
  ProfileName:
  {
    marginLeft:10,
    fontSize: 20,
    color: colors.text_brown,
  },
  ContentContainer2:
  {
    backgroundColor: '#EEEEEE',
    marginBottom: 29.5,
    marginHorizontal:21,
    borderRadius: 8,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    paddingLeft: 5,
    paddingRight:20,
    paddingVertical:10,
  },
  TextContainer2: 
  {
    flexDirection:'row',
    alignItems:'center',
    marginLeft:'3%',
    marginTop: '2%',
    marginBottom: '3%'
  },
  TextContainer3:
  {
    flexDirection:'row',
    alignItems:'center',
    marginLeft:'3%',
    marginTop: '3%',
    marginBottom: '5%'

  },
  LogOutContainer: 
  {
    marginBottom: 29.5,
    marginHorizontal:21,
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingLeft: 5,
    paddingRight:20,
    paddingVertical:10,
  }
})

export default Profilepage;