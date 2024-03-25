// import React, { useState } from "react";
// import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from "react-native";
// import * as ImagePicker from "expo-image-picker";

// const ChangeProfilePhoto = () => {
//   const [selectedImage, setSelectedImage] = useState(null);

//   // Function to handle selecting an image from the device's gallery
//   const pickImage = async () => {
//     // Request permission to access the device's photo library
//     const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (status !== "granted") {
//       Alert.alert("Permission denied", "Sorry, we need camera roll permissions to make this work!");
//       return;
//     }

//     // Launch the image picker
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [1, 1],
//       quality: 1,
//     });

//     if (!result.cancelled) {
//       setSelectedImage(result.uri);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Change Profile Photo</Text>
//       {selectedImage && (
//         <Image source={{ uri: selectedImage }} style={styles.image} />
//       )}
//       <TouchableOpacity onPress={()=> console.log('i was clicked')}>
//               <MaterialIcons
//                 name="add-a-photo"
//                 size={24}
//                 color="white"
//                 style={{
//                   position: "absolute",
//                   bottom: 10,
//                   right: 10,
//                   color: Colors.blue200,
//                 }}
//               />
//             </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   title: {
//     fontSize: 20,
//     marginBottom: 20,
//   },
//   image: {
//     width: 200,
//     height: 200,
//     borderRadius: 100,
//     marginBottom: 20,
//   },
//   button: {
//     backgroundColor: "blue",
//     padding: 10,
//     borderRadius: 5,
//   },
//   buttonText: {
//     color: "white",
//     fontSize: 16,
//   },
// });

// export default ChangeProfilePhoto;
