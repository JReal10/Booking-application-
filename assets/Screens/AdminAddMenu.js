import * as React from 'react';
import { Text,View, StyleSheet,SafeAreaView,TouchableOpacity,FlatList,StatusBar,TextInput,Dimensions} from 'react-native';
import colors from '../Colors/colors';
import AppLoading from 'expo-app-loading';
import useFonts from '../Hooks/useFonts';
import { database } from '../Config/firebase';
import { addDoc,collection,getDocs,deleteDoc,doc} from 'firebase/firestore';
import Button from '../Components/CustomButton';
import { useState,useEffect}from 'react';

const { width, height } = Dimensions.get('window');

function AdminAddMenu({navigation}){

const [IsReady, SetIsReady] = useState(false); // A boolean state variable that determines if the component is ready to be rendered
const [courseName, setCourseName] = useState(""); // A state variable that holds the name of the course
const [courseTime, setCourseTime] = useState(""); // A state variable that holds the time of the course
const [coursePrice, setCoursePrice] = useState(""); // A state variable that holds the price of the course
const [courseDesc,setCourseDesc] = useState(""); // A state variable that holds the description of the course
const [course,setCourse] = useState([]); // A state variable that holds the list of courses
const [refreshing, setRefreshing] = useState(true); // A boolean state variable that determines if the list of courses needs to be refreshed

// useEffect hook that executes a function when the component mounts or when the refreshing state variable changes
useEffect(() => {
  // If the refreshing variable is true, call the GetUser function and set the refreshing state variable to false
  if(refreshing){
    GetUser();
    setRefreshing(false);
  }
},[refreshing]);

// A function that maps over the documents retrieved from the "Booking_Course" collection and returns an array of objects that includes the document ID and data
const collectIdsAndDocs = (doc) => {
  return {id: doc.id, ...doc.data()};
};

// A function that retrieves the documents from the "Booking_Course" collection and sets the course state variable to the mapped array of objects returned by the collectIdsAndDocs function
const GetUser = async() => {
  const Ref = collection(database, "Booking_Course");
  const docSnap = await getDocs(Ref);
  const list = docSnap.docs.map(collectIdsAndDocs);
  setCourse(list);
};

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

  // AddMenu function that takes in courseName, courseTime, coursePrice, and courseDesc as arguments
  const AddMenu = async(Name,Time,Price,Desc) =>{
    const docRef = await addDoc(collection(database, "Booking_Course"), {
      Course_name: courseName,
      time: parseInt(courseTime),
      price: parseInt(coursePrice),
      Description: courseDesc,
    });
    setRefreshing(true);
  };

  return (
    <View style ={styles.Container}>
      <SafeAreaView style = {styles.SafeAreaView}>
      <View style = {styles.contentContainer}>
      <StatusBar barStyle={'dark-content'}></StatusBar>
          <View>
          <Text style = {styles.HeaderStyle}>Add Menu</Text>
          <View style = {styles.Inputs}>
            <Text style = {styles.inputHeader}>Course Name</Text>
            <TextInput placeholder = 'enter course name...' 
            value={courseName}
            onChangeText={(courseName) => setCourseName(courseName)} style = {styles.InputWrapper}
            autoCorrect = {false}
            autoCapitalize = 'none'/>
        </View>
        <View style = {styles.Inputs}>
            <Text style = {styles.inputHeader}>Course Time</Text>
            <TextInput placeholder = 'set time...' 
            value={courseTime}
            onChangeText={(courseTime) => setCourseTime(courseTime)} style = {styles.InputWrapper}
            autoCorrect = {false}
            autoCapitalize = 'none'/>
        </View>
        <View style = {styles.Inputs}>
            <Text style = {styles.inputHeader}>Course price</Text>
            <TextInput placeholder = 'set price...' 
            value={coursePrice}
            onChangeText={(coursePrice) => setCoursePrice(coursePrice)} style = {styles.InputWrapper}
            autoCorrect = {false}
            autoCapitalize = 'none'/>
        </View>
        <View style = {styles.Inputs}>
            <Text style = {styles.inputHeader}>Course description</Text>
            <TextInput placeholder = 'set course description..' 
            value={courseDesc}
            onChangeText={(courseDesc) => setCourseDesc(courseDesc)} style = {styles.InputWrapper}
            autoCorrect = {false}
            autoCapitalize = 'none'/>
        </View>
        <View style = {styles.Button}>
        <Button title = {'ADD MENU'} backgroundColor = {colors.secondary_green} onPress = { ()=> (AddMenu(courseName,coursePrice,courseTime,courseDesc))} fontFamily= {'Poppins-Regular'}></Button>
        </View>
        <TouchableOpacity style = {styles.textPos} onPress={()=>(navigation.navigate('delete menu'))}>
        <Text style = {styles.ViewMenu}>View Menus </Text>
        </TouchableOpacity>
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
    flex:1,

  },
  SafeAreaView:
  {
    backgroundColor:colors.background,
    width:width,
    height:height,
  },
  contentContainer:
  {
    paddingTop:height * 0.02,
    backgroundColor:colors.background,
    marginHorizontal:height * 0.022
  },
  InputWrapper:
  {
    backgroundColor:'#DFDFDF',
    borderRadius:8,
    fontSize:height * 0.015,
    height:height * 0.05,
    paddingLeft:width * 0.02,
    fontFamily:'Poppins-Regular'
  },
  Inputs:
  {
    paddingVertical: height * 0.015,
    fontFamily:'Poppins-Regular'
  },
  inputHeader:
  {
    fontSize:height * 0.018,
    color:colors.text_brown,
    paddingBottom:height * 0.01,
    fontFamily:'Merriweather-Regular'
  },
  HeaderStyle:
  {
    paddingVertical:height * 0.03,
    fontSize:height * 0.02,
    color:colors.text_brown,
    fontFamily:'Merriweather-Regular'
  },
  Button:
  {
    paddingVertical:height * 0.02,
    alignSelf:'center'
  },
  ViewMenu:
  {
    color: colors.text_brown,
    fontSize:height * 0.018,
    fontFamily:'Poppins-Regular',
    textAlign:'center'
  },
  textPos:{
    marginTop:height * 0.03 
  },

})


export default AdminAddMenu;