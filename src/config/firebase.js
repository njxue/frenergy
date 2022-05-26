// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/compat/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8PW6Sa0ha6wWoXvOUqLLMaPZMMsJkNiQ",
  authDomain: "study-e0762.firebaseapp.com",
  databaseURL: "https://study-e0762-default-rtdb.firebaseio.com",
  projectId: "study-e0762",
  storageBucket: "study-e0762.appspot.com",
  messagingSenderId: "653649248877",
  appId: "1:653649248877:web:cab79b75f9a251a33cb564",
};
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = app.auth();
const storage = firebase.storage();
export const storageRef = storage.ref();
export const ref = firebase.database().ref();

export default app;
