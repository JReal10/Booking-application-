import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ClientHomepage from '../Screens/ClientHomepage';
import colors from '../Colors/colors';
import CustomDrawer from '../Components/ClientCustomDrawer';
import useFonts from '../Hooks/useFonts';
import AddMenu from '../Screens/ClientSettingpage'
import ClientSettingpage from '../Screens/ClientSettingpage';

const Drawer = createDrawerNavigator();

function ClientDrawer() {

  useFonts();

  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawer {...props}/>} screenOptions= 
    {{
      headerShown: true,
        headerTitle: 'Appointments',
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

      <Drawer.Screen name = {'Home'} component = {ClientHomepage} />
      <Drawer.Screen name = {'Add Menu'} component = {AddMenu} />
      <Drawer.Screen name = {'Energy Consumption'} component = {ClientSettingpage} />
      <Drawer.Screen name = {'Profit'} component = {ClientSettingpage} />

    </Drawer.Navigator>
  );
}

export default ClientDrawer;