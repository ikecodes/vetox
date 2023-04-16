import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore, doc, deleteDoc } from "firebase/firestore"
import { getStorage, ref, deleteObject } from "firebase/storage"
import Toast from "./utils/Toast"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const storage = getStorage(app)
export const db = getFirestore(app)
export const auth = getAuth(app)

// Functions

export const deleteDocWithoutImage = async (collectionName, id) => {
  try {
    await deleteDoc(doc(db, collectionName, id))
    Toast("delete successful", "success")
  } catch (error) {
    Toast("error deleting doc", "error")
  }
}

export const deleteDocWithImage = async (imageRef, collectionName, id) => {
  const pictureRef = ref(storage, imageRef)
  try {
    await deleteObject(pictureRef)
    await deleteDoc(doc(db, collectionName, id))
    Toast("delete successful", "success")
  } catch (error) {
    Toast("error deleting doc", "error")
  }
}
