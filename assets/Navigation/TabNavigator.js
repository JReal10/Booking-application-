import * as React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Dimensions } from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/Homescreen'
import colors from '../Colors/colors';
import Bookingpage1 from '../Screens/Bookingpage1';
import Profilepage from '../Screens/Profilepage';

const Tab = createBottomTabNavigator();
const { width, height } = Dimensions.get('window');

//create a navigation tab for a screen: HomeScreen, BookingPage1 and ProfilePage

function TabNavigator() {

  return (
    <Tab.Navigator 
    screenOptions= 
    {{
      tabBarStyle:
      {
        height:height * 0.11,
        backgroundColor: colors.text_white,
        elevation: 0,
        position: 'absolute',
        borderRadius:15,
      },
      tabBarInactiveTintColor:colors.secondary_green,
      tabBarActiveTintColor:colors.secondary_green,
      tabBarShowLabel: false,

    }}>

      <Tab.Screen name="Home" component={HomeScreen} options = {{
        tabBarIcon: () => <Entypo name = "home" size = {height * 0.04} color =  {colors.icon_dark}/>,
        headerShown: false,
      }}/>

      <Tab.Screen name="Booking1" component={Bookingpage1} options = {{
        tabBarIcon: () => <FontAwesome5 name = "calendar-alt" size = {height * 0.04}color =  {colors.icon_dark}/>,
        headerShown: false,
        }}/>

      <Tab.Screen name="Profile" component={Profilepage} 
      options = {{
        tabBarIcon: () => <MaterialCommunityIcons name = "account" size = {height * 0.05} color =  {colors.icon_dark}/>,
        headerShown: false,
        }}/>
    </Tab.Navigator>
  );
}

export default TabNavigator;