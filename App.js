import * as React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer} from '@react-navigation/native';
import StackNavigator from './assets/Navigation/StackNavigator';
import AuthStack from './assets/Navigation/AuthStack';
import AdminStack from './assets/Navigation/AdminStack';
import { useContext,createContext,useState,useEffect } from 'react';
import {onAuthStateChanged} from 'firebase/auth';
import { ActivityIndicator, View } from 'react-native';
import { Authentication } from './assets/Config/firebase';

const AuthenticatedUserContext = createContext({});

//Create a global state for the authenticated user and its unique id.
const AuthenticatedUserProvider = ({children}) => {
    const [user,setUser] = useState(null);
    const [uid,setUid] = useState(null);
    
    return(
      <AuthenticatedUserContext.Provider value = {{user,setUser,uid,setUid}}>
        {children}
      </AuthenticatedUserContext.Provider>
    )
}

function RootNavigator()
  {
    //The useContext hook is used to access and update the state throughout the app
    const {user,setUser} = useContext(AuthenticatedUserContext);
    const {uid,setUid} = useContext(AuthenticatedUserContext);
    const [loading,setLoading] = useState(true);

    //The onAuthStateChanged function from Firebase is used to listen to the authentication state changes, and the setUser and setUid functions are used to update the global state of the authenticated user and its unique id based on the current authentication state.
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(Authentication, 
        async authenticatedUser => {authenticatedUser ? setUser(authenticatedUser):setUser(null);
        authenticatedUser ? setUid(authenticatedUser.uid):setUid(null); 
        setLoading(false);
        console.log(uid);
      }
    );

    return () => unsubscribe()
    } ,[user]);

    //The ActivityIndicator component is displayed when the app is loading the authentication state changes.
    if(loading){
    return(
      <View style = {{flex:1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size = 'large'/>
      </View>
      )
    }
    //directs the user to admin page if the uid matches with the authentication
    return (
      <NavigationContainer>
       {(user && uid != 'DmkZbAIep7Sv3o990gcMz2rDMep2') ? <StackNavigator/> :(user && uid == 'DmkZbAIep7Sv3o990gcMz2rDMep2') ? <AdminStack/> : <AuthStack/>} 
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