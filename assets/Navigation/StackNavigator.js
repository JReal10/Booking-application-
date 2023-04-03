import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../Screens/Homescreen';
import ContactPage from '../Screens/Contactpage';
import colors from '../Colors/colors';
import Bookingpage2 from '../Screens/Bookingpage2';
import Bookingpage3 from '../Screens/Bookingpage3';
import Bookingpage4 from '../Screens/Bookingpage4';
import Gallerypage from '../Screens/Gallerypage';
import DrawerNavigator from './DrawerNavigator';
import useFonts from '../Hooks/useFonts';
import AppLoading from 'expo-app-loading';
import { useState } from 'react';

const Stack = createNativeStackNavigator();

//create a navigation stack for seven screens: DrawerNavigator, HomeScreen, Gallerypage, ContactPage, BookingPage2, BookingPage3, BookingPage4
function StackNavigator() {

  const [IsReady, SetIsReady] = useState(false);// initialize state variable refreshing with true

   //A function to load fonts
   const FetchFonts = async () => {
    await useFonts();
  };

  //Loads the font if React Hook "isReady" is true, if not displays loading screen till it's true.
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
      <Stack.Navigator>
        <Stack.Screen name = "Tab" component={DrawerNavigator} options = 
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
        headerTintColor:colors.text_white,
        headerStyle: {
          
          backgroundColor: colors.primary_brown,
        },
        headerTitleStyle: 
        {
          fontSize:28,
          fontFamily:'DancingScript'
        },
        }}/>
        
      <Stack.Screen name="Contact" component={ContactPage} options = 
      {{
        headerShown: true,
        headerTitle: 'SHARON',
        headerBackVisible: true,
        headerBackTitle: '',
        headerTintColor:colors.text_white,
        headerStyle: {
          
          backgroundColor: colors.primary_brown,
        },
        headerTitleStyle: 
        {
          fontSize:28,
          fontFamily:'DancingScript'
        },
        }}/>

      <Stack.Screen name="Booking2" component={Bookingpage2} options = 
      {{
        headerShown: true,
        headerTitle: 'SHARON',
        headerBackVisible: true,
        headerBackTitle: '',
        headerTintColor:colors.text_white,
        headerStyle: {
          
          backgroundColor: colors.primary_brown,
        },
        headerTitleStyle: 
        {
          fontSize:28,
          fontFamily:'DancingScript'
        },
        }}/>
        
      <Stack.Screen name="Booking3" component={Bookingpage3} options = 
      {{
        headerShown: true,
        headerTitle: 'SHARON',
        headerBackVisible: true,
        headerBackTitle: '',
        headerTintColor:colors.text_white,
        headerStyle: {
          
          backgroundColor: colors.primary_brown,
        },
        headerTitleStyle: 
        {
          fontSize:28,
          fontFamily:'DancingScript'
        },
        }}/>

      <Stack.Screen name="Booking4" component={Bookingpage4} options = 
      {{
        headerShown: true,
        headerTitle: 'SHARON',
        headerBackVisible: false,
        headerStyle: {
          
          backgroundColor: colors.primary_brown,
        },
        headerTitleStyle: 
        {
          fontSize:28,
          color:'#FFFFFF',
          fontFamily:'DancingScript'
        },
        }}/>

      </Stack.Navigator>
      );}

export default StackNavigator;