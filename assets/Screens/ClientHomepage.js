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

function ClientHomeage({}){

  const [AppointmentFuture, setApointmentFuture] = useState("");
  const [AppointmentToday, setApointmentToday] = useState("");
  const [appointment,setAppointment] = useState("");
  const [refreshing, setRefreshing] = useState(true);
  const [IsReady, SetIsReady] = useState(false);
  const isFocused = useIsFocused();
  const [count, setCount] = useState(0);
  const [day, setDay] = useState(0);
  const [appointmentHist, setAppointmentHist] = useState([]);

  useEffect(() => {

    if(refreshing){  
    GetAppointment();
    setRefreshing(false);
    loadCount();
    }
    if (isFocused){
      autoDelete();
    }
  },[refreshing,isFocused])

  const loadCount = async () => {
    const storedCount = await AsyncStorage.getItem('count');
    if (storedCount !== null) {
      setCount(parseInt(storedCount));
    }
    const storedDay = await AsyncStorage.getItem('day');
    if (storedDay !== null) {
      setDay(parseInt(storedDay));
    }
    const storedAppo = await AsyncStorage.getItem('appoData');
    if (storedAppo !== null) {
      setAppointmentHist(JSON.parse(storedAppo));
    }
  };

  const autoDelete = async()=>{

    const today = new Date();
    const dayOfMonth = today.getDate();
    AsyncStorage.setItem('day', dayOfMonth.toString());

    // compare the date parts of the two Date objects

    if(dayOfMonth == 1)
    {
      AsyncStorage.setItem('count', "0");
    }

    for (let i = 0; i < appointment.length; i++) {
      const item = appointment[i];
      const DATE = new Date(item.date); 

      const isPastDate = DATE < today

      if (isPastDate){
        const newCount = count + 1;
        const Ref = doc(database, "Booking_Appointment", item.id);
        setCount(newCount);
        AsyncStorage.setItem('count', newCount.toString());
        appointmentHist.push(item)
        const aString = JSON.stringify([appointmentHist]);
        await AsyncStorage.setItem('appoData', aString);

        await deleteDoc(Ref);
    }
    }
    setRefreshing(true);
  }

  const deleteAppointment = async(id)=>{
    await deleteDoc(doc(database, "Booking_Appointment", id));
    setRefreshing(true);
  }

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


  const collectIdsAndDocs = (doc) => {
    return {id: doc.id, ...doc.data()};
  };

  const GetAppointment = async() => {

    const Ref = collection(database, "Booking_Appointment");

    //SetData is wrong use an if statement
    const docSnap = await getDocs(Ref);
    const list = docSnap.docs.map(collectIdsAndDocs);

    
    const FutureApp = []
    const TodayApp = []
    // get the current date
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


export default ClientHomeage;