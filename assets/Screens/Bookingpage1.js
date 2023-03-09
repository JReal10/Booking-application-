import * as React from 'react';
import { Text,View, StyleSheet,SafeAreaView,ScrollView,FlatList} from 'react-native';
import colors from '../Colors/colors';
import BookingButton from '../Components/BookingButton';
import Entypo from 'react-native-vector-icons/Entypo';
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

  useEffect(() => {
    if(refreshing){
    GetUser();
    setRefreshing(false);
    }
  },[refreshing])

  
  useFonts();

  const renderItem = ({ item }) => (
    <View style = {styles.itemContainer}>
      <Text style = {styles.itemHeader}>Course: {item.Course_name}</Text>
      <Text style = {styles.itemTextStyle}>Description: {item.Description}</Text>
      <Text style = {styles.itemTextStyle}>Time: {item.time} min</Text>
      <Text style = {styles.itemTextStyle}>Price: {item.price} yen</Text>
    </View>
  );
  
  const collectIdsAndDocs = (doc) => {
    return {id: doc.id, ...doc.data()};
  };

  const [state,setState] = useState(false)

  const ButtonValue = state?"Added":"Add"

  const AddFunction = (id) => {
    const newState = !state;
    setState(newState)
    IsAdded(id,newState)
  }

  const GetUser = async() => {

    const Ref = collection(database, "Booking_Course");

    //SetData is wrong use an if statement
    const docSnap = await getDocs(Ref);
    const list = docSnap.docs.map(collectIdsAndDocs);

    setCourse(list);
    console.log(list);
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

          <View>
            <View style = {styles.Container2}>
              <Text style = {styles.HeaderText}>[Hand] Clear Gel</Text>
              <View style = {styles.time}>
              <Entypo name = 'clock' size = {16} color = {'#828282'}/>
              <Text style = {styles.TimeText}>20 min</Text>
              </View>
            </View>
          </View>
          <Text style = {styles.DescriptionText}>Applying clear gel</Text>
          <View style = {styles.Container3}>
            <Text style = {styles.priceText}>$20.00</Text>
            <TouchableOpacity onPress = {() => AddFunction('5vpFN69D14cH42cU1Ue9')}>
            <BookingButton title = {ButtonValue} style = {styles.AddButton}/>
            </TouchableOpacity>
          </View>
          <View style = {styles.DividerLine}></View>

          <View>
            <View style = {styles.Container2}>
              <Text style = {styles.HeaderText}>[Hand] Clear Gel</Text>
              <View style = {styles.time}>
              <Entypo name = 'clock' size = {16} color = {'#828282'}/>
              <Text style = {styles.TimeText}>20 min</Text>
              </View>
            </View>
          </View>
          <Text style = {styles.DescriptionText}>Applying clear gel</Text>
          <View style = {styles.Container3}>
            <Text style = {styles.priceText}>$20.00</Text>
            <TouchableOpacity onPress = {() => AddFunction('FIhLGiLsP38mI1FVKPtU')}>
            <BookingButton title = 'Add' style = {styles.AddButton}/>
            </TouchableOpacity>
          </View>
          <View style = {styles.DividerLine}></View>

          <View>
            <View style = {styles.Container2}>
              <Text style = {styles.HeaderText}>[Hand] Clear Gel</Text>
              <View style = {styles.time}>
              <Entypo name = 'clock' size = {16} color = {'#828282'}/>
              <Text style = {styles.TimeText}>20 min</Text>
              </View>
            </View>
          </View>
          <Text style = {styles.DescriptionText}>Applying clear gel</Text>
          <View style = {styles.Container3}>
            <Text style = {styles.priceText}>$20.00</Text>
            <TouchableOpacity onPress = {() => AddFunction('eC6IIrKKD6NrbMsQuZdb')}>
            <BookingButton title = 'Add' style = {styles.AddButton}/>
            </TouchableOpacity>
          </View>
          <View style = {styles.DividerLine}></View>
          <FlatList
          style = {styles.FlatList} 
          data={course}
          renderItem={renderItem}
          keyExtractor={(item) => item.key}
          extraData={course}
          />
          <FowardButton title = 'CONTINUE' onPress={() => (navigation.navigate('Booking2'))}/>

          <View style = {styles.TabNavSpace}/>
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
  Container2:
  {
    paddingTop: 20,
    paddingBottom:5,
    paddingHorizontal:12,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
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
    paddingHorizontal:12,
    fontSize:16,
    color: '#828282',

  },
  Container3: 
  {
    paddingTop:30,
    paddingBottom:12,
    paddingHorizontal:12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  priceText: 
  {
    fontFamily:'Poppins-Regular',
    fontSize: 24,
    color: '#626262'
  },
  DividerLine: 
  {
    borderBottomWidth:1,
    borderBottomColor: '#B0B0B0',
    marginHorizontal: 12,
  },
  TabNavSpace: 
  {
    paddingVertical:40,
  }
})

export default Bookingpage1;