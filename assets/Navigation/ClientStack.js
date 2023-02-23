import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ClientHomepage from '../Screens/ClientHomepage';
import colors from '../Colors/colors';
import useFonts from '../Hooks/useFonts';
import ClientDrawer from './ClientDrawer';

const Stack = createNativeStackNavigator();

function ClientStack() {

  useFonts();

  return (
      <Stack.Navigator>
        <Stack.Screen name = "Tab" component={ClientDrawer} options = 
        {{
          headerShown:false,
        }}/>
      </Stack.Navigator>
      );}

export default ClientStack;