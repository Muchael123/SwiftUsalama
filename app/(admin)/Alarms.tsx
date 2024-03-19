import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { onSnapshot, collection } from "firebase/firestore";
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
    const unsubscribe = getAlarms();

    return () => unsubscribe(); // Cleanup function to unsubscribe from real-time updates

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAlarms = () => {
    setLoading(true);

    const query = collection(db, "Alarms");
    const unsubscribe = onSnapshot(query, (snapshot) => {
      const alarmsData: AlarmUser[] = [];
      snapshot.forEach((doc) => {
        alarmsData.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setAlarmUsers(alarmsData);
      setLoading(false);
    });

    return unsubscribe;
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
                  <Text style={{ color: Colors.white }}>
                    {item.location.latitude}
                  </Text>
                  <Text style={{ color: Colors.white }}>
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
