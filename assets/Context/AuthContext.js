import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {createContext,useState,useEffect} from "react";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Authentication } from '../Config/firebase';

export const AuthContext = createContext();

export const AuthProvider = ({children}) =>{
  const [isLoading,setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);

  const login = () => 
  {
    signInWithEmailAndPassword(Authentication,email,password)
    .then((re) => 
    {
      setIsLoading(true);
      setUserToken('sample');
      AsyncStorage.setItem('userToken','sample');
      setIsLoading(false);
    })
    .catch((re) =>
    {
      console.log(re);
    })
  }

  const logout = () =>
  {
    setIsLoading(true);
    setUserToken(null);
    AsyncStorage.removeItem('userToken')
    setIsLoading(false);
  }

  return (
    <AuthContext.Provider value ={{login,logout,isLoading,userToken,email,password}}>
      {children}
      </AuthContext.Provider>
  );
}


