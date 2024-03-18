import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { collection, getDoc, doc } from "firebase/firestore";
import MapView, { Marker } from "react-native-maps";
import React, { useEffect, useState } from "react";
import Colors from "@/constants/Colors";
import { Stack, useLocalSearchParams } from "expo-router";
import { db } from "@/firebaseConfig";

type AlarmData = {
  AlarmRaiser: string;
  location: {
    latitude: number;
    longitude: number;
  };
};
type LocationMap = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

const Home = () => {
  const { id } = useLocalSearchParams();
  const [alarmData, setAlarmData] = useState<AlarmData | null>(null);
  const [loading, setLoading] = useState(false);
  const [initialLoc, setinitialLoc] = useState <LocationMap>();
  useEffect(() => {
    fetchData();
  }, []);
const fetchData = async () => {
  setLoading(true);
  try {
    const docRef = doc(db, "Alarms", `${id}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const alarmData = docSnap.data();
      console.log("from alarm Map", alarmData);
      setAlarmData(alarmData);
      setinitialLoc(alarmData);
    } else {
      // Document doesn't exist, handle appropriately
      console.log("Document does not exist");
      setinitialLoc({
        latitude: 0.2927,
        longitude: 34.7519,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  } catch (error) {
    console.error("Error getting document:", error);
    // Handle error
    setinitialLoc({
      latitude: 0.2927,
      longitude: 34.7519,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  } finally {
    setLoading(false);
  }
};

console.log('above return',alarmData, initialLoc)
  if (id === null) {
    return <Text>Not found</Text>;
  }
  return (
    <View style={{ flex: 1 }}>
      {loading && <ActivityIndicator />}
      <Stack.Screen options={{ title: `${id}` }} />
      <View style={styles.TopView}>
        <Text style={{ color: Colors.white, fontSize: 20 }}>Home</Text>
      </View>
      <View style={styles.BottomView}>
        <MapView
          mapType="hybrid"
          userInterfaceStyle="dark"
          liteMode={true}
          showsUserLocation={true}
          initialRegion={initialLoc}
          style={styles.map}
        >
          {alarmData && (
            <Marker
              coordinate={{
                latitude: alarmData.location.latitude,
                longitude: alarmData.location.longitude,
              }}
            />
          )}
        </MapView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  TopView: {
    backgroundColor: Colors.blue400,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    elevation: 10,
  },
  BottomView: {
    height: (Dimensions.get("window").height * 3) / 4,
    width: Dimensions.get("window").width,
    flex: 4,
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

export default Home;
