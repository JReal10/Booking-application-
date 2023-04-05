import React from "react";
import { View,Text,StyleSheet,FlatList,Dimensions } from "react-native";
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

const { width, height } = Dimensions.get('window');

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
        <TouchableOpacity onPress={() => {logout()}} style={styles.logoutContainer}>
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
    paddingTop: height * 0.01,
  },
  HeaderWrapper:
  {
    padding: width * 0.01,
    marginBottom: height * 0.03,
    margin: width * 0.01,
    borderRadius: width * 0.02,
  },
  SubTextWrapper:{
    fontSize: width * 0.05,
    padding: width * 0.02,
    color: colors.text_brown,
    fontFamily:'Merriweather-Regular'
  },
  HeaderTextWrapper:
  {
    fontSize: width * 0.08,
    color: colors.background,
    fontFamily: 'Merriweather-Regular',
  },
  UserName:
  {
    fontSize: width * 0.05,
    paddingTop: height * 0.02,
    color: colors.background,
    fontFamily: 'Merriweather-Regular',
  },
  Logout:
  {
    fontSize: width * 0.05,
    marginLeft: width * 0.01,
    color: colors.text_brown,
    fontFamily: 'Poppins-Regular',
  },
  NoAppWrapper:
  {
    alignItems: 'flex-start',
    paddingHorizontal: width * 0.03,
    paddingVertical: height * 0.05,
    justifyContent: 'space-evenly',
  },
  NoAppText: {
    fontFamily: 'Poppins-Regular',
    fontSize: width * 0.04,
    color: '#66554195',
    textDecorationLine: 'underline',
  },
  FlatList: {
    height: height * 0.9,
  },
  courseText: {
    fontFamily: 'Poppins-Regular',
    fontSize: width * 0.04,
    color: '#626262',
  },
  courseDetailText:{
    fontFamily: 'Poppins-Regular',
    fontSize: width * 0.035,
    color: '#626262',
    paddingVertical:height * 0.005
  },
  courseDetailContainer:{
    paddingVertical:height * 0.005
  },
  courseContainer:
  {
    flexDirection: 'column',
    paddingVertical:height * 0.005,
    paddingHorizontal:width * 0.01,
  },
  courseHeader:
  {
    fontFamily:'Poppins-Regular',
    fontSize: 18,
    color: '#626262' 
  },
  logoutContainer:
  {
    paddingVertical:height * 0.02,
    paddingHorizontal:width * 0.02,
  }
})

export default CustomDrawer;