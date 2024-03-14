import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import MapView, { Callout, Marker, AnimatedRegion } from "react-native-maps";
import React, { useEffect, useState } from "react";
import Colors from "@/constants/Colors";
import { Ionicons, FontAwesome } from "@expo/vector-icons";

const Home = () => {
  const kakamegaBoundaries = {
    minLatitude: 0.0,
    maxLatitude: 0.5,
    minLongitude: 34.5,
    maxLongitude: 35.5,
  };
  const [cordinates, setCordinates] = useState<
    { latitude: number; longitude: number }[]
  >([]);

  useEffect(() => {
    const newCordinates = [];
    for (let i = 0; i < 5; i++) {
      const latitude =
        Math.random() *
          (kakamegaBoundaries.maxLatitude - kakamegaBoundaries.minLatitude) +
        kakamegaBoundaries.minLatitude;
      const longitude =
        Math.random() *
          (kakamegaBoundaries.maxLongitude - kakamegaBoundaries.minLongitude) +
        kakamegaBoundaries.minLongitude;

      newCordinates.push({ latitude, longitude });
    }
    setCordinates(newCordinates);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.TopView}>
        <Text style={{ color: Colors.white, fontSize: 20 }}>Home</Text>
      </View>
      <View style={styles.BottomView}>
        <MapView
          mapType="hybrid"
          userInterfaceStyle="dark"
          liteMode={true}
          showsUserLocation={true}
          initialRegion={{
            latitude: 0.2827,
            longitude: 34.7519,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          style={styles.map}
        >
          {cordinates.map((coordinate, index) => (
            <Marker key={index} coordinate={coordinate}>
              <FontAwesome name="map-pin" size={24} color={Colors.red500} />
              <Callout>
                <Text>Margaret njoroge</Text>
              </Callout>
            </Marker>
          ))}
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
