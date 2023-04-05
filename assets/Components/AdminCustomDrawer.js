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
  wrapper: {
    flex: 1,
    backgroundColor: colors.primary_brown,
  },
  appointmentHeaderWrapper: {
    paddingTop: height * 0.02,
  },
  dateTimeWrapper: {
    justifyContent: "space-between",
    flexDirection: "row",
    paddingVertical: height * 0.02,
  },
  courseTextStyle: {
    fontSize: width * 0.035,
    textAlign: "left",
    padding: width * 0.01,
    color: colors.text_brown,
    fontFamily: "Poppins-Regular",
  },
  textStyle2: {
    color: colors.text_brown,
    fontSize: width * 0.035,
    fontFamily: "Poppins-Regular",
  },
  appointmentSubWrapper: {
    backgroundColor: "#BAA793",
    padding: width * 0.03,
    margin: width * 0.01,
    borderRadius: width * 0.02,
    shadowRadius: width * 0.007,
  },
  headerWrapper: {
    padding: width * 0.01,
    marginBottom: height * 0.02,
    margin: width * 0.01,
    borderRadius: width * 0.02,
  },
  subTextWrapper: {
    fontSize: width * 0.05,
    padding: width * 0.02,
    color: colors.text_brown,
    fontFamily: "Merriweather-Regular",
  },
  headerTextWrapper: {
    fontSize: width * 0.08,
    color: colors.background,
    fontFamily: "Merriweather-Regular",
  },
  textStyle: {
    fontSize: width * 0.06,
    color: colors.text_brown,
    fontFamily: "Poppins-Regular",
  },
  logout: {
    fontSize: width * 0.05,
    marginLeft: width * 0.02,
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