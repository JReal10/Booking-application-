import { View,TouchableOpacity,StyleSheet } from 'react-native';
import * as React from 'react';
import { NavigationContainer, TabActions } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './Components/Homescreen';
import ContactPage from './Components/Contactpage';
import colors from './assets/Color/colors';
import Bookingpage1 from './Components/Bookingpage1';
import Bookingpage2 from './Components/Bookingpage2';
import Bookingpage3 from './Components/Bookingpage3';
import Bookingpage4 from './Components/Bookingpage4';
import Gallerypage from './Components/Gallerypage';
import Profilepage from './Components/Profilepage';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator 
    screenOptions= 
    {{
      tabBarStyle:
      {
        height:90,
        backgroundColor: colors.text_white,
        elevation: 0,
        position: 'absolute',
        borderRadius:15,
      },
      tabBarInactiveTintColor:colors.secondary_green,
      tabBarActiveTintColor:colors.secondary_green,
      tabBarShowLabel: false,

    }}>
      <Tab.Screen name="Home" component={HomeScreen} 
      options = 
      {{
        tabBarIcon: () => <Entypo name = "home" size = {32}/>,
        headerShown: true,
        headerTitle: 'SHARON',
        headerStyle: {
          
          backgroundColor: colors.primary_brown,
        },
        headerTitleStyle: 
        {
          fontSize:24,
          color: '#FFFFFF',
        },
        headerLeft: () => (
          <View>
            <TouchableOpacity style>
              <Feather name = 'menu' size = {24} color = '#FFFFFF'/>
            </TouchableOpacity>
          </View>
        ),
        }}/>

      <Tab.Screen name="Booking1" component={Bookingpage1} options = {{
        tabBarIcon: () => <FontAwesome5 name = "calendar-alt" size = {30}/>,
        headerShown: true,
        headerTitle: 'SHARON',
        headerStyle: 
        {  
          backgroundColor: colors.primary_brown,
        },
        headerTitleStyle: 
        {
          fontSize:24,
          color: '#FFFFFF',
        },
        headerLeft: () => (
          <View>
            <TouchableOpacity>
              <Feather name = 'menu' size = {24} color = '#FFFFFF'/>
            </TouchableOpacity>
          </View>
        ), 
        headerBackVisible: true,
        headerBackTitle:'',
        }}/>

      <Tab.Screen name="Profile" component={Profilepage} options = {{
        tabBarIcon: () => <MaterialCommunityIcons name = "account" size = {36}/>,
        headerShown: true,
        headerTitle: 'SHARON',
        headerStyle: {
          
          backgroundColor: colors.primary_brown,
        },
        headerTitleStyle: 
        {
          fontSize:24,
          color: '#FFFFFF',
        },
        headerLeft: () => (
          <View>
            <TouchableOpacity>
              <Feather name = 'menu' size = {24} color = '#FFFFFF'/>
            </TouchableOpacity>
          </View>
        ), 
        headerBackVisible: true,
        headerBackTitle:'',
        }}/>
    </Tab.Navigator>
  );
}

function App() {
  return (
    //needs fixing the title is not run properly
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name = "Tab" component={TabNavigator} options = 
        {{
          headerShown:false,
        }}/>

        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Gallery" component={Gallerypage} options = 
      {{
        headerShown: true,
        headerTitle: 'SHARON',
        headerBackVisible: true,
        headerBackTitle: '',
        headerStyle: {
          
          backgroundColor: colors.primary_brown,
        },
        headerTitleStyle: 
        {
          fontSize:24,
          color: '#FFFFFF',
        },
        headerLeft: () => (
          <View>
            <TouchableOpacity style>
              <Feather name = 'arrow-left' size = {24} color = '#FFFFFF'/>
            </TouchableOpacity>
          </View>
        ),
        }}/>
      <Stack.Screen name="Contact" component={ContactPage} options = 
      {{
        headerShown: true,
        headerTitle: 'SHARON',
        headerBackVisible: true,
        headerBackTitle: '',
        headerStyle: {
          
          backgroundColor: colors.primary_brown,
        },
        headerTitleStyle: 
        {
          fontSize:24,
          color: '#FFFFFF',
        },
        
        /*headerLeft: () => (
          <View>
            <TouchableOpacity style>
              <Feather name = 'arrow-left' size = {24} color = '#FFFFFF'/>
            </TouchableOpacity>
          </View>
        ),*/
        }}/>

      <Stack.Screen name="Booking2" component={Bookingpage2} options = 
      {{
        headerShown: true,
        headerTitle: 'SHARON',
        headerBackVisible: true,
        headerBackTitle: '',
        headerStyle: {
          
          backgroundColor: colors.primary_brown,
        },
        headerTitleStyle: 
        {
          fontSize:24,
          color: '#FFFFFF',
        },
        /*headerLeft: () => (
          <View>
            <TouchableOpacity style>
              <Feather name = 'arrow-left' size = {24} color = '#FFFFFF'/>
            </TouchableOpacity>
          </View>
        ),*/
        }}/>
        
      <Stack.Screen name="Booking3" component={Bookingpage3} options = 
      {{
        headerShown: true,
        headerTitle: 'SHARON',
        headerBackVisible: true,
        headerBackTitle: '',
        headerStyle: {
          
          backgroundColor: colors.primary_brown,
        },
        headerTitleStyle: 
        {
          fontSize:24,
          color: '#FFFFFF',
        },
        /*headerLeft: () => (
          <View>
            <TouchableOpacity style>
              <Feather name = 'arrow-left' size = {24} color = '#FFFFFF'/>
            </TouchableOpacity>
          </View>
        ),*/
        }}/>

<Stack.Screen name="Booking4" component={Bookingpage4} options = 
      {{
        headerShown: true,
        headerTitle: 'SHARON',
        headerBackVisible: true,
        headerBackTitle: '',
        headerStyle: {
          
          backgroundColor: colors.primary_brown,
        },
        headerTitleStyle: 
        {
          fontSize:24,
          color: '#FFFFFF',
        },
        /*headerLeft: () => (
          <View>
            <TouchableOpacity style>
              <Feather name = 'arrow-left' size = {24} color = '#FFFFFF'/>
            </TouchableOpacity>
          </View>
        ),*/
        }}/>

      </Stack.Navigator>
    </NavigationContainer>
      );}

const styles = StyleSheet.create
({
});

export default App;