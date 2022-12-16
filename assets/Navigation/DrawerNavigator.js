import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Bookingpage1 from '../Screens/Bookingpage1';
import TabNavigator from './TabNavigator';
import colors from '../Colors/colors';

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator>

      <Drawer.Screen name = {'Home_tab'} component = {TabNavigator} 
      options = {{
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

        }}/>
      <Drawer.Screen name = {'BookingPage'} component = {Bookingpage1}
      options = {{
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

        }}/>
    </Drawer.Navigator>
  );
}

export default DrawerNavigator