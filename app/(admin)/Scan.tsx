import {
  View,
  Text,
  Platform,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Pressable,
} from "react-native";
import LottieView from "lottie-react-native";
import React, { useEffect, useRef, useState } from "react";
import Colors from "@/constants/Colors";
import { Entypo } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { Link } from "expo-router";
import formatDate from "@/Hooks/DateTimeConverter";

const Scan = () => {
  const [complaints, setComplaints] = useState<AlarmUser[]>([]);
  const [loading, setLoading] = useState(false);
  const animation = useRef(null);

  useEffect(() => {
    const unsubscribe = listenForComplaints();
    return () => unsubscribe();
  }, []);

  const listenForComplaints = () => {
    setLoading(true);
    return onSnapshot(collection(db, "Complaints"), (snapshot) => {
      const complaintData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComplaints(complaintData);
      setLoading(false);
    });
  };

  return (
    <LinearGradient
      colors={[Colors.blue400, Colors.blue400, Colors.white]}
      style={{
        flex: 1,
        alignItems: "center",
        paddingTop: Platform.OS === "android" ? 50 : 0,
      }}
    >
      <View>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 25,
            color: Colors.white,
          }}
        >
          Recent complaints received
        </Text>
      </View>
      {loading ? (
        <View>
      
        </View>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={complaints}
          renderItem={({ item }) => {
            return (
              <View
                style={{
                  backgroundColor: Colors.white,
                  padding: 10,
                  margin: 10,
                  minWidth: Dimensions.get("window").width / 1.2,
                  borderRadius: 10,
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 20,
                    color: Colors.blue400,
                  }}
                >
                  {item.title}
                </Text>
                <Text
                  style={{
                    color: Colors.blue400,
                  }}
                >
                  {item.description}
                </Text>
                <Text
                  style={{
                    color: Colors.blue400,
                  }}
                >
                  {formatDate(item.date)}
                </Text>
              </View>
            );
          }}
        />
      )}
      <View>
        <Link
          href="/(modals)/createComplaint"
          asChild
          style={{
            position: "absolute",
            backgroundColor: Colors.blue500,
            padding: 10,
            bottom: 20,
            borderRadius: 50,
            left: Dimensions.get("window").width / 3,
          }}
        >
          <Pressable>
            <Entypo name="add-to-list" size={24} color={Colors.white} />
          </Pressable>
        </Link>
      </View>
    </LinearGradient>
  );
};

export default Scan;
