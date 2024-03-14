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
import { auth } from "@/firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "@/constants/styles";
import Colors from "@/constants/Colors";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { router } from "expo-router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      console.log(email, password);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User logged in:", user.uid);
      // You can store user data or navigate to another screen upon successful login
    } catch (error) {
      console.error("Error logging in:", error);
      Alert.alert("Error", "Failed to login. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" color={Colors.white} />}
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          gap: 30,
          height: Dimensions.get("window").height * 0.3,
        }}
      >
        <Image source={require("../../assets/images/favicon.png")} />
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            marginBottom: 20,
            textAlign: "center",
          }}
        >
          Welcome Back! Login
        </Text>
      </View>
      <TextInput
        autoCapitalize="none"
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={[styles.inputField, { marginBottom: 30 }]}
      />

      <TextInput
        autoCapitalize="none"
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
        style={[styles.inputField, { marginBottom: 30 }]}
      />
      <TouchableOpacity onPress={handleLogin} style={styles.btn}>
        <Text style={styles.btnText}>Login</Text>
      </TouchableOpacity>
      <Pressable onPress={() => router.push('/(modals)/Signup')}>
        <Text>Don't have an account? Signup</Text>
      </Pressable>
    </View>
  );
};

export default Login;
