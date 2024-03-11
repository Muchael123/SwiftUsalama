import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "@/firebaseConfig";

const Alarms = () => {
    const db = getFirestore(app);
    useEffect(() => { 
        getAlarms()
    }, []);
    const getAlarms = async () => {
        const querySnapShot = await getDocs(collection(db, "alarms"));
        querySnapShot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
         })
  };
  return (
    <View>
      <Text>Alarms</Text>
    </View>
  );
};

export default Alarms;
