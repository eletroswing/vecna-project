import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from './FireConnection';

import {CreateOrUpdateData } from "./FireConnection"


function Login() {
  let provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then( async (result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;

      CreateOrUpdateData(user.uid, {
        uid: user.uid,
        username: user.displayName,
        email: user.email,
        picture: user.photoURL,
      }, "users")

      return { user, token, credential };
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);

      return { errorCode, errorMessage, email, credential };
      // ...
    });
}

function Logout() {
  signOut(auth)
    .then(() => {
      return
    })
    .catch((error) => {
      return { error }
    });
}

export { Login, Logout };
