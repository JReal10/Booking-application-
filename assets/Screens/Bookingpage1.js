import * as React from 'react';
import { Text,View, StyleSheet,SafeAreaView,FlatList,Dimensions,TouchableOpacity} from 'react-native';
import colors from '../Colors/colors';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import StepIndicator from 'react-native-step-indicator';
import {collection,getDocs} from 'firebase/firestore';
import Button from '../Components/CustomButton';
import { database } from '../Config/firebase';
import { useState,useEffect } from 'react';

const { width, height } = Dimensions.get('window');

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

function Bookingpage1({navigation}) {

  const [course,setCourse] = useState([]); // initialize state variable course with an empty array
  const [refreshing, setRefreshing] = useState(true); // initialize state variable refreshing with true
  const [selectedCourse, setSelectedCourse] = useState(false);
  const [buttons, setButtons] = useState(course.reduce((obj, item) => ({...obj, [item.id]: false}), {})); // initialize state variable buttons with an object where the keys are the ids of the items in course and the values are false
  
  const handleButtonPress = (id) => { // function that takes an id as parameter
    setButtons({...buttons, [id]: !buttons[id]}); // toggles the value of the id in the buttons object
    setRefreshing(true)
  }
  
  useEffect(() => {
    if(refreshing){
    GetCourse();// function to get all courses from Firestore
    setRefreshing(false);

    for (const key in buttons) {
      if (buttons[key] === true) {
        setSelectedCourse(true)
        break;
      } else
      {
        setSelectedCourse(false)
      }
    }
    }
  },[refreshing])

  // This function renders a single appointment item with the specified data
  const renderItem = ({ item }) => (
    <View style = {styles.courseContainer}>
      <View style = {styles.courseHeader}>
      <Text style = {styles.HeaderText}>Course: {item.Course_name}</Text>
      <View style = {styles.time}>
        <Entypo name = 'clock' size = {16} color = {'#828282'}/>
        <Text style = {styles.TimeText}>{item.time} min</Text>
      </View>
      </View>

      <Text style = {styles.DescriptionText}>Description: {item.Description}</Text>
      <View style = {styles.courseSubContainer}>
      <Text style = {styles.priceText}>Price: {item.price} yen</Text>
      <TouchableOpacity style={[styles.button, { backgroundColor: buttons   [item.id] ? colors.secondary_green : '#828282'}]}
        onPress={() => {handleButtonPress(item.id)}}>

        {buttons[item.id] ? <Ionicons name = 'ios-checkmark-sharp' size = {16} color = {colors.background}/>:<Ionicons name = 'ios-add-sharp' size = {16} color = {colors.background}/>}
        <Text style={[styles.buttonText, {color: buttons[item.id] ? colors.background:colors.background}]}>{buttons[item.id] ? 'Added' : 'Add'}</Text>
      </TouchableOpacity>
      </View>
    </View>
  );

  //separator UI component for the flatlist
  const ItemDivider = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#00000030",
        }}
      />
    );
  }
  
  const collectIdsAndDocs = (doc) => {
    return {id: doc.id, ...doc.data()};
  };

  const GetCourse = async() => {

    const Ref = collection(database, "Booking_Course");

    const docSnap = await getDocs(Ref);
    const list = docSnap.docs.map(collectIdsAndDocs);

    setCourse(list);
  }

  //The UI componenet part of the screen
  return (
    <View style = {styles.Container}>
      <SafeAreaView>
        <View>
          <View style = {styles.stepIndicator}>
          <StepIndicator customStyles={customStyles}
          currentPosition = {0}
          labels ={labels}
          stepCount = {3}/>
          </View>


          <FlatList
          style = {styles.FlatList} 
          data={course}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={ItemDivider}
          showsVerticalScrollIndicator = {false}
          />
          <View style = {styles.ContinueButton}>
          {selectedCourse && ( 
          <Button onPress ={() => (navigation.navigate('Booking2',{paramAdded:buttons}))} title = 'CONTINUE' backgroundColor = {colors.secondary_green} fontFamilly = {"Poppins-SemiBold"}></Button>)
          }
          </View>
          </View>
      </SafeAreaView>
    </View>
  );
}

//Stylesheet for the UI components
const styles = StyleSheet.create({
  stepIndicator: {
    paddingVertical: height * 0.025,
  },
  Container: {
    flex: 1
  },
  courseContainer: {
    flexDirection: 'column',
    paddingVertical: height * 0.02,
    padding: width * 0.02,
  },
  courseHeader: {
    flexDirection: 'row',
  },
  courseSubContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  HeaderText: {
    fontFamily: 'Merriweather-Regular',
    fontSize: height * 0.022,
    color: colors.text_brown,
  },
  TimeText: {
    fontFamily: 'Poppins-Regular',
    fontSize: height * 0.02,
    color: '#828282',
    marginLeft: width * 0.02
  },
  time: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginLeft: width * 0.05
  },
  DescriptionText: {
    fontFamily: 'Poppins-Regular',
    fontSize: height * 0.018,
    color: '#828282',
    marginBottom: height * 0.04,
    marginTop: height * 0.02
  },
  priceText: {
    fontFamily: 'Poppins-Regular',
    fontSize: height * 0.025,
    color: '#626262'
  },
  FlatList: {
    height: height * 0.55,
    borderRadius: width * 0.03
  },
  button: {
    alignItems: 'center',
    paddingVertical: height * 0.005,
    paddingHorizontal: width * 0.03,
    borderRadius: width * 0.03,
    elevation: 3,
    backgroundColor: colors.secondary_green,
    flexDirection: 'row'
  },
  buttonText: {
    fontSize: height * 0.02,
    fontWeight: 'bold',
    color: colors.text_white,
  },
  ContinueButton: {
    alignItems: 'center',
    marginTop: height * 0.01
  }
});

export default Bookingpage1;