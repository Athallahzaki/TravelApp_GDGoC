import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth"
import { auth } from "@/firebase/firebaseConfig"

export const doCreateUserWithEmailAndPassword = async (email: string, password: string, displayName: string) => {
  const userCreds = createUserWithEmailAndPassword(auth, email, password);
  const user = (await userCreds).user;

  await updateProfile(user, {
    displayName: displayName
  })
  
  return userCreds;
}

export const doSignInWithEmailAndPassword = async (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
}

export const doSignOut = () => {
  return auth.signOut();
}