import { useState, useEffect, useRef } from "react";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});
export default async function schedulePushNotification(userEmail: string) {
  const expoPushToken = await registerForPushNotificationsAsync();
  const notificationListener = Notifications.addNotificationReceivedListener(
    (notification) => {
      console.log(notification);
    }
  );

  const responseListener =
    Notifications.addNotificationResponseReceivedListener((response) => {
      console.log(response);
    });


  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Someone Raised an Alarm! ⚡",
      body: `User ${userEmail ? userEmail : "Anonymous⏰"} raised an alarm`,
      data: { data: "goes here" },
    },
    trigger: { seconds: 2 },
  });

  Notifications.removeNotificationSubscription(notificationListener);
  Notifications.removeNotificationSubscription(responseListener);
}

async function registerForPushNotificationsAsync() {
  let token;

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== "granted") {
    throw new Error("Failed to get push token for push notification!");
  }

  token = (await Notifications.getExpoPushTokenAsync()).data;
  console.log(token);

  return token;
}

async function getUser() {
  const userEmail = await AsyncStorage.getItem("userEmail");
  console.log("Push from email:", userEmail);
  return userEmail;
}
