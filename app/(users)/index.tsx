import {
  View,
  Text,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "@/constants/Colors";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { collection, addDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import * as Location from "expo-location";


import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect } from "expo-router";

type AlarmUser = {
  location: Location;
  id: string;
};
type Location = {
  latitude: number;
  longitude: number;
}

const Home = () => {
  const [alarm, setAlarm] = useState(false);
  const [user, setUser] = useState<string | null>(""); // Explicitly specify the type of 'user' as string
  const [location, setLocation] = useState<Location>();
  const [errorMsg, setErrorMsg] = useState('');
  const [alarmDetails, setAlarmDetails] = useState<string>('')
  

  useEffect(() => {
    (async () => {
      const usersetails = await AsyncStorage.getItem('user')
      setUser(usersetails)
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      setUsername();
      console.log('from index',usersetails)
      const location = await Location.getCurrentPositionAsync({});
      setLocation({ latitude: location?.coords?.latitude , longitude: location?.coords?.longitude});
    })();
  }, []);
    const setUsername = async()=>{  
      const userid = await AsyncStorage.getItem('user')
      setUser(userid!)
    }
    console.log('from index 55', user)
  async function HandlePress() {
        console.log(location)
        if(!alarm){
          setAlarm(true);
          const success = await addComplaint("Alarms", {
            location: location,
            AlarmRaiser: user
          });
          
        } else{
          setAlarm(false);
          const Recentsuccess = await addComplaint("RecentAlarms", {
            location: location,
            AlarmRaiser: user,
          });
          console.log('recent alarms', Recentsuccess)
          const success = await removecomplaint(
            "Alarms",
            alarmDetails
          );
          setAlarm(false);
        }
  }
  const addComplaint = async (collectionName: string, data: AlarmUser) => {
    try {
      // Add a new document with a generated ID to the specified collection
     const AddedData =  await addDoc(collection(db, collectionName), data);
      console.log("Data uploaded successfully!", AddedData.id);
      setAlarmDetails(AddedData.id)
      return true; // Indicate success
    } catch (error) {
      console.error("Error uploading data:", error);
      return false; // Indicate failure
    }
  };
  const removecomplaint = async(collectioname: string, collectionid: string)=>{
    try{
      await deleteDoc(doc(db, collectioname, collectionid))
      console.log("Data removed successfully!");
      return true;
    }catch(error: any){
      console.error('error removing the alarm',error)
      return false;
    }
  }
  
  
  if (user === null ) {
        return <Redirect href="/(modals)/Login" />;
   }
  
        return (
      <View
        style={{
          flex: 1,
          width: "100%",
        }}
      >
        <View
          style={{
            backgroundColor: alarm ? Colors.red400 : Colors.blue400,
            flex: 7,
            gap: 15,
            alignItems: "center",
            paddingTop: Platform.OS === "android" ? 50 : 0,
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 20,
              color: Colors.white,
            }}
          >
            {user}
          </Text>
          <Text
            style={{
              color: Colors.white,
              borderBottomWidth: 1,
              borderColor: Colors.white,
              borderStyle: "dashed",
              paddingBottom: 4,
              borderRadius: 1,
            }}
          >
            <Ionicons name="location" size={24} color={Colors.white} />
            Kakamega, Kenya
          </Text>
        </View>
        <View
          style={{
            backgroundColor: Colors.white,
            flex: 5,
          }}
        ></View>
        <TouchableOpacity
          onPress={HandlePress}
          style={{
            position: "absolute",
            padding: 10,
            top: "38%",
            left: 30,
            width: 300,
            height: 300,
            borderRadius: 150,
            borderColor: Colors.white,
            borderWidth: 2,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: alarm ? Colors.red500 : Colors.grey300,
              width: "100%",
              borderColor: Colors.white,
              borderWidth: 10,
              height: "100%",
              borderRadius: 140,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AntDesign name="Safety" size={80} color={Colors.white} />
            <Text
              style={{
                fontSize: 30,
                fontWeight: "bold",
                color: Colors.white,
              }}
            >
              {alarm ? "Cancel Alarm" : "Sound Alarm"}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

export default Home;
