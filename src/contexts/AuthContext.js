import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../utils/firebase";
import { updateProfile } from "firebase/auth"
 
const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

function AuthProvider(props) {
  const [currUser, setCurrUser] = useState(null);

  function register(email, password, username) {
    return auth.createUserWithEmailAndPassword(email, password).then(() => {
      return updateProfile(auth.currentUser, {
        displayName: username
      })
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
    auth.onAuthStateChanged((user) => {
      setCurrUser(user);
    });
  }, []);

  const value = {
    currUser,
    register,
    login,
    logout,
    resetPassword
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}

export default AuthProvider;
