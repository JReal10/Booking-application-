import * as React from 'react';
import { Text,View, StyleSheet,SafeAreaView,TouchableOpacity, ScrollView,StatusBar,FlatList } from 'react-native';
import colors from '../Colors/colors';
import AppLoading from 'expo-app-loading';
import useFonts from '../Hooks/useFonts';
import { database } from '../Config/firebase';
import { deleteDoc,doc,collection,getDocs } from 'firebase/firestore';
import { useState,useEffect }from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function AdminHomepage(){

  const [AppointmentFuture, setApointmentFuture] = useState(""); // state variable to hold future appointments
  const [AppointmentToday, setApointmentToday] = useState(""); // state variable to hold today's appointments
  const [appointment,setAppointment] = useState(""); // state variable to hold all appointments
  const [refreshing, setRefreshing] = useState(true); // state variable to force a component re-render
  const [IsReady, SetIsReady] = useState(false); // state variable to determine if the font is loaded
  const isFocused = useIsFocused(); // hook to determine if the component is in focus
  const [count, setCount] = useState(0); // state variable to hold the count of appointments deleted
  const [day, setDay] = useState(0); // state variable to hold the current day
  const [appointmentHist, setAppointmentHist] = useState([]); // state variable to hold the deleted appointments' history

  useEffect(() => {

    if(refreshing){  
      GetAppointment(); // function to get all appointments from Firestore
      setRefreshing(false);
      loadCount(); // function to load the count of deleted appointments from AsyncStorage
      }
      if (isFocused){
        autoDelete(); // function to delete appointments that have already passed
      }
  },[refreshing,isFocused])

  const loadCount = async () => {
    const storedCount = await AsyncStorage.getItem('count'); // retrieve the count from AsyncStorage
    if (storedCount !== null) {
      setCount(parseInt(storedCount)); // convert the stored count to an integer and set it to the state variable
    }
    const storedDay = await AsyncStorage.getItem('day'); // retrieve the current day from AsyncStorage
    if (storedDay !== null) {
      setDay(parseInt(storedDay)); // convert the stored day to an integer and set it to the state variable
    }
    const storedAppo = await AsyncStorage.getItem('appoData'); // retrieve the deleted appointments' history from AsyncStorage
    if (storedAppo !== null) {
      setAppointmentHist(JSON.parse(storedAppo)); // parse the stored JSON string and set the result to the state variable
    }
  };

  const autoDelete = async()=>{

    const today = new Date(); // get the current date
    const dayOfMonth = today.getDate(); // get the day of the month
    AsyncStorage.setItem('day', dayOfMonth.toString()); // store the day of the month to AsyncStorage

    if(dayOfMonth == 1) // if it's the first day of the month
    {
      AsyncStorage.setItem('count', "0"); // reset the count to 0 and store it to AsyncStorage
    }

    for (let i = 0; i < appointment.length; i++) { 
      const item = appointment[i]; 
      const DATE = new Date(item.date); // create a new Date object for the appointment date

      const isPastDate = DATE < today // determine if the appointment date is in the past

      if (isPastDate){ // if the appointment date is in the past
        const newCount = count + 1; // increment the count of deleted appointments
        const Ref = doc(database, "Booking_Appointment", item.id); 
        setCount(newCount); // set the new count to the state variable
        AsyncStorage.setItem('count', newCount.toString()); // store the new count to AsyncStorage
    }
    }
    setRefreshing(true);
  }

  // This function deletes an appointment with the specified ID from the database, and then sets the refreshing state to true to trigger a re-rendering of the component that displays the appointment list
  const deleteAppointment = async(id)=>{
    await deleteDoc(doc(database, "Booking_Appointment", id));
    setRefreshing(true);
  }

  // This function renders a single appointment item with the specified data
  const renderItem = ({ item }) => (
    <View style = {styles.itemContainer}>
        <Text style = {styles.courseHeader}>COURSE:</Text>
        <View>
        {(item.course).map(item => (
        <Text style ={styles.courseText} key={item}> {item}</Text>
        ))}
      </View>
      <View style = {styles.courseDetailContainer}>
      <Text style = {styles.courseDetailText}>Date: {item.date}</Text>
      <Text style = {styles.courseDetailText}>time: {item.time}</Text>
      <Text style = {styles.courseDetailText}>Price: {item.price} yen</Text>
      </View>
      
      <TouchableOpacity onPress={()=>{(deleteAppointment(item.id)),    setRefreshing(false)}}>
      <View style = {styles.deleteContainer}>
      <Entypo name = 'cross' size = {20} color = {colors.text_white} />
      <Text style = {styles.itemDeleteStyle}>Delete Appointment</Text>
      </View> 
      </TouchableOpacity>
    </View>
  );

  // This function takes a document snapshot from the database and returns an object with the document ID and data
  const collectIdsAndDocs = (doc) => {
    return {id: doc.id, ...doc.data()};
  };

  // This function retrieves all appointments from the database, categorizes them into "Today" and "Future" appointments, and sets the state variables accordingly
  const GetAppointment = async() => {

    const Ref = collection(database, "Booking_Appointment");

    const docSnap = await getDocs(Ref);
    const list = docSnap.docs.map(collectIdsAndDocs);

    
    const FutureApp = []
    const TodayApp = []
    const today = new Date();

    // compare the date parts of the two Date objects

    for (let i = 0; i < list.length; i++) {
      const item = list[i];
      const DATE = item.date + "T" + item.time + ":00"; 
      const newDATE = new Date(DATE);

      const isToday = newDATE.getDate() === today.getDate() &&
      newDATE.getMonth() === today.getMonth() &&
      newDATE.getFullYear() === today.getFullYear();

      if (isToday){
        TodayApp.push(item)
      }else{
        FutureApp.push(item)
      }
    }
    setApointmentFuture(FutureApp);
    setApointmentToday(TodayApp);
    setAppointment(list);
  }

  const FetchFonts = async () => {
    await useFonts();
  };

  if (!IsReady) {
    return (
      <AppLoading
        startAsync={FetchFonts}
        onFinish={() => SetIsReady(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  return (
    <View style ={styles.Container}>
      <SafeAreaView style = {styles.contentContainer}>
        <StatusBar barStyle={'dark-content'}></StatusBar>
        <View>
          <View style = {styles.appoContainer}>
          <View>
          <Text style = {styles.headerStyle}>Today's Appointments</Text>
          </View>
          {
          (AppointmentToday != "")?
          (<View style = {styles.AppointmentView2}>
          <FlatList
          style= {styles.FlatList}
          data={AppointmentToday}
          renderItem={renderItem}
          keyExtractor={(item) => item.key}
          />
          </View>):
          <View style = {styles.subTextWrapper}>
            <Text style = {styles.subTextStyle}>There are no appointment today..</Text>
         </View>
          }
          <View style = {styles.headerWrapper}>
          <Text style = {styles.headerStyle}>Future Appointments</Text>
          </View>
          {
          (AppointmentFuture != "")?(
          <View style={styles.AppointmentView}>
          <FlatList
          style= {styles.FlatList}
          data={AppointmentFuture}
          renderItem={renderItem}
          keyExtractor={(item) => item.key}
          />
          </View>):
          <View style = {styles.subTextWrapper}>
            <Text style = {styles.subTextStyle}>There are no future appointments</Text>
          </View>
          }
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
const styles = StyleSheet.create
({
  Container:
  {
    flex:1
  },
  TabNavSpace: 
  {
    paddingVertical:40,
  },
  contentContainer:
  {
    height:'100%',
    justifyContent: 'space-between',
    backgroundColor:colors.background,
  },
  headerStyle:
  {
    textAlign:'left',
    fontSize:16,
    fontFamily:'Merriweather-Regular',
    color: colors.text_brown,
  },
  subTextStyle:
  {
    textAlign:'center',

  },
  subTextWrapper:
  {
    paddingVertical:'20%',
    opacity:0.5,
  },
  appoContainer:
  {
    paddingTop:'10%',
    padding:20,
  },
  headerWrapper2:
  {
    alignItems:'center',
    paddingVertical:'5%'
  },
  itemContainer:
  {
    marginVertical:'1%',
    padding:'2%',
    borderRadius:8,
    backgroundColor:colors.primary_brown
  },
  itemDeleteStyle:
  {
    fontSize:'15',
    fontFamily:'Merriweather-Bold',
    color:colors.text_white,
  },
  deleteContainer:
  {
    alignSelf:'center',
    paddingBottom:'1%',
    paddingVertical:'2%',
    flexDirection:'row',
    alignItems:'center',
  },
  AppointmentView:
  {
    height:'55%',
    marginVertical:'5%'
  },
  AppointmentView2:
  {
    marginVertical:'5%',
    height:'30%',
  },
  FlatList:
  {
    borderRadius:8
  },
  HeaderText: 
  {
    fontFamily:'Merriweather-Regular',
    fontSize: 16,
    color: colors.text_brown,
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
    paddingVertical:'0.5%'
  },
  courseDetailContainer:{
    paddingVertical:'2%'
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
    color: '#626262'
  },
})


export default AdminHomepage;