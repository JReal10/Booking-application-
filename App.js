import * as React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer} from '@react-navigation/native';
import StackNavigator from './assets/Navigation/StackNavigator';
import AuthStack from './assets/Navigation/AuthStack';
import { useContext,createContext,useState,useEffect } from 'react';
import {onAuthStateChanged} from 'firebase/auth';
import { ActivityIndicator, View } from 'react-native';
import { Authentication } from './assets/Config/firebase';

const AuthenticatedUserContext = createContext({});

const AuthenticatedUserProvider = ({children}) => {
    const [user,setUser] = useState(null);
    return(
      <AuthenticatedUserContext.Provider value = {{user,setUser}}>
        {children}
      </AuthenticatedUserContext.Provider>
    )
}

function RootNavigator()
  {
    const {user,setUser} = useContext(AuthenticatedUserContext);
    const [loading,setLoading] = useState(true);
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(Authentication, 
        async authenticatedUser => {authenticatedUser ? setUser(authenticatedUser):setUser(null); 
        setLoading(false);
      }
    );

    return () => unsubscribe()
    } ,[user]);

    if(loading){
    return(
      <View style = {{flex:1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size = 'large'/>
      </View>
    )
  }
    return (
      <NavigationContainer>
       {user ? <StackNavigator/> :<AuthStack/>} 
      </NavigationContainer>
    )
  }

export default function App()
{
  return(
  <AuthenticatedUserProvider>
    <RootNavigator/>
  </AuthenticatedUserProvider>
  )
};