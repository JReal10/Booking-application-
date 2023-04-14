import * as React from 'react';
import { Text,View, StyleSheet,SafeAreaView,TouchableOpacity,FlatList,StatusBar,Dimensions} from 'react-native';
import colors from '../Colors/colors';
import AppLoading from 'expo-app-loading';
import useFonts from '../Hooks/useFonts';
import { database } from '../Config/firebase';
import { collection,getDocs,deleteDoc,doc} from 'firebase/firestore';
import Entypo from 'react-native-vector-icons/Entypo';
import { useState,useEffect}from 'react';

const { width, height } = Dimensions.get('window');

function RevenueHist({navigation}){

const [IsReady, SetIsReady] = useState(false); // A boolean state variable 
const [Revenue,setRevenue] = useState([]); // A state variable that holds the list of courses
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
  const Ref = collection(database, "Revenue_price");
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

  // This function renders a single appointment item with the specified data
  const renderItem = ({ item }) => (
    <View style = {styles.itemContainer}>
      <Text style = {styles.itemHeader}>Course: {item.Course_name}</Text>
      <Text style = {styles.itemTextStyle}>Description: {item.Description}</Text>
      <Text style = {styles.itemTextStyle}>Time: {item.time} min</Text>
      <Text style = {styles.itemTextStyle}>Price: {item.price} yen</Text>
    </View>
  );

  return (
    <View style ={styles.Container}>
      <SafeAreaView style = {styles.SafeAreaView}>
      <View style = {styles.contentContainer}>
      <StatusBar barStyle={'dark-content'}></StatusBar>
        <View>
        <FlatList
          style = {styles.FlatList} 
          data={Revenue}
          renderItem={renderItem}
          keyExtractor={(item) => item.key}
          extraData={course}
        />
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
  itemTextStyle:
  {
    fontSize:'15',
    paddingBottom:'1%',
    fontFamily:'Merriweather-Regular',
    color:colors.text_white,
    opacity:'0.8'
  },
  itemContainer:
  {
    marginVertical:height * 0.005,
    padding:height * 0.01,
    borderRadius:8,
    backgroundColor:colors.primary_brown
  },
  itemHeader:
  {
    color:colors.text_brown,
    fontFamily:'Poppins-Medium',
    fontSize:height * 0.02,
    paddingBottom:height * 0.01
  },
  itemDeleteStyle:
  {
    fontSize:height * 0.015,
    fontFamily:'Merriweather-Bold',
    color:colors.text_white,
  },
  deleteContainer:
  {
    alignSelf:'center',
    paddingVertical:height * 0.01,
    flexDirection:'row',
    alignItems:'center',
  },
  FlatList:
  {
    height:height * 0.9,
    width: width * 0.9,
    alignSelf:'center'  
  }

})


export default RevenueHist;