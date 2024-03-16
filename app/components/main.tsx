import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { Link } from 'expo-router';
import Colors from '@/constants/Colors';

const Main = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
      }}
    >
      <Link href={"/(users)/"} asChild>
        <Pressable
          style={{
            width: "100%",
            backgroundColor: Colors.blue500,
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
          }}
        >
          <Text style={{ color: Colors.white }}>Login as user</Text>
        </Pressable>
      </Link>
      <Link href={"/(admin)/"} asChild>
        <Pressable
          style={{
            width: "100%",
            backgroundColor: Colors.blue500,
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
            marginTop: 10,
          }}
        >
          <Text style={{ color: Colors.white }}>Login as admin</Text>
        </Pressable>
      </Link>
    </View>
  );
}

export default Main