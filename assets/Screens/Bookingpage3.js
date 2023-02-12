import * as React from 'react';
import { Text,View, StyleSheet,SafeAreaView, ScrollView} from 'react-native';
import { useRoute } from '@react-navigation/native';
import colors from '../Colors/colors';
import StepIndicator from 'react-native-step-indicator';
import FowardButton from '../Components/FowardButton';
import {doc,setDoc} from 'firebase/firestore';
import { database } from '../Config/firebase';
import { useState,useEffect } from 'react';
import { Authentication } from '../Config/firebase';

const customStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize:35,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 2,
  stepStrokeCurrentColor: colors.secondary_green,
  stepStrokeWidth: 2,
  stepStrokeFinishedColor: colors.secondary_green,
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: colors.secondary_green,
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: colors.secondary_green,
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: colors.secondary_green,
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 15,
  currentStepLabelColor: colors.secondary_green
}

const labels = ["Menu","Date","Confirmation"];

function Bookingpage3({navigation}) {

  const route = useRoute();
  const user = Authentication.currentUser?.uid

  const [date,setDate] = useState("");
  const [time,setTime] = useState("");
  const [course,setCourse] = useState([]);
  const [price,setPrice] = useState("");
  const [timeTaken,setTimeTaken] = useState("");

  useEffect(() => {
    setData();
  },[])

  const setData = () => {
    setDate(route.params.paramDate);
    setCourse(route.params.paramCourse);
    setTime(route.params.paramKey);
    setPrice(route.params.paramPrice);
    setTimeTaken(route.params.paramTotalTimeTaken);
  }


  const AddData = async (date,time,course,timeTaken, price) => {
    
    const Ref = doc(database, "Booking_User",user);
    const data = {
      date: date,
      time: time,
      course:course,
      timeTaken:timeTaken,
      price: price,
      appointmentCreated:true
    };
  
    await setDoc(Ref, data,{merge:true})
  };

  const BookingHandle = () =>{
    AddData(date,time,course,timeTaken,price);
    navigation.navigate('Booking4');
  }

  return (
    <View style = {styles.Container}>
      <SafeAreaView>
        <ScrollView>
          <View style = {styles.stepIndicator}>
          <StepIndicator customStyles={customStyles}
          currentPosition = {2}
          labels ={labels}
          stepCount = {3}/>
          </View>

          <View style = {styles.Container1}>
            <View style = {styles.ContainerHeader}>
              <Text style = {styles.Header}>Booking Details</Text>
            </View>
            <View style = {styles.ContainerElement}>
              <Text style = {styles.Header2}>Selected Course</Text>
              {course.map((item, key)=>(
              <Text key={key} style={styles.Text1}> {item} </Text>))}
              <Text style = {styles.Text1}>Total Price: {route.params.paramPrice} </Text>
              <Text style = {styles.Text1}>Time Taken: {route.params.paramTotalTimeTaken} </Text>
            </View>
            <View style = {styles.ContainerElement}>
              <Text style = {styles.Header2}>Name</Text>
              <Text style = {styles.Text1}>{route.params.paramName}</Text>
            </View>
            <View style = {styles.ContainerElement}>
              <Text style = {styles.Header2}>Email</Text>
              <Text style = {styles.Text1}>{route.params.paramEmail}</Text>
            </View>
            <View style = {styles.ContainerElement}>
              <Text style = {styles.Header2}>Date</Text>
              <Text style = {styles.Text1}>{route.params.paramDate}</Text>
            </View>
            <View style = {styles.ContainerElement}>
              <Text style = {styles.Header2}>Time</Text>
              <Text style = {styles.Text1}>{route.params.paramKey}</Text>
            </View>
          </View>
          <FowardButton title = 'CONTINUE' onPress={() => BookingHandle()}/>
          <View style = {styles.TabNavSpace}/>
          </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create
({
  stepIndicator: 
  {
    paddingVertical: '8%',
    paddingHorizontal:'5%',
    borderBottomWidth:1,
    borderBottomColor: '#B0B0B0'
  },
  Container: 
  {
    flex:1
  },
  TabNavSpace: 
  {
    paddingVertical:20,
  },
  Container1: 
  {
    marginVertical: 15,
    marginHorizontal:12,
    backgroundColor: colors.secondary_green,
    paddingTop: 30,
    paddingHorizontal:28,
    borderRadius:8,
  },
  Header:
  {
    fontFamily:'Merriweather-Bold',
    fontSize:24,
    fontWeight:'bold',
    color: colors.text_white
  },
  ContainerHeader:
  {
    marginBottom:28,
    borderBottomWidth:1,
    borderColor: '#FFFFFF80'
  },
  Header2:
  {
    fontFamily:'Merriweather-Bold',
    fontSize:20,
    fontWeight:'bold',
    color: colors.text_white
  },
  Text1:
  {
    fontFamily:'Poppins-Regular',
    fontSize:18,
    color: colors.text_white,
    marginTop:7,
  },
  ContainerElement: 
  {
    marginBottom: 24,
  }
})

export default Bookingpage3