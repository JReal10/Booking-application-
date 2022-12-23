import React from "react";
import { View,Text,StyleSheet } from "react-native";
import { DrawerContentScrollView,DrawerItemList  } from "@react-navigation/drawer";
import colors from "../Colors/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const CustomDrawer = (props) =>
{
  return (
    <View style = {styles.Wrapper}> 
    <DrawerContentScrollView {...props}>
    <View style = {styles.HeaderWrapper}>
      <Text style = {styles.TextWrapper}>Welcome</Text>
      <Text style = {styles.TextWrapper}>Back!</Text>
      <Text style = {styles.UserName}>Jamie Ogundiran</Text>
    </View>   
    <DrawerItemList {...props}/>
    </DrawerContentScrollView>

    <View>
        <TouchableOpacity onPress={() => {}} style={{paddingVertical: 30,paddingHorizontal:15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <MaterialIcons name = 'logout' size = {32} color = {colors.text_brown} />
            <Text style = {styles.Logout}>
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  Wrapper:
  {
    flex:1,
    backgroundColor:colors.primary_brown,
  },
  HeaderWrapper:
  {
    padding:5,
    marginBottom:20,
    margin:5,
    borderRadius:8,
  },
  TextWrapper:
  {
    fontSize:32,
    color:colors.background,
  },
  UserName:
  {
    fontSize: 20,
    paddingTop:15,
    color:colors.background,
  },
  Logout:
  {
    fontSize: 20,
    marginLeft: 5,
    color: colors.text_brown,
  }
})

export default CustomDrawer;