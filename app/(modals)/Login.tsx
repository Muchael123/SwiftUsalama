import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native'
import React from 'react'
import styles  from '@/constants/styles'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'

const login = () => {
  const HandleLogin = () => {
    
  }
  return (
    <View style={styles.container}>
      <View style={{
        justifyContent: 'center',
        alignItems: 'center',
        gap: 30,
        height: Dimensions.get('window').height * 0.3
      }}>
        <Image source={require("../../assets/images/favicon.png")} />
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            marginBottom: 20,
            textAlign: "center",
          }}
        >
          Welcome Back. Login
        </Text>
      </View>
      <TextInput
        autoCapitalize="none"
        placeholder="Email"
        style={[styles.inputField, { marginBottom: 30 }]}
      />
      <TextInput
        autoCapitalize="none"
        placeholder="Password"
        style={[styles.inputField, { marginBottom: 30 }]}
      />
      <TouchableOpacity onPress={HandleLogin} style={styles.btn}>
        <Text style={styles.btnText}>Login</Text>
      </TouchableOpacity>
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
        <TouchableOpacity style={styles.btnOutline}>
          <Ionicons name="logo-google" size={24} style={styles.btnIcon} />
          <Text style={styles.btnOutlineText}>Continue with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnOutline}>
          <Ionicons name="logo-apple" size={24} style={styles.btnIcon} />
          <Text style={styles.btnOutlineText}>Continue with Apple</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnOutline}>
          <Ionicons name="logo-facebook" size={24} style={styles.btnIcon} />
          <Text style={styles.btnOutlineText}>Continue with Facebook</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default login