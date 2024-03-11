import { View, Text, Platform, FlatList, Touchable, TouchableOpacity, Dimensions, Pressable } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import Dumy from "@/constants/Dumy";
import { Entypo } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
const Scan = () => {
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
        data={Dumy}
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
                {item.username}
              </Text>
              <Text
                style={{
                  color: Colors.blue400,
                }}
              >
                {item.complaint}
              </Text>
              <Text
                style={{
                  color: Colors.blue400,
                }}
              >
                {item.Date}
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
