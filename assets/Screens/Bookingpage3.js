import * as React from 'react';
import { Text,View, StyleSheet,SafeAreaView, FlatList,Dimensions} from 'react-native';
import { useRoute } from '@react-navigation/native';
import colors from '../Colors/colors';
import StepIndicator from 'react-native-step-indicator';
import {collection,addDoc,doc,getDoc} from 'firebase/firestore';
import { database } from '../Config/firebase';
import { useState,useEffect } from 'react';
import Button from '../Components/CustomButton';
import { Authentication } from '../Config/firebase';

//custom styles for the step indicator
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

//label for the step indicator
const labels = ["Menu","Date","Confirmation"];

const { width, height } = Dimensions.get('window');

function Bookingpage3({navigation}) {

  const route = useRoute();

  // Setting up state variables to hold course data, selected time, and price
  const [course,setCourse] = useState([]);
  const [time,setTime] = useState(null);
  const [price,setPrice] = useState(null);

  // Retrieving the current user's ID from Firebase Authentication
  const user = Authentication.currentUser?.uid;

  // Extracting the course object passed as a parameter through route.params
  const courseMap = route.params.paramAdded;

  // Fetching the course data from Firestore when the component mounts
  useEffect(() => {
    GetCourse();
  },[])

  //updates the total price and the total estimated time taken of the selected course
  //sets the map into the list
  const GetCourse = async () =>{

    const list = [];
    let totalPrice = 0;
    let totalTime = 0;  

    for (const key in courseMap) {
      if (courseMap[key] === true) {
        const Ref = doc(database, "Booking_Course", key);
        const docSnap = await getDoc(Ref);
        list.push(docSnap.data().Course_name);
        totalPrice += docSnap.data().price;
        totalTime += docSnap.data().time;
        }
    }
    setCourse(list);
    setTime(totalTime);
    setPrice(totalPrice);
  }

  //Adds data to the database
  const AddData2 = async () => {
      const docRef = await addDoc(collection(database, "Booking_Appointment"), {
        date:route.params.paramDate,
        time:route.params.paramKey,
        course:course,
        timeTaken:time,
        price: price,
        uid: user,
      });

  };

  //UI component for the flatlist
  const renderItem = ({ item }) => (
    <View style = {styles.courseContainer}>
      <View style = {styles.courseHeader}>
        <Text style = {styles.courseText}>{item}</Text>
      </View>
    </View>
  );

  //Handles booking button
  const BookingHandle = () =>{
    AddData2();
    navigation.navigate('Booking4');
  }

  //The UI componenet part of the screen
  return (
    <View style = {styles.Container}>
      <SafeAreaView>
        <View style = {styles.stepIndicator}>
          <StepIndicator customStyles={customStyles}
          currentPosition = {2}
          labels ={labels}
          stepCount = {3}/>
        </View>

        <View style = {styles.DetailContainer}>
          <View style = {styles.ContainerHeader}>
            <Text style = {styles.Header}>Booking Details</Text>
          </View>
          <View style = {styles.ContainerElement}>
            <Text style = {styles.Header2}>Selected Course</Text>   
            <FlatList
            style = {styles.FlatList} 
            data={course}
            renderItem={renderItem}
            showsVerticalScrollIndicator = {false}
            />
            </View>
          <View style = {styles.ContainerElement}>
            <Text style = {styles.Header2}>Total Price</Text>
            <Text style = {styles.Text1}>{price} yen</Text>
          </View>
          <View style = {styles.ContainerElement}>
            <Text style = {styles.Header2}>Estimated Time Taken</Text>
            <Text style = {styles.Text1}>{time} min</Text>
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
            <Text style = {styles.Header2}>Date & Time</Text>
            <Text style = {styles.Text1}>{route.params.paramDate}  {route.params.paramKey} </Text>
          </View>
        </View>
        <View style = {styles.Button}>
          <Button onPress ={()=> BookingHandle()} title = 'CONFIRM' backgroundColor = {colors.secondary_green} fontFamilly = {"Poppins-SemiBold"}>
          </Button>
        </View>
      </SafeAreaView>
    </View>
  );
}

//Stylesheet for the UI components
const styles = StyleSheet.create
({
  stepIndicator: 
  {
    paddingVertical: height * 0.025,
  },
  Container: 
  {
    flex:1,
  },
  DetailContainer: 
  {
    marginHorizontal:width * 0.05,
    marginBottom:height * 0.02,

  },
  Header:
  {
    fontFamily:'Merriweather-Bold',
    fontSize:height * 0.025,
    fontWeight:'bold',
    color: colors.text_brown
  },
  ContainerHeader:
  {
    marginBottom:height * 0.05,
  },
  Header2:
  {
    fontFamily:'Merriweather-Bold',
    fontSize:height * 0.02,
    fontWeight:'bold',
    color: colors.text_brown
  },
  Text1:
  {
    fontFamily:'Poppins-Medium',
    fontSize:height * 0.018,
    color: "#181A18",
    marginTop:height * 0.01,
  },
  ContainerElement: 
  {
    marginBottom: height * 0.025,
  },
  courseContainer:
  {
    paddingVertical:height * 0.008,
  },
  courseText:
  {
    fontFamily:'Poppins-Medium',
    fontSize:height * 0.018,
  },
  Button:
  {
    alignItems:'center',
  }

})

export default Bookingpage3