import * as React from 'react';
import { Text,View, StyleSheet,SafeAreaView, FlatList} from 'react-native';
import { useRoute } from '@react-navigation/native';
import colors from '../Colors/colors';
import StepIndicator from 'react-native-step-indicator';
import {collection,addDoc,Timestamp,doc,getDoc} from 'firebase/firestore';
import { database } from '../Config/firebase';
import { useState,useEffect } from 'react';
import Button from '../Components/CustomButton';
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
  const [course,setCourse] = useState([]);
  const [time,setTime] = useState(null);
  const [price,setPrice] = useState(null);
  const timeStamp = route.params.paramTimeStamp;

  const user = Authentication.currentUser?.uid;

  const courseMap = route.params.paramAdded;


  useEffect(() => {
    GetCourse();
  },[])

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

  const AddData2 = async () => {

      const docRef = await addDoc(collection(database, "Booking_Appointment"), {
        date:timeStamp,
        course:course,
        timeTaken:time,
        price: price,
        id: user,
        appointmentCreated:true,
      });

  };

  const renderItem = ({ item }) => (
    <View style = {styles.courseContainer}>
      <View style = {styles.courseHeader}>
        <Text style = {styles.courseText}>{item}</Text>
      </View>
    </View>
  );

  const BookingHandle = () =>{
    AddData2();
    navigation.navigate('Booking4');
  }

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
              horizontal = {true}
              showsVerticalScrollIndicator = {false}
              />
              <Text style = {styles.Text1}>Total Price: {price} yen </Text>
              <Text style = {styles.Text1}>Time Taken: {time} </Text>
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
          <View style = {styles.Button}>
          <Button onPress ={()=> BookingHandle()} title = 'CONFIRM' backgroundColor = {colors.secondary_green} fontFamilly = {"Poppins-SemiBold"}>
          </Button>
          </View>
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
    flex:1,
  },
  TabNavSpace: 
  {
    paddingVertical:20,
  },
  PositionContainer:
  {
    justifyContent:'space-between',
    flexDirection:'column'
  },
  DetailContainer: 
  {
    marginHorizontal:40,
    borderRadius:8,
    marginBottom:'5%',

  },
  Header:
  {
    fontFamily:'Merriweather-Bold',
    fontSize:24,
    fontWeight:'bold',
    color: colors.text_brown
  },
  ContainerHeader:
  {
    marginBottom:28,
  },
  Header2:
  {
    fontFamily:'Merriweather-Bold',
    fontSize:18,
    fontWeight:'bold',
    color: colors.text_brown
  },
  Text1:
  {
    fontFamily:'Poppins-Medium',
    fontSize:15,
    color: "#181A18",
    marginTop:7,
  },
  ContainerElement: 
  {
    marginBottom: 24,
  },
  courseContainer:
  {
    marginVertical:'15%',
    paddingVertical:'15%',
    paddingHorizontal:'10%',
  },
  courseHeader:
  {
    flexDirection: 'row',
  },
  courseText:
  {
    fontFamily:'Poppins-Medium',
    fontSize:14
  },
  Button:
  {
    alignItems:'center',
  }

})

export default Bookingpage3