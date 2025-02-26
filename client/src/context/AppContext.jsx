import axios from "axios";
import { createContext, useEffect, useState } from "react";
// import { data } from "react-router-dom";
import { toast } from "react-toastify";
export const AppContent = createContext()

export const AppContextProvider = (props)=>{

  axios.defaults.withCredentials=true;
const backendUrl = import.meta.env.VITE_BACKEND_URL
const [isLoggedin,setIsLoggedin] = useState(false);
const [userData,setUserData] = useState(false);
const getAuthState = async()=>{
  try {
    const {data} = await axios.get(backendUrl + '/api/auth/is-auth');
    if(data.success){
      setIsLoggedin(true);
      getUserData();
    }
    
  } catch (error) {
    toast.error(error.message);
  }
}

const getUserData = async ()=>{
  try {
    const { data } = await axios.get(backendUrl + '/api/user/data');
    console.log("datas that are stored in user",data,"success value is",data.success)
    data.success ? setUserData(data.userData) : toast.error(data.message)
  } catch (error) {
    toast.error(error.message)
  }
}

useEffect(()=>{
  getAuthState();
},[])

  const value = {
    backendUrl,
    isLoggedin,setIsLoggedin,
    userData,setUserData,
    getUserData

  }
  return (
    <AppContent.Provider value = {value}>
        {props.children}
    </AppContent.Provider>
  )
}