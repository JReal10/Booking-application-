import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AdminHomepage from '../Screens/AdminHomepage';
import colors from '../Colors/colors';
import CustomDrawer from '../Components/AdminCustomDrawer';
import useFonts from '../Hooks/useFonts';
import Revenue from '../Screens/Revenue';
import AdminAddMenu from '../Screens/AdminAddMenu';
import AppLoading from 'expo-app-loading';
import EnergyConsumption from '../Screens/EnergyConsumption';

const Drawer = createDrawerNavigator();

const { width, height } = Dimensions.get('window');

//create a navigation drawer for a screen: CustomDrawer, AdminHomepage, AdminAddMenu, EbergyConsumption and Revenue
function AdminDrawer() {

  const [IsReady,SetIsReady] = useState(false);

  const FetchFonts = async () => {
    await useFonts();
  };

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
          fontSize:height * 0.025,
          fontFamily:'Poppins-SemiBold'
        },
    }}>

      <Drawer.Screen name = {'Home'} component = {AdminHomepage} options ={{
        headerTitle: 'Appointments',
      }} />
      <Drawer.Screen name = {'Add Menu'} component = {AdminAddMenu} options ={{
        headerTitle: 'Menu',
      }}/>
      <Drawer.Screen name = {'Energy Consumption'} component = {EnergyConsumption} options ={{
        headerTitle: 'Energy Consumption',
      }}/>
      <Drawer.Screen name = {'Salon Revenue'} component = {Revenue} options ={{
      headerTitle: 'Revenue',
      }}/>

    </Drawer.Navigator>
  );
}

export default AdminDrawer;