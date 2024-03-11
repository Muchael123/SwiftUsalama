import { View, Text } from 'react-native'
import React from 'react'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

type Login = {
    Credentials: {
        email: string,
        password: string
    }
    }

const useLogin = ({Credentials}: Login) => {
const auth = getAuth();
createUserWithEmailAndPassword(auth, Credentials.email, Credentials.password)
  .then((userCredential) => {
    // Signed up 
      const user = userCredential.user;
       return 'successsfully signed in'
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
      const errorMessage = error.message;
      return errorMessage
    // ..
  });
 
}

export default useLogin