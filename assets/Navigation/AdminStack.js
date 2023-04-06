import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import useFonts from '../Hooks/useFonts';
import adminDrawer from './AdminDrawer';
import DeleteMenu from '../Screens/DeleteMenu';
import { Dimensions } from 'react-native';
import colors from '../Colors/colors';

const { width, height } = Dimensions.get('window');

const Stack = createNativeStackNavigator();

//create a navigation stack for a screen: adminDrawer
function AdminStack() {

  useFonts();

  return (
      <Stack.Navigator>
        <Stack.Screen name = "Tab" component={adminDrawer} options = 
        {{
          headerShown:false,
        }}/>
        <Stack.Screen name = "delete menu" component={DeleteMenu} options = 
        {{
          headerShown:true,
          headerTitle: 'Menu',
          headerTintColor:colors.primary_brown,
          drawerActiveTintColor:colors.text_brown,
          headerBackVisible: true,
          headerBackTitle: '',
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
        }}/>
      </Stack.Navigator>
      );}

export default AdminStack;