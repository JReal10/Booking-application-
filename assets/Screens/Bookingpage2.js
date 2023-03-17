import * as React from 'react';
import { Text,View, StyleSheet,SafeAreaView, ScrollView,Modal,Button} from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import CButton from '../Components/CustomButton';
import { Calendar } from 'react-native-calendars';
import colors from '../Colors/colors';
import { useEffect } from 'react';
import {doc,getDocs,collection,where,query,getDoc} from 'firebase/firestore';
import { useRoute } from '@react-navigation/native';
import { Authentication } from '../Config/firebase';
import { database } from '../Config/firebase';
import { useState } from 'react';

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

const getMarkedDates = (date) => {
  const markedDates = {};

  markedDates[date] = {selected: true, selectedColor: colors.secondary_green,selectedTextColor: colors.text_white };

  return markedDates;
};


function Bookingpage2({navigation}) {

  const [date,setDate] = useState(new Date());
  const [name, setName] = useState("");
  const [email,setEmail] = useState("");
  const [timestamp,setTimeStamp] = useState(new Date());
  const [showTime,setShowTime] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");
  const AVAILABLE_TIMES = ['8:00','10:00', '12:00', '14:00', '16:00', '18:00'];
  const [availableTimes, setAvailableTimes] = useState(
    AVAILABLE_TIMES.reduce((obj, time) => {
      obj[time] = false;
      return obj;
    }, {})
  );
  
  const currentDate = new Date();
  const user = Authentication.currentUser?.uid
  const route = useRoute();

  useEffect(() => {
    GetUser();
  },[])
  
  const handleToggle = (time) => {
    console.log(timestamp);
    const updatedTimes = { ...availableTimes };
    Object.keys(updatedTimes).forEach((key) => {
      if (key !== time) {
        updatedTimes[key] = false;
      }
    });
    updatedTimes[time] = !availableTimes[time];
    setAvailableTimes(updatedTimes);
    setSelectedTime(updatedTimes[time] ? time : '');
  };

  const GetUser = async() => {

    const Ref = doc(database, "Booking_User",user);
    const docSnap = await getDoc(Ref);

    const data = docSnap.exists() ? docSnap.data() : null
    if (data === null || data === undefined) return null
    setName(data.name);
    setEmail(data.email);
  }

  const BookingHandle = () =>{
    navigation.navigate('Booking3',{paramKey:selectedTime, paramDate:date, paramName:name,paramEmail:email,paramTimeStamp: timestamp, paramAdded: route.params.paramAdded});
  }


  return (
    <View style = {styles.Container}>
      <SafeAreaView>
        <ScrollView>
          <View style = {styles.stepIndicator}>
          <StepIndicator customStyles={customStyles}
          currentPosition = {1}
          labels ={labels}
          stepCount = {3}/>
          </View>
          <Calendar
          // Handler which gets executed on day press. Default = undefined
          onDayPress={day => {
            setTimeStamp(day.timestamp);
            setDate(day.dateString);
            setShowTime(true);
          }}
          // Handler which gets executed on day long press. Default = undefined
          minDate = {currentDate}
          markedDates={
            getMarkedDates(date)
          }

          style = {{
            borderRadius:10,
            margin:10,
            padding:10,
          }}

          theme = {{
            selectedDayBackgroundColor:colors.background,
            selectedDayTextColor: colors.secondary_green,
            arrowColor: colors.secondary_green,
            calendarBackground: colors.background,
          }}

          // Do not show days of other months in month page. Default = false
          hideExtraDays={true}
          enableSwipeMonths={true} 
          />
          {showTime && ( 
          <View>
          <Text style = {styles.AvailableTime}>Select available time for date:</Text>
          <View style={styles.buttonContainer}>
            {AVAILABLE_TIMES.map((time) => (
              
              <View style = {{width:'33%', marginBottom:'2%'}}>
                  <Button
                    key={time}
                    title={time}
                    onPress={() => handleToggle(time)}
                    color={availableTimes[time] ? colors.secondary_green : colors.icon_dark}
                  />
              </View>
            ))}
            </View>
            </View>)}
            {selectedTime && (
              <Text style={styles.selectedTime}>
                You have selected {selectedTime}
              </Text>
            )}
            {selectedTime && (
              <View style = {styles.customButton}>
              <CButton onPress ={()=> BookingHandle()} title = 'CONFIRM' backgroundColor = {colors.secondary_green} fontFamilly = {"Poppins-SemiBold"}></CButton>
              </View>
            )}


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
  },
  Container: 
  {
    flex:1
  },
  AvailableTime: 
  {
    fontFamily:'Poppins-SemiBold',
    paddingHorizontal:12,
    fontSize: 16,
    color: colors.text_brown,
    paddingVertical: '3%',
    fontWeight: 'bold'

  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap:'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  selectedTime: {
    marginVertical: '5%',
    fontWeight: 'bold',
    paddingHorizontal:12,
    fontSize: 14,
    color: colors.text_brown,
  },
  customButton:
  {
    alignItems:'center'
  }

})

export default Bookingpage2