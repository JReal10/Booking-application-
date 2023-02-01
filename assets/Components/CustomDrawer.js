import React from "react";
import { View,Text,StyleSheet } from "react-native";
import { DrawerContentScrollView,DrawerItemList  } from "@react-navigation/drawer";
import colors from "../Colors/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { doc, getDoc } from 'firebase/firestore';
import { database } from '../Config/firebase';
import { useEffect,useState } from 'react';
import { Authentication } from '../Config/firebase';
import { signOut } from 'firebase/auth';
import { useFonts } from "expo-font";

const CustomDrawer = (props) =>
{
  useEffect(() => {
    GetUser();
  },[])

  const [name, setName] = useState("");
  const [date,setDate] = useState("");
  const [time,setTime] = useState("");
  const [course,setCourse] = useState([]);
  const [price,setPrice] = useState("");
  const [timeTaken,setTimeTaken] = useState("");

  const logout =() =>
  {
    signOut(Authentication)
    .then((re) => 
    {
    }).catch
    {
    }
  }

  const GetUser = async() => {

    const Ref = doc(database, "Booking_User","Jamie");
    const docSnap = await getDoc(Ref);

    const data = docSnap.exists() ? docSnap.data() : null
    if (data === null || data === undefined) return null
    
    setName(data.name);
    setDate(data.date);
    setTime(data.time);
    setCourse(data.course);
    setPrice(data.price);
    setTimeTaken(data.timeTaken);
  }

  return (
    <View style = {styles.Wrapper}> 
    <DrawerContentScrollView {...props}>
    <View style = {styles.HeaderWrapper}>
      <Text style = {styles.HeaderTextWrapper}>Welcome</Text>
      <Text style = {styles.HeaderTextWrapper}>Back</Text>
      <Text style = {styles.UserName}>{name}</Text>
    </View>   
    <DrawerItemList {...props}/>

        <View style = {styles.AppointmentHeaderWrapper}>
        <Text style = {styles.SubTextWrapper}>Next Appointment</Text>
        </View>
        <View style = {styles.ApoointmentSubWrapper}>
        <View style = {styles.DateTimeWrapper}>
        <Text style = {styles.TextStyle}>{date}</Text>
        <Text style = {styles.TextStyle}>{time}</Text>
        </View>

        <Text style = {styles.CourseHeaderWrapper}>Course:</Text>
        { course.map((item, key)=>(
         <Text key={key} style={styles.CourseTextStyle}> {item} </Text>)
         )}
 
        <View style = {styles.TimePriceWrapper}>
        <Text style = {styles.TextStyle2} >Price: ${price}</Text>
        <Text style = {styles.TextStyle2} >Aprox. Time: {timeTaken} min.</Text>
        </View>
      </View>
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
  UserName:
  {
    fontSize: 20,
    paddingTop:15,
    color:colors.background,
    fontFamily:'Merriweather-Regular'
  },
  TimePriceWrapper:{
    justifyContent: 'space-between',
    flexDirection:'row',
    paddingTop: 15,
    paddingBottom:5,
  },
  CourseHeaderWrapper:{
    paddingTop:5,
    paddingBottom:3,
    fontSize: 16, 
    color:colors.text_brown,
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

export default CustomDrawer;