import * as React from 'react';
import { Text,View, StyleSheet,SafeAreaView,FlatList, Modal,Linking} from 'react-native';
import colors from '../Colors/colors';
import { signOut } from 'firebase/auth';
import { Authentication } from '../Config/firebase';
import {getDoc,doc,collection,getDocs,query,where,deleteDoc} from 'firebase/firestore';
import { database } from '../Config/firebase';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useState,useEffect } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

const AppointmentModal = ({visible,children}) =>{
  // Declare state to control modal visibility
  const [showModal,setShowModal] = useState(visible);

  // Update modal visibility when 'visible' prop changes
  useEffect(()=>{
    toggleModal();
  },[visible]);

  // Toggle modal visibility based on current state
  const toggleModal = () =>{
    if(visible){
      setShowModal(true);
    }else{
      setShowModal(false);
    }
  }

  // Render the modal component
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
  // Get the current user's ID from Firebase Authentication
  const user = Authentication.currentUser?.uid

  // State variables to control the component's behavior
  const [refreshing, setRefreshing] = useState(true);
  const [name, setName] = useState("");
  const [course,setCourse] = useState("");
  const [visible, setVisible] = useState(false);

  // useEffect hook to fetch data from Firebase when the component mounts or when the 'refreshing' state changes
  useEffect(() => {
    if(refreshing){
      // Fetch the user's profile data
      GetUser(user);

      // Fetch the user's appointment data
      GetAppointment(user);

      // Set 'refreshing' to false to prevent an infinite loop
      setRefreshing(false);
    }
  },[refreshing])

  // Helper function to extract document IDs and data from query snapshots
  const collectIdsAndDocs = (doc) => {
    return {id: doc.id, ...doc.data()};
  };

  // Fetch the user's appointment data from Firebase
  const GetAppointment = async (userID)=>{
    // Get a reference to the 'Booking_Appointment' collection
    const Ref = collection(database, "Booking_Appointment");
    
    // Create a query against the collection to get all appointments for the current user
    const q = query(Ref, where("uid", "==", userID));
    
    // Execute the query and get the query snapshot
    const querySnapshot = await getDocs(q);

    // Map the query snapshot to an array of appointment objects, including their IDs
    const list = querySnapshot.docs.map(collectIdsAndDocs);

    // Set the 'course' state variable to the list of appointments
    setCourse(list);
  }

  const CancelAppointment = async(appoID) => {
    // delete appointment document from firestore using appoID
    await deleteDoc(doc(database, "Booking_Appointment", appoID));
    // refresh the list of appointments
    setRefreshing(true);
  }

  const GetUser = async(user) => {
    // get user document from firestore using user ID
    const Ref = doc(database, "Booking_User",user);
    const docSnap = await getDoc(Ref);

    const data = docSnap.exists() ? docSnap.data() : null
    // if no data is returned, exit function
    if (data === null || data === undefined) return null
    const ac = data.appointmentCreated;
    // set the name state variable to the name field of the user document
    setName(data.name);
  }

  const renderItem = ({item}) => (
    // render appointment item as a container with course, date, time, price, and cancel appointment button
    <View style = {styles.courseContainer}>
      <Text style = {styles.courseHeader}>COURSE:</Text>
      <View>
        {(item.course).map(item => (
          <Text style ={styles.courseText} key={item}> {item}</Text>
        ))}
      </View>
      <View style = {styles.courseDetailContainer}>
        <Text style = {styles.courseDetailText}>Date&Time: {item.date}</Text>
        <Text style = {styles.courseDetailText}>estimated time: {item.timeTaken} min</Text>
        <Text style = {styles.courseDetailText}>Price: {item.price} yen</Text>
        <TouchableOpacity onPress = {()=> CancelAppointment(item.id)}style = {styles.CancelAppointment}>
          <Text style = {styles.CancelAppointmentText}> Cancel Appointment </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const ItemDivider = () => {
    // render a horizontal divider to separate appointment items
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

  const logout =() =>
  {
    // sign out user using firebase authentication signOut method
    signOut(Authentication)
    .then((re) => 
    {
    }).catch
    {
    }
  }

  const handleNoti =() =>{
    // open device settings for notifications
    Linking.openURL('App-Prefs:NOTIFICATIONS_ID&path=<bundle_id>');
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
              <TouchableOpacity onPress = {() => {setVisible(false)}}>
              <MaterialIcons name = 'close' size = {24} color = {colors.icon_dark} />
              </TouchableOpacity>
              </View>
              {(course != "")? 
              <View style = {styles.ApoointmentSubWrapper}>
                <FlatList
                  style = {styles.FlatList} 
                  data={course}
                  renderItem={renderItem}
                  ItemSeparatorComponent={ItemDivider}
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
          <TouchableOpacity onPress = {()=> {setVisible(true),setRefreshing(true)}}>
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
          <TouchableOpacity>
            <View style = {styles.TextContainer3}>
            <Text style = {styles.TextStyle}>Privacy Policy</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style = {styles.TextContainer3}>
            <Text style = {styles.TextStyle}>Terms & Conditions</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style = {styles.TextContainer3}>
            <Text style = {styles.TextStyle}>About us</Text>
            </View>
          </TouchableOpacity>
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
    height:'60%',
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
    marginTop: '10%',
    marginBottom: '5%',
    alignItems:'center',
  },
  CancelAppointmentText:{
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
  FlatList:
  {
    height:'90%'
  },
  HeaderText: 
  {
    fontFamily:'Merriweather-Regular',
    fontSize: 16,
    color: colors.text_brown,
  },
  courseText:{
    fontFamily:'Poppins-Regular',
    fontSize: 16,
    color: '#626262'
  },
  courseSubText:
  {
    fontFamily:'Poppins-Regular',
    fontSize: 16,
    color: '#626262'

  },
  courseDetailText:{
    fontFamily:'Poppins-Regular',
    fontSize: 14,
    color: '#626262',
    paddingVertical:'1%'
  },
  courseDetailContainer:{
    paddingVertical:'3%'
  },
  courseContainer:
  {
    flexDirection: 'column',
    paddingVertical:'2%',
    padding:'2%',
  },
  courseHeader:
  {
    fontFamily:'Poppins-Regular',
    fontSize: 18,
    color: '#626262'
  },
})

export default Profilepage;