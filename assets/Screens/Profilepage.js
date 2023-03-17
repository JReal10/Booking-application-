import * as React from 'react';
import { Text,View, StyleSheet,SafeAreaView,FlatList, Modal,Linking} from 'react-native';
import colors from '../Colors/colors';
import { signOut } from 'firebase/auth';
import { Authentication } from '../Config/firebase';
import {getDoc,doc,collection,getDocs,query,where,docs} from 'firebase/firestore';
import Entypo from 'react-native-vector-icons/Entypo';
import { database } from '../Config/firebase';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useState,useEffect } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

const AppointmentModal = ({visible,children}) =>{
  const [showModal,setShowModal] = useState(visible);

  useEffect(()=>{
    toggleModal();
  },[visible]);

  const toggleModal = () =>{
    if(visible){
      setShowModal(true);
    }else{
      setShowModal(false);
    }
  }

  return (
    <Modal transparent visible = {visible}> 
      <View style = {styles.modalBackGround}>
        <View style = {[styles.modalContainer]}>
          {children}
        </View>
      </View>
    </Modal>
    );
};

function Profilepage({route}) {

  const user = Authentication.currentUser?.uid

  useEffect(() => {
    GetUser(user);
    GetAppointment(user);
  },[])


  const [name, setName] = useState("");
  const [time,setTime] = useState("");
  const [course,setCourse] = useState(null);
  const [visible, setVisible] = useState(false);

  const collectIdsAndDocs = (doc) => {
    return {id: doc.id, ...doc.data()};
  };

  const GetAppointment = async (userID)=>{
    const Ref = collection(database, "Booking_Appointment");
    
    // Create a query against the collection.
    const q = query(Ref, where("id", "==", userID));
    
    const querySnapshot = await getDocs(q);
    const list = querySnapshot.docs.map(collectIdsAndDocs);
    
    setCourse(list);
    }
  
  const GetUser = async(user) => {

    const Ref = doc(database, "Booking_User",user);
    const docSnap = await getDoc(Ref);

    const data = docSnap.exists() ? docSnap.data() : null
    if (data === null || data === undefined) return null
    const ac = data.appointmentCreated;

    setName(data.name);
  }

  const renderItem = ({item}) => (
    <View style = {styles.courseContainer}>
      <View style = {styles.courseHeader}>
      <Text style = {styles.HeaderText}>Course: {item.course}</Text>
      <View style = {styles.time}>
        <Entypo name = 'clock' size = {16} color = {'#828282'}/>
        <Text style = {styles.TimeText}>{item.date} min</Text>
        <Text style = {styles.TimeText}>{item.timeTaken} min</Text>
      </View>
      </View>
      <View style = {styles.courseSubContainer}>
      <Text style = {styles.priceText}>Price: {item.price} yen</Text>
      </View>
      <TouchableOpacity onPress = {()=> cancelAppointmentHandler()}style = {styles.CancelAppointment}><Text style = {styles.ModalTextStyle3}> Cancel Appointment </Text></TouchableOpacity>
    </View>
  );

   const logout =() =>
   {
     signOut(Authentication)
     .then((re) => 
     {
     }).catch
     {
     }
   }

   /*const showAlert = () => {
    return Alert.alert(
      // the title of the alert dialog
      "Are you sure?",
      [
        // the first button
        {
          text: "No",
          //onPress: () => setChoice("Agree"),
        },

        // the second button
        {
          text: "Yes",
          onPress: () => setVisible(false),
        },
      ]
    );
  };*/

  const handleNoti =() =>{
    Linking.openURL('App-Prefs:NOTIFICATIONS_ID&path=<bundle_id>');
  }

   const cancelAppointmentHandler = () =>{
    setVisible(false)
   }

  return (
    <View style = {styles.ScreenContainer}>
      <SafeAreaView>
        <View style = {styles.ContentContainer}>
        <View style = {styles.TextContainer}>
          <MaterialIcons name = 'account-circle' size = {60} color = '#839A7F' />
          <Text style = {styles.TextStyle}>{name}</Text>
          </View>

          <AppointmentModal visible = {visible}>
            <View>
              <View style = {styles.PopUpHeader}>
              <Text style = {styles.AppointmentHeader}>Appointment Detail</Text>
              <TouchableOpacity onPress = {() => setVisible(false)}>
              <MaterialIcons name = 'close' size = {24} color = {colors.icon_dark} />
              </TouchableOpacity>
              </View>
              {(course != null)? 
              <View style = {styles.ApoointmentSubWrapper}>
                <FlatList
                  style = {styles.FlatList} 
                  data={course}
                  renderItem={renderItem}
                  horizontal = {true}
                  keyExtractor={(item) => item.id}
                  showsVerticalScrollIndicator = {false}
                  />
          </View>  : (<View style = {styles.NoAppWrapper}><Text style = {styles.NoAppText}> No Appointment Booked </Text></View>)
          }
            </View>
          </AppointmentModal>

        </View>
        <View>

        </View>

        <View style = {styles.ContentContainer2}>
          <TouchableOpacity onPress = {()=> setVisible(true)}>
          <View style = {styles.TextContainer2}>
          <MaterialCommunityIcons name = 'calendar-month' size = {32} color = '#839A7F' />
          <Text style = {styles.TextStyle}>Appointments</Text>
          </View>
          </TouchableOpacity>

          <TouchableOpacity>
          <View style = {styles.TextContainer2}>
          <MaterialCommunityIcons name = 'account-multiple' size = {32} color = '#839A7F'/>
          <Text style = {styles.TextStyle}>Refferal</Text>
          </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>handleNoti()}>
          <View style = {styles.TextContainer2}>
          <MaterialIcons name = 'notifications' size = {32} color = '#839A7F'/>
          <Text style = {styles.TextStyle}>Notifications</Text>
          </View>
          </TouchableOpacity>
          
          </View>
      
        
        <View style = {styles.ContentContainer2}>
          <View style = {styles.TextContainer3}>
          <Text style = {styles.TextStyle}>Privacy Policy</Text>
          </View>
          <View style = {styles.TextContainer3}>
          <Text style = {styles.TextStyle}>Terms & Conditions</Text>
          </View>
          <View style = {styles.TextContainer3}>
          <Text style = {styles.TextStyle}>About us</Text>
          </View>
        </View>

        <View style = {styles.LogOutContainer}>
          <Text onPress={()=>{logout()}} style = {styles.TextStyle2}>Sign Out</Text>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create
({
  ScreenContainer: 
  {
    flex: 1 
  },
  modalBackGround:{
    flex:1,
    backgroundColor:'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems:'center',
  },
  modalContainer:{
    width:'80%',
    backgroundColor:'white',
    paddingHorizontal:20,
    paddingVertical:30,
    borderRadius:20,
    elevation:20,
  },
  ContentContainer:
  {
    backgroundColor: '#EEEEEE',
    marginVertical:29.5,
    marginHorizontal:21,
    borderRadius: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 5,
    paddingRight:20,
    paddingVertical:15,
  },
  TextContainer:
  {
    flexDirection:'row',
    alignItems:'center',
  },
  TextStyle:
  {
    marginLeft:10,
    fontSize: 18,
    color: colors.text_brown,
    fontFamily:'Merriweather-Regular'
  },
  TextStyle2:{
    marginLeft:10,
    fontSize: 18,
    color: colors.text_brown,
    fontFamily:'Poppins-Regular'

  },
  ContentContainer2:
  {
    backgroundColor: '#EEEEEE',
    marginBottom: 29.5,
    marginHorizontal:21,
    borderRadius: 8,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    paddingLeft: 5,
    paddingRight:20,
    paddingVertical:25,
  },
  TextContainer2: 
  {
    flexDirection:'row',
    alignItems:'center',
    marginLeft:'3%',
    marginTop: '5%',
    marginBottom: '3%'
  },
  TextContainer3:
  {
    flexDirection:'row',
    alignItems:'center',
    marginLeft:'3%',
    marginTop: '3%',
    marginBottom: '5%'
  },
  LogOutContainer: 
  {
    marginBottom: 29.5,
    marginHorizontal:21,
    justifyContent: 'center',
    flexDirection: 'row',
    paddingLeft: 5,
    paddingRight:20,
    paddingVertical:10,
  },
  editStyle:{
    fontSize:16,
    color: colors.icon_dark,
  },
  courseContainer:
  {
    flexDirection: 'column',
    paddingVertical:'5%',
    padding:'2%',
  },

  CourseHeaderWrapper:{
    paddingTop:5,
    paddingBottom:3,
    fontSize: 20, 
    color:"#371D10",
  },
  PopUpHeader:{
    marginBottom:'5%',
    alignItems:'center',
    flexDirection:'row',
    justifyContent:'space-between'
  },
  AppointmentHeader:{
    fontSize:24,
  },
  CancelAppointment:{
    paddingTop: 35,
    alignItems:'center',
  },
  ModalTextStyle3:{
    textDecorationLine:'underline'
  },
  inputHeader:
  {
    fontSize:18,
    color:colors.text_brown,
    paddingBottom:9,
  },
  Inputs:
  {
    paddingVertical: 10
  },
  EmailInput:
  {
    backgroundColor:'#DFDFDF',
    borderRadius:8,
    fontSize:16,
    height:50,
    paddingLeft:10,
  },
  NoAppWrapper:
  {
    paddingVertical:'40%',
    alignItems:'center'
  },
  NoAppText:
  {
    fontFamily:'Poppins-Regular',
    fontSize:16,
    color:'#66554190',
    textDecorationLine:'underline'    
  },
})

export default Profilepage;