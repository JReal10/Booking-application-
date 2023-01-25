import * as React from 'react';
import { Text,View, StyleSheet,SafeAreaView, ScrollView,Modal} from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import FowardButton from '../Components/FowardButton';
import { Calendar } from 'react-native-calendars';
import colors from '../Colors/colors';
import Time from '../Components/Time';
import { useEffect } from 'react';
import {doc,getDocs,collection,where,query,getDoc} from 'firebase/firestore';
import { database } from '../Config/firebase';

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

  const [date,setDate] = React.useState(new Date());
  const [time,setTime] = React.useState("");
  const [course,setCourse] = React.useState("");
  const [name, setName] = React.useState("");
  const [email,setEmail] = React.useState("");
  const [showTime,setShowTime] = React.useState(false);
  const [price,setPrice] = React.useState([]);
  const [timeTaken,setTimeTaken] = React.useState([]);
  
  const currentDate = new Date();

  const GetTotalTimeAndPrice = (data)=>{
    const TotalValue = (data.reduce((a,v) =>  a = a + v, 0 ));
    return TotalValue;
  }

  const GetUserDetail = (data)=>{
  }

  useEffect(() => {
    GetCourse();
    GetUser();
  },[])

  const GetCourse = async ()=>{
    const a = [];
    const price = [];
    const TimeTaken = [];
    const Ref = collection(database, "Booking_Course");
    
    // Create a query against the collection.
    const q = query(Ref, where("isAdded", "==", true));
    
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
            a.push(doc.data().Course_name),
            price.push(doc.data().price),
            TimeTaken.push(doc.data().time)
    })

    setCourse(a);
    setPrice(price);
    setTimeTaken(TimeTaken);
    }

  const GetUser = async() => {

    const Ref = doc(database, "Booking_User","Jamie");
    const docSnap = await getDoc(Ref);

    const data = docSnap.exists() ? docSnap.data() : null
    if (data === null || data === undefined) return null
    setName(data.name);
    setEmail(data.email);
  }

  const BookingHandle = () =>{
    const TotalPrice = GetTotalTimeAndPrice(price);
    const TotalTimeTaken = GetTotalTimeAndPrice(timeTaken);


    navigation.navigate('Booking3',{paramKey:time, paramDate:date, paramCourse:course, paramPrice: TotalPrice, paramTotalTimeTaken: TotalTimeTaken, paramName:name,paramEmail:email});
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

          <Text style = {styles.AvailableTime} >Available Time</Text>

          {showTime ? <Time changeTime = {time => setTime(time)}/> : null}

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
  AvailableTime: 
  {
    paddingHorizontal:12,
    fontSize: 16,
    color: colors.text_brown,
    paddingVertical: 25,
    fontWeight: 'bold'

  },
  ButtonContainer: 
  {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingBottom:20,
  },
  TabNavSpace: 
  {
    paddingVertical:40,
  }
})

export default Bookingpage2