import React from "react";
import { View,Text,StyleSheet,FlatList } from "react-native";
import colors from "../Colors/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { query, getDocs,getDoc,doc, collection, where } from 'firebase/firestore';
import { database } from '../Config/firebase';
import { useEffect,useState } from 'react';
import { Authentication } from '../Config/firebase';
import { signOut } from 'firebase/auth';
import { SafeAreaView } from "react-native-safe-area-context";
import { useIsFocused } from "@react-navigation/native";

const CustomDrawer = ({navigation}) =>
{
  const user = Authentication.currentUser?.uid
  const [name, setName] = useState("");
  const [course,setCourse] = useState("");
  const [refreshing, setRefreshing] = useState(true);
  const isFocused = useIsFocused();

  useEffect(() => {
    GetAppointment(user);
    GetUser(user);
  },[isFocused])

  const logout =() =>
  {
    signOut(Authentication)
    .then((re) => 
    {
    }).catch
    {
    }
  }

  const collectIdsAndDocs = (doc) => {
    return {id: doc.id, ...doc.data()};
  };

  const GetUser = async(user) => {

    const Ref = doc(database, "Booking_User",user);
    const docSnap = await getDoc(Ref);

    const data = docSnap.exists() ? docSnap.data() : null
    if (data === null || data === undefined) return null

    setName(data.name);
  }

  const GetAppointment = async (userID)=>{
    const Ref = collection(database, "Booking_Appointment");
    
    // Create a query against the collection.
    const q = query(Ref, where("uid", "==", userID));
    
    const querySnapshot = await getDocs(q);
    const list = querySnapshot.docs.map(collectIdsAndDocs);
    
    setCourse(list);
  }

  const renderItem = ({item}) => (
    <View style = {styles.courseContainer}>
      <Text style = {styles.courseHeader}>COURSE:</Text>
        <View>
        {(item.course).map(item => (
        <Text style ={styles.courseText} key={item}> {item}</Text>
        ))}
      </View>
      <View style = {styles.courseDetailContainer}>
      <View style = {styles.time}>
        <Text style = {styles.courseDetailText}>Date: {item.date} min</Text>
      </View>

      <Text style = {styles.courseDetailText}>Estimated time: {item.timeTaken} min</Text>

      <Text style = {styles.courseDetailText}>Price: {item.price} yen</Text>
      </View>
    </View>
  );

  const ItemDivider = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#00000030",
        }}
      />
    );
  }

  return (
    <SafeAreaView style = {styles.Wrapper}> 
    <View style = {styles.HeaderWrapper}>
      <Text style = {styles.HeaderTextWrapper}>Welcome</Text>
      <Text style = {styles.HeaderTextWrapper}>Back</Text>
      <Text style = {styles.UserName}>{name}</Text>
    </View>  
      <View style = {styles.AppointmentHeaderWrapper}>
      <Text style = {styles.SubTextWrapper}>Next Appointment</Text>
      </View>
      {(course != "")? 
          <FlatList
            style = {styles.FlatList} 
            data={course}
            renderItem={renderItem}
            ItemSeparatorComponent={ItemDivider}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator = {false}
            />: 
            (<View style = {styles.NoAppWrapper}><Text style = {styles.NoAppText}>No Appointment Booked</Text></View>)
        }
        <TouchableOpacity onPress={() => {logout()}} style={{paddingVertical: 30,paddingHorizontal:15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <MaterialIcons name = 'logout' size = {32} color = {colors.text_brown} />
            <Text style = {styles.Logout}>
              Log Out
            </Text>
          </View>
        </TouchableOpacity>
    </SafeAreaView>
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
  Logout:
  {
    fontSize: 20,
    marginLeft: 5,
    color: colors.text_brown,
    fontFamily:'Poppins-Regular'
  },
  NoAppWrapper:
  {
    alignItems:'flex-start',
    paddingHorizontal:10,
    paddingVertical:'5%',
    justifyContent:'space-evenly'
  },
  NoAppText:
  {
    fontFamily:'Poppins-Regular',
    fontSize:16,
    color:'#66554195',
    textDecorationLine:'underline'    
  },
  FlatList:
  {
    height:'90%'
  },
  HeaderText: 
  {
    fontFamily:'Merriweather-Regular',
    fontSize: 16,
    color: colors.text_brown,
  },
  TimeText: 
  {
    fontFamily:'Poppins-Regular',
    fontSize:16,
    color: '#828282',
    marginLeft: '2%'
  },
  courseText:{
    fontFamily:'Poppins-Regular',
    fontSize: 16,
    color: '#626262'
  },
  courseSubText:
  {
    fontFamily:'Poppins-Regular',
    fontSize: 16,
    color: '#626262'

  },
  courseDetailText:{
    fontFamily:'Poppins-Regular',
    fontSize: 14,
    color: '#626262',
    paddingVertical:'1%'
  },
  courseDetailContainer:{
    paddingVertical:'3%'
  },
  courseContainer:
  {
    flexDirection: 'column',
    paddingVertical:'2%',
    padding:'2%',
  },
  courseHeader:
  {
    fontFamily:'Poppins-Regular',
    fontSize: 18,
    color: '#626262' },
})

export default CustomDrawer;