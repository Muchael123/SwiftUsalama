import { View, Text, TextInput,ToastAndroid, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "@/constants/styles";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";


type Complaint = {
  title: string;
  description: string;
  date: number;
  user: string | null
};

const createComplaint = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [complaint, setComplaint] = useState<Complaint[]>([]);

 
  const addComplaint = async (collectionName: string, data: Complaint) => {
    try {
      // Add a new document with a generated ID to the specified collection
      await addDoc(collection(db, collectionName), data);
      console.log("Data uploaded successfully!");
      return true; // Indicate success
    } catch (error) {
      console.error("Error uploading data:", error);
      return false; // Indicate failure
    }
  };
  function showToast(message:string) {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  }

  const handleSubmit = async () => {
    try {
      setLoading(true);
      console.log(title, description);
      const userId = await AsyncStorage.getItem("user")

      // upload complaint
      const success = await addComplaint("Complaints", {
        title: title,
        description: description,
        date: Date.now(),
        user: userId
      });
      if (success) {
        showToast("Complaint added successfully!!")
        router.push("/(users)/Scan");
      } else {
        Alert.alert("Error", "Failed to add complaint.");
        
      }
    } catch (error) {
      console.error("Error submit in:", error);
      Alert.alert("Error", "Failed to submit.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: 20,
          textAlign: "center",
        }}
      >
        Create Your Complaint!!
      </Text>
      <TextInput
        autoCapitalize="none"
        placeholder="Title"
        value={title}
        onChangeText={(text) => setTitle(text)}
        style={[styles.inputField, { marginBottom: 30 }]}
      />

      <TextInput
        autoCapitalize="none"
        placeholder="Description"
        value={description}
        onChangeText={(text) => setDescription(text)}
        style={[styles.inputField, { marginBottom: 30 }]}
      />
      <TouchableOpacity onPress={handleSubmit} style={styles.btn}>
        <Text style={styles.btnText}>Add Complaint</Text>
      </TouchableOpacity>
    </View>
  );
};

export default createComplaint;
