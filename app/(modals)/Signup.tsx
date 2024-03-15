import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  ActivityIndicator,
  Alert,
  Pressable,
} from "react-native";
import { auth,db } from "@/firebaseConfig";
import {addDoc, collection,serverTimestamp} from "firebase/firestore"
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "@/constants/styles";
import Colors from "@/constants/Colors";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { Stack, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordReapeat, setPasswordRepeat] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      console.log(email, password, passwordReapeat);
      if (password === passwordReapeat) {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        await AsyncStorage.setItem("user", user.uid);
          await addDoc(collection(db,"users",user.email,"userdetails"),{
        Email:user.email,
        isAdmin:false,
        phoneNumber:user.phoneNumber,
        userImage:user.photoURL,
        userName:null
      })
        router.push("/(admin)/"); // Convert user object to string
        console.log("User logged in:", user.uid);
      } else
        Alert.alert(
          "Paasword mismatch",
          "Failed to login. Ensure that your passwords match"
        );
      // You can store user data or navigate to another screen upon successful login
    } catch (error) {
      if (error) console.error("Error logging in:", error);
      Alert.alert("Error", "Failed to login. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const Handlegoogle = async () => {
    try {
      setLoading(true);
      // const userCredential = (auth, email, password);
      const user = userCredential.user;
      await AsyncStorage.setItem("user", user.uid);
      router.push("/");
      setLoading(false); // Convert user object to string
      console.log("User logged in:", user.uid);
    } catch (error) {
      console.error("Error logging in:", error);
      Alert.alert("Error", "Failed to login. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      
      {loading?<ActivityIndicator size="large"  />:
     (<>
      <View
        style={{
          justifyContent: "center",
        }}
      >
        <Image style={{width: "90%",}} resizeMode="contain" source={require("../../assets/images/favicon.png")} />
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            marginBottom: 30,
            textAlign: "center",
            
          }}
        >
          Welcome To Swift-Usalama! Enter your details to Sign Up
        </Text>
        
      </View>
      <TextInput
        autoCapitalize="none"
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={[styles.inputField, { marginBottom: 30,}]}
      />

      <TextInput
        autoCapitalize="none"
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
        style={[styles.inputField, { marginBottom: 30 }]}
      />
      <TextInput
        autoCapitalize="none"
        placeholder="Confirm Password"
        secureTextEntry={true}
        value={passwordReapeat}
        onChangeText={(text) => setPasswordRepeat(text)}
        style={[styles.inputField, { marginBottom: 30 }]}
      />
      <TouchableOpacity onPress={handleLogin} style={styles.btn}>
        <Text style={styles.btnText}>Sign Up</Text>
      </TouchableOpacity>
      <Pressable onPress={() => router.push("/(modals)/Login")}>
        <Text>Already have an account? Sign In</Text>
      </Pressable>
      <View style={styles.separatorView}>
        <View
          style={{
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderBottomColor: "#000",
            flex: 1,
          }}
        />
        <Text style={styles.separator}>or</Text>
        <View
          style={{
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderBottomColor: "#000",
            flex: 1,
          }}
        />
      </View>
      <View style={{ gap: 20 }}>
        <TouchableOpacity onPress={Handlegoogle} style={styles.btnOutline}>
          <Ionicons name="logo-google" size={24} style={styles.btnIcon} />
          <Text style={styles.btnOutlineText}>Sign Up with Google</Text>
        </TouchableOpacity>
      </View>
     </>)
      }
    </View>
   
    </>

  );
};

export default Signup;
