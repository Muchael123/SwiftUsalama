import {
  View,
  Text,
  Dimensions,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "@/constants/Colors";
import { Fontisto, Feather, MaterialIcons } from "@expo/vector-icons";
import { Link, Redirect } from "expo-router/build/exports";
import { signOut } from "@firebase/auth";
import { auth } from "@/firebaseConfig";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = () => {
const [email,setEmail] = useState<string | null>()

  useEffect(()=>{
getUser()
  },[])
  const getUser = async ()=>{
    const myemail = await AsyncStorage.getItem("userEmail");
    setEmail(myemail)
    console.log('from email',myemail)
  }
  const logOut = async () => {
    signOut(auth);
    AsyncStorage.removeItem("user");
    console.log(AsyncStorage.getItem("user"));
    console.log("signed out");
    router.push("/");
  };
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          backgroundColor: Colors.blue100,
          flex: 1,
        }}
      >
        <View
          style={{
            position: "absolute",
            bottom: -Dimensions.get("window").width / 3 / 2 + 7,
            left: Dimensions.get("window").width / 3,
            backgroundColor: Colors.blue400,
            borderRadius: Dimensions.get("window").width / 3,
            height: Dimensions.get("window").width / 3,
            width: Dimensions.get("window").width / 3,
            borderColor: Colors.white,
            elevation: 10,
            borderWidth: 5,
          }}
        >
          <View>
            <Image
              style={{
                borderRadius: Dimensions.get("window").width / 3,
                height: "100%",
                width: "100%",

                objectFit: "cover",
              }}
              source={require("@/assets/images/download12.jpg")}
            />
            <MaterialIcons
              name="add-a-photo"
              size={24}
              color='white'
              style={{
                position: "absolute",
                bottom: 10,
                right: 10,
                color: Colors.blue200
              }}
            />
          </View>
        </View>
      </View>
      <View
        style={{
          flex: 3,
          paddingTop: Dimensions.get("window").width / 5,
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: Colors.blue400,
            }}
          >
            Margaret Njoki
          </Text>
          <Text
            style={{
              fontSize: 12,
            }}
          >
            Kakamega, Kenya
          </Text>
        </View>
        <View
          style={{
            padding: 40,
            marginTop: Dimensions.get("window").height / 70,
            gap: 16,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              width: "100%",
              textAlign: "center",
              textDecorationLine: "underline",
            }}
          >
            Profile Details
          </Text>
          <View
            style={{
              flexDirection: "column",
              borderColor: Colors.grey200,
              borderWidth: StyleSheet.hairlineWidth,
              justifyContent: "space-between",
              borderRadius: 10,
              paddingHorizontal: 10,
              paddingVertical: 10,
            }}
          >
            <Text
              style={{
                color: Colors.grey600,
                fontWeight: "bold",
                fontSize: 16,
                marginBottom: 10,
              }}
            >
              <Feather name="phone" size={16} color={Colors.grey400} />
              {"   "}
              Phone Number
            </Text>
            <TextInput placeholder="Enter phone number" />
          </View>
          <View
            style={{
              flexDirection: "column",
              borderColor: Colors.grey200,
              borderWidth: StyleSheet.hairlineWidth,
              justifyContent: "space-between",
              borderRadius: 10,
              paddingHorizontal: 10,
              paddingVertical: 10,
            }}
          >
            <Text
              style={{
                color: Colors.grey600,
                fontWeight: "bold",
                fontSize: 16,
                marginBottom: 10,
              }}
            >
              <Fontisto name="email" size={16} color={Colors.grey400} /> {"  "}{" "}
              Email
            </Text>
            <Text>{email}</Text>

          </View>
          <Link
            href="/(modals)/ChangeProfile"
            asChild
            style={{
              backgroundColor: Colors.blue400,
              padding: 10,
              borderRadius: 10,
              height: 50,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <Pressable>
              <Text
                style={{
                  color: Colors.white,
                  fontWeight: "bold",
                }}
              >
                Update Profile
              </Text>
            </Pressable>
          </Link>
          <Pressable
            onPress={logOut}
            style={{
              backgroundColor: Colors.blue400,
              padding: 10,
              borderRadius: 10,
              height: 50,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <Text
              style={{
                color: Colors.white,
                fontWeight: "bold",
              }}
            >
              Log out
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Profile;
