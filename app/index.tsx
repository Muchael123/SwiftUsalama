import { View, Text, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { Link, Redirect } from "expo-router";
import Colors from "@/constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

const index = () => {
   const [user, setUser] = useState<string>(""); // Explicitly specify the type of 'user' as string
   useEffect(() => {
     const getData = async () => {
       try {
         const Username = await AsyncStorage.getItem("username");
         if (Username !== null) {
           setUser(Username);
         }
       } catch (e) {
         // error reading value
         console.log(e);
       }
     };
     getData();
   }, [user]);

  if (!user) {
    return <Redirect href="/(modals)/Login" />;
  }
  
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
      }}
    >
      <Link href={"/(users)/"} asChild>
        <Pressable
          style={{
            width: "100%",
            backgroundColor: Colors.blue500,
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
          }}
        >
          <Text style={{ color: Colors.white }}>Login as user</Text>
        </Pressable>
      </Link>
      <Link href={"/(admin)/"} asChild>
        <Pressable
          style={{
            width: "100%",
            backgroundColor: Colors.blue500,
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
            marginTop: 10,
          }}
        >
          <Text style={{ color: Colors.white }}>Login as admin</Text>
        </Pressable>
      </Link>
    </View>
  );
};

export default index;
