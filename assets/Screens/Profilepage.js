import * as React from 'react';
import { Text,View, StyleSheet,SafeAreaView,ScrollView, Modal} from 'react-native';
import colors from '../Colors/colors';
import { signOut } from 'firebase/auth';
import { Authentication } from '../Config/firebase';
import {getDoc,doc} from 'firebase/firestore';
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

function Profilepage() {

  useEffect(() => {
    GetUser();
  },[])

  const [name, setName] = useState("");
  const [date,setDate] = useState("");
  const [time,setTime] = useState("");
  const [course,setCourse] = useState([]);
  const [price,setPrice] = useState("");
  const [timeTaken,setTimeTaken] = useState("");

  const [visible, setVisible] = useState(false);
  const [user,setUser] = useState(null);

  const CurrentAuth = async () => {
    onAuthStateChanged(Authentication, 
      async authenticatedUser => {authenticatedUser? setUser(authenticatedUser.uid):setUser(null); 
    })
  }
  
  const GetUser = async() => {

    const Ref = doc(database, "Booking_User","Jamie");
    //SetData is wrong use an if statement
    const docSnap = await getDoc(Ref);

    const data = docSnap.exists() ? docSnap.data() : null
    if (data === null || data === undefined) return null

    setName(data.name);
    setDate(data.date);
    setTime(data.time);
    setCourse(data.course);
    setPrice(data.price);
    setTimeTaken(data.timeTaken);
  }

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

   const cancelAppointmentHandler = () =>{
    setVisible(false)
   }

  return (
    <View style = {styles.ScreenContainer}>
      <SafeAreaView>
      <ScrollView>
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
              <View style = {styles.ApoointmentSubWrapper}>
                <View style = {styles.DateTimeWrapper}>
                <Text style = {styles.ModalTextStyle}>Date: {date}</Text>
                <Text style = {styles.ModalTextStyle}>Time: {time}</Text>
              </View>

              <View style = {styles.TimePriceWrapper}>
                <Text style = {styles.ModalTextStyle2} >Price: ${price}</Text>
                <Text style = {styles.ModalTextStyle2} >Aprox. Time: {timeTaken} min.</Text>
              </View>

              <Text style = {styles.CourseHeaderWrapper}>Course</Text>
              { course.map((item, key)=>(
              <Text key={key} style={styles.CourseTextStyle}> {item} </Text>)
              )}
              <TouchableOpacity onPress = {()=> cancelAppointmentHandler()}style = {styles.CancelAppointment}><Text style = {styles.ModalTextStyle3}> Cancel Appointment </Text></TouchableOpacity>
          </View>
            </View>
          </AppointmentModal>

        </View>

        <View style = {styles.ContentContainer2}>
          <TouchableOpacity onPress = {()=> setVisible(true)}>
          <View style = {styles.TextContainer2}>
          <MaterialCommunityIcons name = 'calendar-month' size = {32} color = '#839A7F' />
          <Text style = {styles.TextStyle}>Appointments</Text>
          </View>
          </TouchableOpacity>
          <View style = {styles.TextContainer2}>
          <MaterialCommunityIcons name = 'account-multiple' size = {32} color = '#839A7F'/>
          <Text style = {styles.TextStyle}>Refferal</Text>
          </View>
        </View>

        <View style = {styles.ContentContainer2}>
          <View style = {styles.TextContainer2}>
          <MaterialIcons name = 'payment' size = {32} color = '#839A7F'/>
          <Text style = {styles.TextStyle}>Payment</Text>
          </View>
          <View style = {styles.TextContainer2}>
          <MaterialIcons name = 'notifications' size = {32} color = '#839A7F'/>
          <Text style = {styles.TextStyle}>Notifications</Text>
          </View>
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
          <Text style = {styles.TextStyle2}>Delete Account</Text>
        </View>
      </ScrollView>
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
    paddingVertical:10,
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
    paddingVertical:10,
  },
  TextContainer2: 
  {
    flexDirection:'row',
    alignItems:'center',
    marginLeft:'3%',
    marginTop: '2%',
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
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingLeft: 5,
    paddingRight:20,
    paddingVertical:10,
  },
  editStyle:{
    fontSize:16,
    color: colors.icon_dark,
  },
  DateTimeWrapper:{
    justifyContent: 'space-between',
    flexDirection:'column',
    paddingVertical: 10,
  },
  CourseTextStyle:{
    fontSize : 16,
    textAlign: 'left',
    paddingVertical:2,
    color: "#371D10"
  },
  ModalTextStyle2:{
    color:"#371D1090",
    fontSize:16
  },
  TimePriceWrapper:{
    flexDirection:'column',
    paddingBottom:10,
  },
  CourseHeaderWrapper:{
    paddingTop:5,
    paddingBottom:3,
    fontSize: 20, 
    color:"#371D10",
  },
  ModalTextStyle:{
    fontSize: 20, 
    color:"#371D10",
    paddingVertical:2,
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
})

export default Profilepage;