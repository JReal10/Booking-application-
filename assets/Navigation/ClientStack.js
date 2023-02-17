import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ClientHomepage from '../Screens/ClientHomepage';
import colors from '../Colors/colors';
import useFonts from '../Hooks/useFonts';

const Stack = createNativeStackNavigator();

function ClientStack() {

  useFonts();

  return (
      <Stack.Navigator>
        <Stack.Screen name="Home" component={ClientHomepage} options = {{
        headerShown: false,
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
        }} />
      </Stack.Navigator>
      );}

export default ClientStack;