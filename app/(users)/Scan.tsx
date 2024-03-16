import { View, Text, Platform, FlatList, Touchable, TouchableOpacity, Dimensions, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "@/constants/Colors";
import { Entypo } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { Link } from "expo-router";
import formatDate from "@/Hooks/DateTimeConverter";
const Scan = () => {
  const [complaints, setComplaints] = useState<AlarmUser[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getComplaints();
  }, []);
  const getComplaints = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "Complaints"));
      const complaintData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(complaintData);
      setComplaints(complaintData);
    } catch (error) {
      console.error("Error fetching complaints:", error);
    } finally {
      setLoading(false);
    }
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
          Recent complaints recieved
        </Text>
      </View>
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
