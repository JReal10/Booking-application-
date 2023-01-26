import * as React from 'react';
import { Text,View, StyleSheet,SafeAreaView, ScrollView} from 'react-native';
import { useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import colors from '../Colors/colors';
import StepIndicator from 'react-native-step-indicator';
import FowardButton from '../Components/FowardButton';
import {doc} from 'firebase/firestore';
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

function Bookingpage3({navigation}) {

  const route = useRoute();

  const [date,setDate] = React.useState("test");
  const [time,setTime] = React.useState("test");
  const [course,setCourse] = React.useState(["test", "test2"]);
  const [name, setName] = React.useState("test");
  const [email, setEmail] = React.useState("test");

  const AddData = async (date,time) => {

    const Ref = doc(database, "Booking_User","Jamie");
    const data = {
      date: date,
      time: time
    };
  
    await setDoc(Ref, data,{merge:true})
  };

  const BookingHandle = () =>{
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
              <Text style = {styles.Text1}>{route.params.paramCourse}</Text>
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
    fontSize:24,
    fontWeight:'bold',
    color: colors.text_white
  },
  ContainerHeader:
  {
    marginBottom:28,
    borderBottomWidth:1,
    borderColor: colors.text_white
  },
  Header2:
  {
    fontSize:20,
    fontWeight:'bold',
    color: colors.text_white
  },
  Text1:
  {
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