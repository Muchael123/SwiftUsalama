import { View, Text, FlatList, ActivityIndicator, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app,db } from "@/firebaseConfig";
import Colors from "@/constants/Colors";
import { Tabs } from "expo-router";
import { Link } from "expo-router";
type AlarmUser = {
    Username: string;
    location: {
        latitude: number;
        longitude: number;
    };
    }
const AlarmsScreen = () => {
    const [alarmUsers, setAlarmUsers] = useState<AlarmUser[]>([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => { 
        getAlarms()
    }, []);
    const getAlarms = async () => {
        setLoading((prev) => !prev);
      const querySnapShot = await getDocs(collection(db, "alarms"));
      setAlarmUsers(querySnapShot.docs.map((doc) => doc.data() as AlarmUser));
        querySnapShot.forEach((doc) => {
            console.log('from query',doc.data());
            
        })
        console.log('alarm uses',alarmUsers);
        setLoading((prev) => !prev);
  };
  return (
      <View>
          <Tabs.Screen options={{}} />
          {loading && <ActivityIndicator/>}
      {alarmUsers.length > 0 ? (
        <FlatList
        showsVerticalScrollIndicator={false}
        data={alarmUsers}
        renderItem={({ item }) => {
          return (
            <Link href={`/${item.location}`} asChild>
              <Pressable
                style={{
                  backgroundColor: Colors.red500,
                  padding: 10,
                  margin: 10,
                  borderRadius: 20,
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 20,
                    color: Colors.white,
                  }}
                >
                  {item.Username}
                </Text>
                <Text
                  style={{
                    color: Colors.white,
                  }}
                >
                  {item.location.latitude}
                </Text>
                <Text
                  style={{
                    color: Colors.white,
                  }}
                >
                  {item.location.longitude}
                </Text>
              </Pressable>
            </Link>
          );
        }}
    />
    ) : (
        <Text
     >No alarms</Text>
          )
          }
          </View>
  );
};

export default AlarmsScreen;
