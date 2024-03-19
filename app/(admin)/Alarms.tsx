import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import Colors from "@/constants/Colors";
import { Tabs } from "expo-router";
import { Link } from "expo-router";
type AlarmUser = {
  email: string;
  location: {
    latitude: number;
    longitude: number;
  };
  id: string;
};
const AlarmsScreen = () => {
  const [alarmUsers, setAlarmUsers] = useState<AlarmUser[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getAlarms();
  }, []);
  const getAlarms = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "Alarms"));
      console.log('from query',querySnapshot)
      const alarmsData = querySnapshot.docs.map((doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        })
      );
      setAlarmUsers(alarmsData);
      console.log('from alarmdata', alarmsData)
    } catch (error) {
      console.error("Error fetching alarms:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <View>
      <Tabs.Screen options={{}} />
      {loading && <ActivityIndicator />}
      {alarmUsers.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={alarmUsers}
          renderItem={({ item }) => {
            return (
              <Link href={`/${item.id}`} asChild>
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
                    {item.id}
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
        <Text>No alarms</Text>
      )}
    </View>
  );
};

export default AlarmsScreen;
