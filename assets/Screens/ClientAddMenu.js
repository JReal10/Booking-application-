import * as React from 'react';
import { Text,View, StyleSheet,SafeAreaView,TouchableOpacity,FlatList,StatusBar,TextInput } from 'react-native';
import colors from '../Colors/colors';
import AppLoading from 'expo-app-loading';
import useFonts from '../Hooks/useFonts';
import { database } from '../Config/firebase';
import { addDoc,collection,getDocs,deleteDoc,doc} from 'firebase/firestore';
import Entypo from 'react-native-vector-icons/Entypo';
import Button from '../Components/CustomButton';
import { useState,useEffect,useCallback }from 'react';

function ClientAddMenu({navigation}){

  const [IsReady, SetIsReady] = useState(false);
  const [courseName, setCourseName] = useState("");
  const [courseTime, setCourseTime] = useState("");
  const [coursePrice, setCoursePrice] = useState("");
  const [courseDesc,setCourseDesc] = useState(""); 
  const [course,setCourse] = useState([]);
  const [refreshing, setRefreshing] = useState(true);

  useEffect(() => {
    if(refreshing){
    GetUser();
    setRefreshing(false);
    }
  },[refreshing])

  const clearInput = useCallback(()=> (setCourseName(""),setCourseDesc(""),setCoursePrice(""),setCourseTime("")), []);

  
  const collectIdsAndDocs = (doc) => {
    return {id: doc.id, ...doc.data()};
  };

  const GetUser = async() => {

    const Ref = collection(database, "Booking_Course");

    //SetData is wrong use an if statement
    const docSnap = await getDocs(Ref);
    const list = docSnap.docs.map(collectIdsAndDocs);

    setCourse(list);
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

  const AddMenu = async(Name,Time,Price,Desc) =>{
    const docRef = await addDoc(collection(database, "Booking_Course"), {
      Course_name: courseName,
      time: parseInt(courseTime),
      price: parseInt(coursePrice),
      Description: courseDesc,
    });
    setRefreshing(true);
  };

  const deleteMenu = async(id)=>{
    await deleteDoc(doc(database, "Booking_Course", id));
    setRefreshing(true);
  }

  const renderItem = ({ item }) => (
    <View style = {styles.itemContainer}>
      <Text style = {styles.itemHeader}>Course: {item.Course_name}</Text>
      <Text style = {styles.itemTextStyle}>Description: {item.Description}</Text>
      <Text style = {styles.itemTextStyle}>Time: {item.time} min</Text>
      <Text style = {styles.itemTextStyle}>Price: {item.price} yen</Text>
      <TouchableOpacity onPress={()=>(deleteMenu(item.id))}>
      <View style = {styles.deleteContainer}>
      <Entypo name = 'cross' size = {20} color = {colors.text_white} />
      <Text style = {styles.itemDeleteStyle}>Delete course</Text>
      </View> 
      </TouchableOpacity>
    </View>
  );

  return (
    <View style ={styles.Container}>
      <SafeAreaView style = {styles.SafeAreaView}>
      <View style = {styles.contentContainer}>
      <StatusBar barStyle={'dark-content'}></StatusBar>
          <View>
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
        <Button title = {'ADD MENU'} backgroundColor = {colors.secondary_green} onPress = { ()=> (AddMenu(courseName,coursePrice,courseTime,courseDesc),clearInput)} fontFamily= {'Poppins-Regular'}></Button>
        </View>
        <Text style = {styles.HeaderStyle}>Menu</Text>
        <FlatList
          style = {styles.FlatList} 
          data={course}
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
  },
  contentContainer:
  {
    paddingTop:20,
    borderTopLeftRadius:23,
    borderTopRightRadius:23,
    backgroundColor:colors.background,
    width:'100%',
    height:'100%',
    paddingHorizontal:30,
    flexDirection:'row',
  },
  InputWrapper:
  {
    backgroundColor:'#DFDFDF',
    borderRadius:8,
    fontSize:16,
    height:45,
    paddingLeft:10,
    fontFamily:'Poppins-Regular'

  },
  Inputs:
  {
    paddingVertical: 5,
    fontFamily:'Poppins-Regular'
  },
  inputHeader:
  {
    fontSize:15,
    color:colors.text_brown,
    paddingBottom:9,
    fontFamily:'Merriweather-Regular'
  },
  HeaderStyle:
  {
    paddingVertical:'6%',
    fontSize:18,
    color:colors.text_brown,
    fontFamily:'Merriweather-Regular'
  },
  Button:
  {
    paddingVertical:'3%',
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
    marginVertical:'1%',
    padding:'2%',
    borderRadius:8,
    backgroundColor:colors.primary_brown
  },
  itemHeader:
  {
    color:colors.text_brown,
    fontFamily:'Poppins-Medium',
    fontSize:'16',
    paddingBottom:'2%'
  },
  itemDeleteStyle:
  {
    fontSize:'15',
    fontFamily:'Merriweather-Bold',
    color:colors.text_white,
  },
  deleteContainer:
  {
    alignSelf:'center',
    paddingBottom:'1%',
    paddingVertical:'2%',
    flexDirection:'row',
    alignItems:'center',
  },
  FlatList:
  {
    height:'40%'
  }

})


export default ClientAddMenu;