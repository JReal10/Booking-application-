import React from "react";
import { View,Text,StyleSheet } from "react-native";
import { DrawerContentScrollView,DrawerItemList  } from "@react-navigation/drawer";
import colors from "../Colors/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Authentication } from '../Config/firebase';
import { signOut } from 'firebase/auth';

const AdminCustomDrawer = (props) =>
{

  const logout =() =>
  {
    signOut(Authentication)
    .then((re) => 
    {
    }).catch
    {
    }
  }

  return (
    <View style = {styles.Wrapper}> 
    <DrawerContentScrollView {...props}>
    <View style = {styles.HeaderWrapper}>
      <Text style = {styles.HeaderTextWrapper}>Welcome</Text>
      <Text style = {styles.HeaderTextWrapper}>Back</Text>
    </View>  
    <DrawerItemList {...props}/>

    </DrawerContentScrollView>
      
        <TouchableOpacity onPress={() => {logout()}} style={{paddingVertical: 30,paddingHorizontal:15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <MaterialIcons name = 'logout' size = {32} color = {colors.text_brown} />
            <Text style = {styles.Logout}>
              Log Out
            </Text>
          </View>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  Wrapper:
  {
    flex:1,
    backgroundColor:colors.primary_brown,
  },
  AppointmentHeaderWrapper:{
    paddingTop:10,
  },
  DateTimeWrapper:{
    justifyContent: 'space-between',
    flexDirection:'row',
    paddingVertical: 10,
  },
  CourseTextStyle:{
    fontSize : 15,
    textAlign: 'left',
    padding:2,
    color: colors.text_brown,
    fontFamily:'Poppins-Regular'
  },
  TextStyle2:{
    color:colors.text_brown,
    fontSize:15,
    fontFamily:'Poppins-Regular'
  },
  ApoointmentSubWrapper:{
    backgroundColor: "#BAA793",
    padding: 10,
    margin:5,
    borderRadius:8,
    shadowRadius:5,
  },
  HeaderWrapper:
  {
    padding:5,
    marginBottom:20,
    margin:5,
    borderRadius:8,
  },
  SubTextWrapper:{
    fontSize:20,
    padding: 10,
    color: colors.text_brown,
    fontFamily:'Merriweather-Regular'
  },
  HeaderTextWrapper:
  {
    fontSize:32,
    color:colors.background,
    fontFamily:'Merriweather-Regular'
  },
  TextStyle:{
    fontSize: 18, 
    color: colors.text_brown,
    fontFamily:'Poppins-Regular'
  },
  Logout:
  {
    fontSize: 20,
    marginLeft: 5,
    color: colors.text_brown,
    fontFamily:'Poppins-Regular'
  }
})

export default AdminCustomDrawer;