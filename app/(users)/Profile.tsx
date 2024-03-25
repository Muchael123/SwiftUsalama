import {
  View,
  Text,
  Dimensions,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Pressable,
  ToastAndroid,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import Colors from "@/constants/Colors";
import { Fontisto, Feather, MaterialIcons } from "@expo/vector-icons";
import { Link, Redirect } from "expo-router/build/exports";
import { signOut, getAuth } from "@firebase/auth";
import { auth } from "@/firebaseConfig";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = () => {
  const [email, setEmail] = useState<string | null>();
    const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [image, setImage] = useState<string | null>(null);
  useEffect(() => {
    getUser();
    retrieveImage();
  }, []);

  const getUser = async () => {
    const myemail = await AsyncStorage.getItem("userEmail");
    setEmail(myemail);
    console.log("from email", myemail);
  };

  const logOut = async () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        showToast("Sign-out successful.");
        router.push("/Login");
      })
      .catch((error) => {
        showToast(" An error happened.");
      });
  };

  function showToast(message: string) {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result?.assets[0]?.uri);
      await AsyncStorage.setItem("profileImage", result?.assets[0]?.uri);
    }
  };

  const retrieveImage = async () => {
    const storedImage = await AsyncStorage.getItem("profileImage");
    if (storedImage) {
      setImage(storedImage);
    }
  };
  
const handlePhoneNumberChange = (input: string) => {
  // Remove all non-numeric characters
  const numericInput = input.replace(/[^0-9]/g, "");

  // Check if the input starts with "+254" or "07"
  if (numericInput.startsWith("254")) {
    setPhoneNumber(`+254${numericInput.substring(3, 12)}`);
  } else if (numericInput.startsWith("7")) {
    setPhoneNumber(`07${numericInput.substring(1, 10)}`);
  } else {
    setPhoneNumber(numericInput.substring(0, 10));
  }
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
            {image && (
              <Image
                source={{ uri: image }}
                style={{
                  borderRadius: Dimensions.get("window").width / 3,
                  height: "100%",
                  width: "100%",
                  objectFit: "cover",
                }}
              />
            )}
            <TouchableOpacity
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                zIndex: 999,
              }}
            >
              <Pressable
                onPress={() => {
                  pickImage();
                }}
              >
                <MaterialIcons
                  name="add-a-photo"
                  size={24}
                  color="white"
                  style={{
                    color: Colors.blue300,
                  }}
                />
              </Pressable>
            </TouchableOpacity>
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
            <TextInput
              // style={styles.input}
              placeholder="Enter phone number"
              value={phoneNumber}
              onChangeText={handlePhoneNumberChange}
              keyboardType="phone-pad"
            />
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
            {/* <Pressable>
              <Text
                style={{
                  color: Colors.white,
                  fontWeight: "bold",
                }}
              >
                Update Profile
              </Text>
            </Pressable> */}
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
