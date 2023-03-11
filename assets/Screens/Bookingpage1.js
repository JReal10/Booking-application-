import * as React from 'react';
import { Text,View, StyleSheet,SafeAreaView,ScrollView,FlatList} from 'react-native';
import colors from '../Colors/colors';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import StepIndicator from 'react-native-step-indicator';
import FowardButton from '../Components/FowardButton';
import {doc, updateDoc,collection,getDocs} from 'firebase/firestore';
import { database } from '../Config/firebase';
import { TouchableOpacity } from 'react-native-gesture-handler';
import useFonts from '../Hooks/useFonts';
import { useState,useEffect } from 'react';

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

 async function IsAdded(id,a)
 {
  const Ref = doc(database, "Booking_Course", id);          
  await updateDoc(Ref, {
    isAdded: a
  });
 }

const labels = ["Menu","Date","Confirmation"];

function Bookingpage1({navigation}) {

  const [course,setCourse] = useState([]);
  const [refreshing, setRefreshing] = useState(true);
  const [state,setState] = useState(false)
  const [buttons, setButtons] = useState(course.reduce((obj, item) => ({...obj, [item.id]: false}), {}));
  const [added, setAdded] = useState([]);

  const handleButtonPress = (id) => {
    setButtons({...buttons, [id]: !buttons[id]});
    console.log(buttons);
    IsAdded(id,!buttons[id]);
  }

  useEffect(() => {
    if(refreshing){
    GetUser();
    setRefreshing(false);
    }
  },[refreshing])

  
  useFonts();

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
        onPress={() => handleButtonPress(item.id)}>

        {buttons[item.id] ? <Ionicons name = 'ios-checkmark-sharp' size = {16} color = {colors.background}/>:<Ionicons name = 'ios-add-sharp' size = {16} color = {colors.background}/>}
        <Text style={[styles.buttonText, {color: buttons[item.id] ? colors.background:colors.background}]}>{buttons[item.id] ? 'Added' : 'Add'}</Text>
      </TouchableOpacity>
      </View>
    </View>
  );

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

  const GetUser = async() => {

    const Ref = collection(database, "Booking_Course");

    //SetData is wrong use an if statement
    const docSnap = await getDocs(Ref);
    const list = docSnap.docs.map(collectIdsAndDocs);

    setCourse(list);
    }

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
            <FowardButton title = 'CONTINUE' onPress={() => (navigation.navigate('Booking2',{paramAdded:added}))}/>
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
    borderBottomWidth:1,
    borderBottomColor: '#B0B0B0'
  },
  Container: 
  {
    flex:1
  },
  courseContainer:
  {
    flexDirection: 'column',
    paddingVertical:'2%',
    padding:'2%',
  },
  courseHeader:
  {
    flexDirection: 'row',
  },
  courseSubContainer:
  {
    flexDirection: 'row',
    justifyContent:'space-between'
  },
  HeaderText: 
  {
    fontFamily:'Merriweather-Regular',
    fontSize: 18,
    color: colors.text_brown,
  },
  TimeText: 
  {
    fontFamily:'Poppins-Regular',
    fontSize:16,
    color: '#828282',
    marginLeft: '2%'
  },
  time:
  {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginLeft: '5%'
  },
  DescriptionText:
  {
    fontFamily:'Poppins-Regular',
    paddingTop: 5,
    fontSize:16,
    color: '#828282',
    marginBottom:'5%',
    marginTop:'3%'
  },
  priceText: 
  {
    fontFamily:'Poppins-Regular',
    fontSize: 20,
    color: '#626262'
  },
  FlatList:
  {
    height:'75%',
    borderRadius:'8'
  },
  button: {
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal:15,
    borderRadius: 8,
    elevation: 3,
    backgroundColor: colors.secondary_green,
    flexDirection:'row'
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text_white,
  },
  mainButton:{
    position:'absolute',
  }

})

export default Bookingpage1;