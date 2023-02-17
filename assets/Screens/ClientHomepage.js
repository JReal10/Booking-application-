import * as React from 'react';
import { Text,View, StyleSheet,SafeAreaView,TouchableOpacity, ScrollView } from 'react-native';
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
        <ScrollView>
          <View>
          <Text>Appointment</Text>
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
    alignItems: 'center',
    backgroundColor:colors.background,
  }
})


export default ClientHomeage;