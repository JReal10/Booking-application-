import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabNavigator from './TabNavigator';
import colors from '../Colors/colors';
import CustomDrawer from '../Components/CustomDrawer';

const Drawer = createDrawerNavigator();

function DrawerNavigator() {

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
          fontSize:24,
        },

    }}>

      <Drawer.Screen name = {'Home'} component = {TabNavigator} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator