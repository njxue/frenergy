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
      auth.signOut();
      return updateProfile(auth.currentUser, {
        displayName: username,
      });
    });
  }

  function login(email, passsword) {
    return auth.signInWithEmailAndPassword(email, passsword);
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
