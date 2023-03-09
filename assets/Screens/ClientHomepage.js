import * as React from 'react';
import { Text,View, StyleSheet,SafeAreaView,TouchableOpacity, ScrollView,StatusBar,FlatList } from 'react-native';
import colors from '../Colors/colors';
import AppLoading from 'expo-app-loading';
import useFonts from '../Hooks/useFonts';
import { database } from '../Config/firebase';
import { deleteDoc,doc,collection,getDocs } from 'firebase/firestore';
import { useState,useEffect }from 'react';
import Entypo from 'react-native-vector-icons/Entypo';


function ClientHomeage({navigation}){

  const [appointment,setAppointment] = useState([]);
  const [refreshing, setRefreshing] = useState(true);
  const [appoAvailable,setAppoAvailable] = useState(true);
  const [appoTodayAvailable,setAppoTodayAvailable] = useState(true);
  const [IsReady, SetIsReady] = useState(false);


  useEffect(() => {
    if(refreshing){
    GetAppointment();
    setRefreshing(false);
    }
  },[refreshing])

  const deleteAppointment = async(id)=>{
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


  const collectIdsAndDocs = (doc) => {
    return {id: doc.id, ...doc.data()};
  };

  const GetAppointment = async() => {

    const Ref = collection(database, "Booking_Course");

    //SetData is wrong use an if statement
    const docSnap = await getDocs(Ref);
    const list = docSnap.docs.map(collectIdsAndDocs);

    setAppointment(list);
    console.log(list);
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

  return (
    <View style ={styles.Container}>
      <SafeAreaView style = {styles.contentContainer}>
        <StatusBar barStyle={'dark-content'}></StatusBar>
        <View>
          <View style = {styles.appoContainer}>
          <View style = {styles.headerWrapper}>
          <Text style = {styles.headerStyle}>Today's Appointments</Text>
          </View>
          {
          (appoAvailable == true)?
          (<View style = {styles.AppointmentView2}>
          <FlatList
          style= {styles.FlatList}
          data={appointment}
          renderItem={renderItem}
          keyExtractor={(item) => item.key}
          extraData={appointment}
          horizontal={true}
          />
          </View>):
          <View style = {styles.subTextWrapper}>
            <Text style = {styles.subTextStyle}>There are no appointment today..</Text>
         </View>
          }
          <View style = {styles.headerWrapper}>
          <Text style = {styles.headerStyle}>Future Appointments</Text>
          </View>
          {
          (appoAvailable == true)?(
          <View style={styles.AppointmentView}>
          <FlatList
          style= {styles.FlatList}
          data={appointment}
          renderItem={renderItem}
          keyExtractor={(item) => item.key}
          extraData={appointment}
          />
          </View>):
          <View style = {styles.subTextWrapper}>
            <Text style = {styles.subTextStyle}>There are no appointments</Text>
          </View>
          }
          <View style = {styles.headerWrapper2}>
          <Text style = {styles.headerStyle}>Energy Consumption</Text>
          </View>
          <View style = {styles.headerWrapper2}>
          <Text style = {styles.headerStyle}>Revenue</Text>
          </View>
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
    flex:1
  },
  TabNavSpace: 
  {
    paddingVertical:40,
  },
  contentContainer:
  {
    height:'100%',
    justifyContent: 'space-between',
    backgroundColor:colors.background,
  },
  headerStyle:
  {
    textAlign:'left',
    fontSize:16,
    fontFamily:'Merriweather-Regular',
    color: colors.text_brown,
  },
  subTextStyle:
  {
    textAlign:'center',

  },
  subTextWrapper:
  {
    paddingVertical:'20%',
    opacity:0.5,
  },
  appoContainer:
  {
    paddingTop:'10%',
    padding:20,
  },
  headerWrapper2:
  {
    alignItems:'center',
    paddingVertical:'5%'
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
  AppointmentView:
  {
    height:'55%',
    marginVertical:'5%'
  },
  AppointmentView2:
  {
    marginVertical:'5%'
  },
  FlatList:
  {
    borderRadius:8
  }
})


export default ClientHomeage;