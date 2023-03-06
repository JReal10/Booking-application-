import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ClientHomepage from '../Screens/ClientHomepage';
import colors from '../Colors/colors';
import CustomDrawer from '../Components/ClientCustomDrawer';
import useFonts from '../Hooks/useFonts';
import ClientAddMenu from '../Screens/ClientAddMenu';

const Drawer = createDrawerNavigator();

function ClientDrawer() {

  useFonts();

  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawer {...props}/>} screenOptions= 
    {{
      headerShown: true,
        headerTintColor:colors.primary_brown,
        drawerActiveTintColor:colors.text_brown,
        headerStyle: 
        {  
          backgroundColor: colors.background,
          shadowColor: 'transparent',

        },
        headerTitleStyle: 
        {
          fontSize:20,
          fontFamily:'Poppins-SemiBold'
        },
    }}>

      <Drawer.Screen name = {'Home'} component = {ClientHomepage} options ={{
        headerTitle: 'Appointments',
      }} />
      <Drawer.Screen name = {'Add Menu'} component = {ClientAddMenu} options ={{
        headerTitle: 'Add Menu',
      }}/>

    </Drawer.Navigator>
  );
}

export default ClientDrawer;