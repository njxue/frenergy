import { createContext, useContext, useState, useEffect } from "react";
import { auth, ref } from "../config/firebase";
import { updateProfile } from "firebase/auth";
const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

function AuthProvider(props) {
  const [currUser, setCurrUser] = useState(null);

  function register(email, password, username) {
    return auth.createUserWithEmailAndPassword(email, password).then(() => {
      ref.child(`users/${auth.currentUser.uid}/profile`).set({
        username: username,
        bio: "",
        flair: "",
        major: "",
        photoURL: "",
      });
      ref.child("usernames").child(username).set(auth.currentUser.uid);
      return updateProfile(auth.currentUser, {
        displayName: username,
      });
    });
  }

  function login(email, passsword) {
    const axios = require("axios").default;
    console.log("oi");
    const url =
      "https://vafs.nus.edu.sg/adfs/oauth2/authorize?response_type=code&client_id=INC000002524851&resource=sg_edu_nus_oauth&redirect_uri=https%3A%2F%2Ffrenergy.vercel.app%2F";
    axios
      .get(url)
      .then((response) => console.log(response))
      .catch((error) => console.error(error));

    //return auth.signInWithEmailAndPassword(email, passsword);
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrUser(user);
    });
    return () => unsubscribe;
  }, []);

  const value = {
    currUser,
    register,
    login,
    logout,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}

export default AuthProvider;
