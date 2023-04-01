import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabNavigator from './TabNavigator';
import colors from '../Colors/colors';
import CustomDrawer from '../Components/CustomDrawer';
import useFonts from '../Hooks/useFonts';

const Drawer = createDrawerNavigator();

//create a navigation drawer for two screens: CustomDrawer and TabNavigtor.
function DrawerNavigator() {

  useFonts();

  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawer {...props}/>} screenOptions= 
    {{
      headerShown: true,
        headerTitle: 'SHARON',
        headerTintColor:colors.text_white,
        drawerActiveTintColor:colors.text_brown,
        headerStyle: 
        {  
          backgroundColor: colors.primary_brown,
        },
        headerTitleStyle: 
        {
          fontSize:28,
          fontFamily:'DancingScript'
        },
        drawerItemStyle: {
          display: 'none',
        },
    }}>

      <Drawer.Screen name = {'Home Page'} component = {TabNavigator} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator