import { View, Text, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { Link, Redirect, router } from "expo-router";
import Colors from "@/constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Main from "./components/main";

const index = () => {
  const [userId, setUserId] = useState<string | null>('')
  useEffect(()=>{
    setUser()
    
  }, [userId])
  if(userId === null){
    console.log('no user')
    router.push('/Login')
   }
  const setUser= async ()=>{
    const id = await AsyncStorage.getItem('user')
    setUserId(id)
  }

   
   return(<Main/>)
};

export default index;
