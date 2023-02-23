import * as React from 'react';
import { Text,View, StyleSheet,SafeAreaView,TouchableOpacity, ScrollView,StatusBar } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import colors from '../Colors/colors';
import AppLoading from 'expo-app-loading';
import useFonts from '../Hooks/useFonts';
import { database } from '../Config/firebase';
import { getDoc,doc } from 'firebase/firestore';
import { useState,useEffect }from 'react';

function ClientHomeage({navigation}){

  const [IsReady, SetIsReady] = useState(false);

  useEffect(() => {
    //GetUser();
  },[])

  const GetUser = async() => {

    const Ref = doc(database, "Booking_User",user);
    const docSnap = await getDoc(Ref);

    const data = docSnap.exists() ? docSnap.data() : null
    if (data === null || data === undefined) return null
    
    if (data.appointmentCreated == true){
    setName(data.name);
    setDate(data.date);
    setTime(data.time);
    setCourse(data.course);
    setPrice(data.price);
    setTimeTaken(data.timeTaken);
    setAppointmentCreated(true);
    }
    else
    {
      setName(data.name)
      setAppointmentCreated(false);
    }
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
        <ScrollView>
          <View style = {styles.appoContainer}>
          <View style = {styles.headerWrapper}>
          <Text style = {styles.headerStyle}>Today's Appointments</Text>
          </View>
          <View style = {styles.subTextWrapper}>
            <Text style = {styles.subTextStyle}>There are no appointment today..</Text>
          </View>
          <View style = {styles.headerWrapper}>
          <Text style = {styles.headerStyle}>Future Appointments</Text>
          </View>
          </View>
        </ScrollView>
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
  }
})


export default ClientHomeage;