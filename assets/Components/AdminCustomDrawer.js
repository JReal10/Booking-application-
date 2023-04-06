import React from "react";
import { View,Text,StyleSheet,Dimensions } from "react-native";
import { DrawerContentScrollView,DrawerItemList } from "@react-navigation/drawer";
import colors from "../Colors/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Authentication } from '../Config/firebase';
import { signOut } from 'firebase/auth';

const { width, height } = Dimensions.get('window');

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
      
    <TouchableOpacity onPress={() => {logout()}} style={styles.logoutContainer}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <MaterialIcons name = 'logout' size = {height * 0.04} color = {colors.text_brown} />
      <View style = {styles.logoutContainer}>
        <Text style = {styles.logout}>
          Log Out
        </Text>
      </View>
    </View>
    </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  Wrapper: {
    flex: 1,
    backgroundColor: colors.primary_brown,
  },
  HeaderWrapper: {
    padding: width * 0.01,
    marginBottom: height * 0.02,
    margin: width * 0.01,
    borderRadius: width * 0.02,
  },
  HeaderTextWrapper: {
    fontSize: width * 0.08,
    color: colors.background,
    fontFamily: "Merriweather-Regular",
  },
  logout: {
    fontSize: width * 0.05,
    color: colors.text_brown,
    fontFamily: "Poppins-Regular",
  },
  logoutContainer:
  {
    paddingVertical: height * 0.03,
    paddingHorizontal:width * 0.04
  }
})

export default AdminCustomDrawer;