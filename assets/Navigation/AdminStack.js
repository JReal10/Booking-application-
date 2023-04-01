import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import useFonts from '../Hooks/useFonts';
import adminDrawer from './AdminDrawer';


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
      </Stack.Navigator>
      );}

export default AdminStack;